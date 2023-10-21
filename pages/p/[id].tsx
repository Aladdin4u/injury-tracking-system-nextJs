import Layout from "../../components/Layout"
import Router, { useRouter } from "next/router"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import client from "../../lib/apollo-client"
import { ReportProps } from "../../components/Report"
import { GetServerSideProps } from "next";
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession } from "next-auth/next";

const DeleteMutation = gql`
  mutation DeleteMutation($id: ID!) {
    deleteReport(id: $id) {
      id
      name
      date
      user {
        id
        name
      }
    }
  }
`

type BodyMap = {
  id: number;
  label: string;
  details: string;
}

const Report: React.FC<{ data: { report: ReportProps } }> = (props) => {
  const id = useRouter().query.id
  const [deleteReport] = useMutation(DeleteMutation)

  let name = props.data.report.name
  const bodyMaps:BodyMap[] = props.data.report.bodymaps

  const authorName = props.data.report.user ? props.data.report.user.name : "Unknown user"
  return (
    <Layout>
      <div>
        <h2>{name}</h2>
        <p>By {authorName}</p>
        <p>{props.data.report.date}</p>
        {bodyMaps.map((b) => 
          (<div key={b.id}>
            <h3>{b.id}</h3>
            <h3>{b.label}</h3>
            <p>{b.details}</p>
          </div>)
          )}
        
        <button onClick={() => Router.push("/edit/[id]", `/edit/${id}`)}>update</button>
        <button
          onClick={async e => {
            await deleteReport({
              variables: {
                id,
              },
            })
            Router.push("/")
          }}
        >
          Delete
        </button>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
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

export default Report
