import React from "react"
import Router from "next/router"
import ReactMarkdown from "react-markdown"

export type ReportProps = {
  id: number
  name: string
  createdAt: Date
  bodymaps: {
    id: number
    label: string
    details: string
  }
  user: {
    name: string
  }
  date: string
}

const Report: React.FC<{ post: ReportProps }> = ({ post }) => {
  const authorName = post.user ? post.user.name : "Unknown user"
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2>{post.name}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={post.date} />
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
