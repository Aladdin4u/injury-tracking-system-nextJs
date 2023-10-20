import React, { useState } from "react"
import { useSession } from "next-auth/react";
import Layout from "../components/Layout"
import Router from "next/router"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"

const CreateReportMutation = gql`
  mutation CreateReportMutation(
    $name: String!
    $date: String!
    $email: String!
    $bodymaps: [BodyMapInput!]!
  ) {
    createReport(name: $name, date: $date, bodymaps: $bodymaps email: $email) {
      id
      name
      date
      bodymaps {
        label
        details
      }
      user {
        id
        name
      }
    }
  }
`

function Report() {
  const { data: session } = useSession();
  interface BodyMap {
    label: string;
    details: string;
  }
  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [email, setEmail] = useState(session?.user?.email)
  const [bodymaps, setBodymaps] = useState<BodyMap[]>([
    { label: "left hand",
      details: "my left hand got hurt"
    },
    { label: "right hand",
      details: "my rigt hand got hurt"
    },
  ])
  

  const [createReport] =
    useMutation(CreateReportMutation)
  
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
                email,
              },
            })
            Router.push("/")
          }}
        >
          <h1>Create Report</h1>
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
          {/* <input
            // onChange={e.target.value}
            placeholder="details"
            type="text"
            // value={bodymaps}
          /> */}
          <input
            disabled={!date || !name}
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

export default Report
