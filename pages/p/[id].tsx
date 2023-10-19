import Layout from "../../components/Layout"
import Router, { useRouter } from "next/router"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import client from "../../lib/apollo-client"
import { ReportProps } from "../../components/Report"
import { GetServerSideProps } from "next"

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

const Report: React.FC<{ data: { report: ReportProps } }> = (props) => {
  const id = useRouter().query.id

  const [deleteReport] = useMutation(DeleteMutation)

  let name = props.data.report.name

  const authorName = props.data.report.user ? props.data.report.user.name : "Unknown user"
  return (
    <Layout>
      <div>
        <h2>{name}</h2>
        <p>By {authorName}</p>
        <p>{props.data.report.date}</p>
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
  const id = Number(Array.isArray(context.params?.id) ? context.params?.id[0] : context.params?.id)
  const { data } = await client.query({
    query: gql`
      query ReportQuery($id: ID!) {
        report(id: $id) {
          id
          name
          date
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
      data
    },
  };
}

export default Report
