import Router from "next/router"
import React, { useState } from "react"
import type { GetServerSideProps } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"

import Layout from "../components/Layout"
import { CreateReportForm } from "../components/Create-Report-Form"

import gql from "graphql-tag"
import { useMutation } from "@apollo/client"

import { Alert } from "antd"

const CreateReportMutation = gql`
  mutation CreateReportMutation(
    $name: String!
    $date: Date!
    $email: String!
    $bodymaps: [BodyMapInput!]!
  ) {
    createReport(name: $name, date: $date, bodymaps: $bodymaps, email: $email) {
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

const Create: React.FC<{ data: string }> = props => {
  const [email, setEmail] = useState(props?.data)
  const [createReport] = useMutation(CreateReportMutation)
  const [label, setLabel] = useState("")
  const [visible, setVisible] = useState(false)

  const onFinish = async (values: any) => {
    setVisible(false)
    console.log(values.BodyMaps)

    if (values.BodyMaps == null || values.BodyMaps.length < 1) {
      console.log("invalid")
      setVisible(true)
      return
    }
    let data = {
      name: values.name,
      date: values["date"].format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
      bodymaps: values.BodyMaps,
      email: email,
    }
    await createReport({
      variables: data,
    })
    Router.push("/profile")
  }

  const handleClose = () => {
    setVisible(false)
  }

  const handleLabel = (event: any) => {
    setLabel(event)
  }

  return (
    <Layout>
      <main style={{ padding: "2rem" }}>
        <h1 style={{ color: "#696CC4" }}>Create Reports</h1>
        {visible && (
          <Alert
            message="Please select injury type from body map picture below"
            type="error"
            closable
            afterClose={handleClose}
            showIcon
            style={{ marginBottom: 8 }}
          />
        )}
        <CreateReportForm
          label={label}
          isVisible={visible}
          handleLabel={handleLabel}
          handleOnFinish={onFinish}
        />
      </main>
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

  const data = session?.user?.email

  return {
    props: {
      data,
    },
  }
}

export default Create
