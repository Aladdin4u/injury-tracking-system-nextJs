import Layout from "../components/Layout"
import Report, { ReportProps } from "../components/Report"
import type { GetServerSideProps } from "next"
import client from "../lib/apollo-client"
import { useQuery } from "@apollo/client"
import gql from "graphql-tag"
import { useState } from "react"
import { Form, Table } from "antd"
import type { ColumnsType, TableProps } from "antd/es/table"
import dayjs from "dayjs"

const Reports: React.FC<{ data: { feed: ReportProps[] } }> = props => {
  const [name, setName] = useState(null)
  const [date, setDate] = useState(null)
  const [data, setData] = useState(props.data.feed)
  const [columns, setColumns] = useState<ColumnsType<ReportProps>>([
    {
      title: "Name",
      dataIndex: "name",
      filters: data.map(d => {
        return {
          text: d.name,
          value: d.name,
        }
      }),
      filterSearch: true,
      onFilter: (value: string, record) => record.name.startsWith(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Date Time of Injury",
      dataIndex: "date",
      defaultSortOrder: "descend",
      sorter: (a, b) => dayjs(a.date) - dayjs(b.date),
    },
    {
      title: "Date of Report",
      dataIndex: "createdAt",
      defaultSortOrder: "descend",
      onFilter: (valueA: string, valueB: string, record) => dayjs(record.createdAt) >= dayjs(valueA) && dayjs(record.createdAt) <= dayjs(valueB),
      sorter: {
        compare: (a, b) => dayjs(a.createdAt) - dayjs(b.createdAt),
        multiple: 2,
      },
    },
  ])
  const onChange: TableProps<ReportProps>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra)
  }

  return (
    <Layout>
      <div className="page">
        <main>
          <h1>Reports</h1>
          <Table columns={columns} dataSource={data} onChange={onChange} />
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

export const getServerSideProps: GetServerSideProps = async () => {
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
