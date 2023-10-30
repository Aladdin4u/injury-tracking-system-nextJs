import React from "react"
import Router from "next/router"
import ReactMarkdown from "react-markdown"
import {
  Typography
} from "antd"
const { Title, Text } = Typography

export type ReportProps = {
  id: number
  name: string
  date: Date
  createdAt: Date
  bodymaps: {
    id: number
    label: string
    details: string
  }
  user: {
    name: string
  }
}

const Report: React.FC<{ post: ReportProps }> = ({ post }) => {
  const authorName = post.user ? post.user.name : "Unknown user"
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2>{post.name}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={post.date.toString()} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  )
}

export default Report
