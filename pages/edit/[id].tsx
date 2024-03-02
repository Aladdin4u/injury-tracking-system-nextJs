import dayjs from "dayjs"
import { useState } from "react"
import { GetServerSideProps } from "next"
import Router, { useRouter } from "next/router"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"

import Layout from "../../components/Layout"
import { ReportProps } from "../../components/Report"
import { EditReportForm } from "../../components/Edit-Report-Form"
import { EditBodyMapForm } from "../../components/Edit-BodyMap-Form"
import { CreateBodyMapForm } from "../../components/Create-BodyMap-Form"

import gql from "graphql-tag"
import prisma from "../../lib/prisma"
import client from "../../lib/apollo-client"
import { useMutation } from "@apollo/client"


const EditReportMutation = gql`
  mutation EditReportMutation($id: ID!, $name: String!, $date: Date!) {
    editReport(id: $id, name: $name, date: $date) {
      id
      name
      date
      bodymaps {
        id
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
const CreateBodyMapMutation = gql`
  mutation CreateBodyMapMutation(
    $reportId: ID!
    $label: String!
    $details: String!
  ) {
    createBodyMap(reportId: $reportId, label: $label, details: $details) {
      id
      label
      details
      report {
        id
        name
      }
    }
  }
`
const EditBodyMapMutation = gql`
  mutation EditBodyMapMutation($id: ID!, $label: String!, $details: String!) {
    editBodyMap(id: $id, label: $label, details: $details) {
      id
      label
      details
    }
  }
`
const DeleteBodyMapMutation = gql`
  mutation DeleteBodyMapMutation($id: ID!) {
    deleteBodyMap(id: $id) {
      id
      label
      details
    }
  }
`

const Edit: React.FC<{
  data: { report: ReportProps; session: any }
}> = props => {
  const id = useRouter().query.id

  const [editReport] = useMutation(EditReportMutation)
  const [createBodyMap] = useMutation(CreateBodyMapMutation)
  const [editBodyMap] = useMutation(EditBodyMapMutation)
  const [deleteBodyMap] = useMutation(DeleteBodyMapMutation)
  const [name, setName] = useState(props.data.report.name)
  const [date, setDate] = useState(dayjs(props.data.report.date))
  const [bodyMaps, setBodyMaps] = useState(props.data.report.bodymaps)
  const [label, setLabel] = useState("")
  const [ListId, setListId] = useState(0)

  const onFinish = async (values: any) => {
    let data = {
      id: id,
      name: values.name,
      date: values["date"].format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    }
    await editReport({
      variables: data,
    })
    Router.push("/p/[id]", `/p/${id}`)
  }

  const onEditBodyMap = async (values: any) => {
    let data = values.BodyMaps[ListId]
    await editBodyMap({
      variables: data,
    })
    Router.push("/p/[id]", `/p/${id}`)
  }

  const onDeleteBodyMap = async (values: number) => {
    if (bodyMaps instanceof Array) {
      let b = bodyMaps.map(body => body)
      let data = {
        id: b[values].id,
      }
      await deleteBodyMap({
        variables: data,
      })
      Router.push("/p/[id]", `/p/${id}`)
    }
  }
  const onCreateBodyMap = async (values: any) => {
    let data = {
      reportId: id,
      label: values.BodyMaps[0].label,
      details: values.BodyMaps[0].details,
    }
    await createBodyMap({
      variables: data,
    })
    Router.push("/p/[id]", `/p/${id}`)
  }

  const handleLabel = (event: any) => {
    setLabel(event)
  }

  const handleListId = (value: number) => {
    setListId(value)
  }

  return (
    <Layout>
      <main style={{ padding: "2rem" }}>
        <div>
          <h1 style={{ color: "#696CC4" }}>Edit Report</h1>
          <EditReportForm name={name} date={date} handleOnFinish={onFinish} />
        </div>

        <div>
          <h1 style={{ color: "#696CC4" }}>Edit BodyMaps</h1>
          <EditBodyMapForm
            bodyMaps={bodyMaps}
            handleListId={handleListId}
            handleOnFinish={onEditBodyMap}
            handleDeleteBodyMap={onDeleteBodyMap}
          />
        </div>
        <div>
          <h1 style={{ color: "#696CC4" }}>Create BodyMaps</h1>
          <p>Click on the bodymap image below to list injury</p>
          <CreateBodyMapForm
            label={label}
            handleLabel={handleLabel}
            handleOnFinish={onCreateBodyMap}
          />
        </div>
      </main>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
  const id = Number(
    Array.isArray(context.params?.id)
      ? context.params?.id[0]
      : context.params?.id
  )

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user?.email! },
  })

  const reportOwner = await prisma.report.findFirst({
    where: {
      id: id,
      userId: currentUser?.id,
    },
  })

  if (!reportOwner) {
    throw new Error("Unauthorized")
  }

  const { data } = await client.query({
    query: gql`
      query ReportQuery($id: ID!) {
        report(id: $id) {
          id
          name
          date
          bodymaps {
            id
            label
            details
          }
          user {
            id
            name
          }
        }
      }
    `,
    variables: { id },
  })

  return {
    props: {
      data,
    },
  }
}

export default Edit
