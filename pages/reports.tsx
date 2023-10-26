import Layout from "../components/Layout"
import gql from "graphql-tag"
import client from "../lib/apollo-client"
import Report, { ReportProps } from "../components/Report"
import { useQuery } from "@apollo/client"
import { useState } from "react"
import { Button, Card, Form, Input, Row, DatePicker } from "antd"

const FilterReport = gql`
  query FilterReport($searchName: String, $searchDate: String) {
    filterReports(searchName: $searchName, searchDate: $searchDate) {
      id
      name
      date
      createdAt
      user {
        id
        name
      }
    }
  }
`

const Reports: React.FC<{ data: { feed: ReportProps[] } }> = props => {
  const [name, setName] = useState(null)
  const [date, setDate] = useState(null)
  const [form] = Form.useForm()

  const results = useQuery(FilterReport, {
    variables: {
      searchName: name,
      searchDate: date,
    },
    skip: !name || !date,
  })
  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values)
    setName(values.search)
    setDate(values["date"].format("YYYY-MM-DD"))
  }
  // console.log(results.data.filterReports)
  // if(results && results.data) {
  //   return(
  //     results.data.filterReports.map((post:any) => (
  //       <div key={post.id} className="post">
  //         <Report post={post} />
  //       </div>
  //     ))
  //   )
  // }
  return (
    <Layout>
      <div className="page">
        <main>
          <h1>Reports</h1>
          <Card>
          <Form form={form} name="advanced_search" onFinish={onFinish}>
            <Row gutter={24} justify="space-between">
              <Form.Item
                label="Search"
                name="search"
              >
                <Input placeholder="Search report name" />
              </Form.Item>
              <Form.Item
                name="date"
                label="Date Time"
              >
                <DatePicker format="YYYY-MM-DD HH:mm:ss" />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
            </Row>
          </Form>
          </Card>
          {results.data && results.data.filterReports > 0 ?
            results.data.filterReports.map((post: any) => (
              <div key={post.id} className="post">
                <Report post={post} />
              </div>
            )) : (<p>no results found</p>)
          }

          {!results.data && props.data.feed.map(post => (
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
  })

  return {
    props: {
      data,
    },
  }
}

export default Reports
