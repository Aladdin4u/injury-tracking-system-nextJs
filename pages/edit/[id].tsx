import Layout from "../../components/Layout"
import Router, { useRouter } from "next/router"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import client from "../../lib/apollo-client"
import { ReportProps } from "../../components/Report"
import { GetServerSideProps } from "next";
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession } from "next-auth/next";
import { useState } from "react"

const EditReportMutation = gql`
  mutation EditReportMutation(
    $id: Int!
    $name: String!
    $date: String!
    $email: String!
    $bodymaps: [BodyMapInput!]!
  ) {
    editReport(id: $id, name: $name, date: $date, bodymaps: $bodymaps email: $email) {
      id
      name
      date
      bodymaps {
        label
        details
      }
      user {
        id
        name
      }
    }
  }
`

interface BodyMap {
  id: number;
  label: string;
  details: string;
}

const Edit: React.FC<{ data: { report: ReportProps, session:any } }> = (props) => {
  const id = useRouter().query.id
  const [editReport] = useMutation(EditReportMutation)

  interface BodyMap {
    label: string;
    details: string;
  }
  const [name, setName] = useState(props.data.report.name)
  const [date, setDate] = useState(props.data.report.date)
  const [email, setEmail] = useState("")
  const [bodymaps, setBodymaps] = useState<BodyMap[]>([
    { label: "left hand",
      details: "my left hand got hurt"
    },
    { label: "right hand",
      details: "my rigt hand got hurt"
    },
  ])

  return (
    <Layout>
      <div>
      <form
          onSubmit={async (e) => {
            e.preventDefault()

            await editReport({
              variables: {
                id,
                name,
                date,
                bodymaps,
                email,
              },
            })
            Router.push("/")
          }}
        >
          <h1>Edit Report</h1>
          <input
            autoFocus
            onChange={(e) => setName(e.target.value)}
            placeholder="Reporter Name"
            type="text"
            value={name}
          />
            <input
              onChange={(e) => setDate(e.target.value)}
              type="date"
              value={date}
            />
          {/* <input
            // onChange={e.target.value}
            placeholder="details"
            type="text"
            // value={bodymaps}
          /> */}
          <input
            disabled={!date || !name}
            type="submit"
            value="Update"
          />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-date: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const id = Number(Array.isArray(context.params?.id) ? context.params?.id[0] : context.params?.id)
  const { data } = await client.query({
    query: gql`
      query ReportQuery($id: ID!) {
        report(id: $id) {
          id
          name
          date
          bodymaps {
            id
            label
            details
          }
          user {
            id
            name
          }
        }
      }
    `,
    variables: { id },
  });

  return {
    props: {
      data,
      session
    },
  };
}

export default Edit