import Layout from "../components/Layout"
import gql from "graphql-tag"
import client from "../lib/apollo-client"
import Report, { ReportProps } from "../components/Report"


const Blog: React.FC<{ data: { feed: ReportProps[] } }> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>My Blog</h1>
        <main>
          {props.data.feed.map(post => (
            <div key={post.id} className="post">
              <Report post={post} />
            </div>
          ))}
        </main>
      </div>
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

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query FeedQuery {
        feed {
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
  });

  return {
    props: {
      data
    },
  };
}

export default Blog
