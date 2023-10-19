import React, { useState } from "react"
import Layout from "../components/Layout"
import Router from "next/router"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"

const CreateDraftMutation = gql`
  mutation CreateDraftMutation(
    $name: String!
    $date: String!
    $bodymaps: [String!]!
  ) {
    createReport(name: $name, date: $date, bodymaps: $bodymaps) {
      id
      name
      date
      bodymaps
      author {
        id
        name
      }
    }
  }
`

function Draft() {
  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [bodymaps, setBodymaps] = useState([])

  const [createReport] =
    useMutation(CreateDraftMutation)
  
  const handleBodyMaps = () => {
    // 
  }

  return (
    <Layout>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault()

            await createReport({
              variables: {
                name,
                date,
                bodymaps,
              },
            })
            Router.push("/drafts")
          }}
        >
          <h1>Create Draft</h1>
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
          <input
            onChange={handleBodyMaps}
            placeholder="details"
            type="text"
            value={bodymaps}
          />
          <input
            disabled={!date || !name || !bodymaps}
            type="submit"
            value="Create"
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

export default Draft
