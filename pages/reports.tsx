import Layout from "../components/Layout"
import type { GetServerSideProps } from "next"
import client from "../lib/apollo-client"
import gql from "graphql-tag"
import React, { useRef, useState } from "react"
import Highlighter from "react-highlight-words"
import type { InputRef } from "antd"
import { Button, Input, Space, Table, DatePicker } from "antd"
const { RangePicker } = DatePicker
import { SearchOutlined } from "@ant-design/icons"
import type { ColumnType, ColumnsType } from "antd/es/table"
import type { FilterConfirmProps } from "antd/es/table/interface"
import dayjs from "dayjs"

export type ReportProps = {
  id: number
  name: string
  createdAt: Date
  date: Date
}
type DataIndex = keyof ReportProps

const Reports: React.FC<{ data: { feed: ReportProps[] } }> = props => {

  const [searchText, setSearchText] = useState("")
  const [searchedColumn, setSearchedColumn] = useState("")
  const searchInput = useRef<InputRef>(null)
  const [data, setData] = useState(
    props.data.feed.map(data => {
      return {
        ...data,
        key: data.id,
      }
    })
  )
  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<ReportProps> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText((selectedKeys as string[])[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  })
  const getColumnDateProps = (
    dataIndex: DataIndex
  ): ColumnType<ReportProps> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
        <RangePicker
          onChange={(date, dateString) => {
            setSelectedKeys(dateString)
          }}
          allowClear={true}
          style={{ marginBottom: 8, width: "100%", display: "flex" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText((selectedKeys as string[])[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      dayjs(record[dataIndex]).format("YYYY-MM-DD") == value,
  })

  const [columns, setColumns] = useState<ColumnsType<ReportProps>>([
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Date Time of Injury",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf(),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Date of Report",
      dataIndex: "createdAt",
      key: "createdAt",
      ...getColumnDateProps("createdAt"),
      sorter: (a, b) =>
        dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf(),
      sortDirections: ["descend", "ascend"],
    },
  ])
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText("")
  }

  return (
    <Layout>
      <main style={{ padding: "0 2rem" }}>
        <h1 style={{ color: "#696CC4" }}>Reports</h1>
        <Table
          columns={columns}
          dataSource={data}
          style={{ overflow: "auto" }}
        />
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

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({
    query: gql`
      query FeedQuery {
        feed {
          id
          name
          date
          createdAt
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
