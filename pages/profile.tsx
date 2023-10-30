import Layout from "../components/Layout"
import Report, { ReportProps } from "../components/Report"
import { authOptions } from "./api/auth/[...nextauth]"
import type { GetServerSideProps } from "next"
import { getServerSession } from "next-auth/next"
import client from "../lib/apollo-client"
import gql from "graphql-tag"
import prisma from "../lib/prisma"

const Reports: React.FC<{ data: { profile: ReportProps[] } }> = props => {
  const authorName = props.data.profile[0].user
    ? props.data.profile[0].user.name
    : "Unknown user"

  return (
    <Layout>
      <main style={{ padding: "0 2rem" }}>
        <h1>welcome {authorName}</h1>
        {props.data.profile.map(post => (
          <div key={post.id} className="post">
            <Report post={post} />
          </div>
        ))}
      </main>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    }
  }

  const email: any = session?.user?.email
  const user = await prisma.user.findUnique({
    where: { email },
  })
  if (!user) {
    throw new Error("User not found!")
  }
  const users: string = user?.id
  const { data } = await client.query({
    query: gql`
      query FeedQuery($id: String!) {
        profile(id: $id) {
          id
          name
          date
          createdAt
          bodymaps {
            id
            label
            details
          }
          user {
            id
            name
            email
          }
        }
      }
    `,
    variables: { id: users },
  })

  return {
    props: {
      data,
    },
  }
}

export default Reports
