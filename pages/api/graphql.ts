import { createYoga } from "graphql-yoga"
import SchemaBuilder from "@pothos/core"
import PrismaPlugin from "@pothos/plugin-prisma"
import { DateTimeResolver } from "graphql-scalars"

import type PrismaTypes from "@pothos/plugin-prisma/generated"
import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "../../lib/prisma"

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes
  Scalars: {
    Date: {
      Input: Date
      Output: Date
    }
  }
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
})

builder.addScalarType("Date", DateTimeResolver, {})

builder.queryType({})

builder.mutationType({})

builder.prismaObject("User", {
  fields: t => ({
    id: t.exposeString("id"),
    email: t.exposeString("email"),
    name: t.exposeString("name"),
    reports: t.relation("reports"),
  }),
})

builder.prismaObject("Report", {
  fields: t => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    date: t.expose("date", {
      type: "Date",
    }),
    createdAt: t.expose("createdAt", {
      type: "Date",
    }),
    bodymaps: t.relation("bodymaps"),
    user: t.relation("user"),
  }),
})

builder.prismaObject("BodyMap", {
  fields: t => ({
    id: t.exposeID("id"),
    label: t.exposeString("label"),
    details: t.exposeString("details"),
    report: t.relation("report"),
  }),
})

builder.queryField("feed", t =>
  t.prismaField({
    type: ["Report"],
    resolve: async (_query, _parent, _args, _info) =>
      prisma.report.findMany({}),
  })
)

builder.queryField("profile", t =>
  t.prismaField({
    type: ["Report"],
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.report.findMany({
        ...query,
        where: { userId: args.id },
      }),
  })
)

builder.queryField("users", t =>
  t.prismaField({
    type: ["User"],
    resolve: async (_query, _parent, _args, _info) => prisma.user.findMany({}),
  })
)

builder.queryField("report", t =>
  t.prismaField({
    type: "Report",
    args: {
      id: t.arg.id({ required: true }),
    },
    nullable: true,
    resolve: async (_query, _parent, args, _info) =>
      prisma.report.findUnique({
        where: {
          id: Number(args.id),
        },
      }),
  })
)

builder.queryField("filterReports", t =>
  t.prismaField({
    type: ["Report"],
    args: {
      searchName: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) => {
      const or = args.searchName
        ? {
            OR: [{ name: { contains: args.searchName } }],
          }
        : {}
      return prisma.report.findMany({
        ...query,
        where: { ...or },
      })
    },
  })
)

builder.mutationField("signupUser", t =>
  t.prismaField({
    type: "User",
    args: {
      name: t.arg.string({ required: true }),
      email: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.user.create({
        ...query,
        data: {
          email: args.email,
          name: args.name,
        },
      }),
  })
)

builder.mutationField("deleteReport", t =>
  t.prismaField({
    type: "Report",
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.report.delete({
        ...query,
        where: {
          id: Number(args.id),
        },
      }),
  })
)
const BodyMapInput = builder.inputType("BodyMapInput", {
  fields: t => ({
    label: t.string({ required: true }),
    details: t.string({ required: true }),
  }),
})

builder.mutationField("createReport", t =>
  t.prismaField({
    type: "Report",
    args: {
      name: t.arg.string({ required: true }),
      date: t.arg({ type: "Date", required: true }),
      bodymaps: t.arg({
        type: [BodyMapInput],
        required: true,
      }),
      email: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.report.create({
        ...query,
        data: {
          name: args.name,
          date: args.date,
          bodymaps: { create: args.bodymaps ?? [] },
          user: {
            connect: { email: args.email },
          },
        },
      }),
  })
)

builder.mutationField("editReport", t =>
  t.prismaField({
    type: "Report",
    args: {
      id: t.arg.id({ required: true }),
      name: t.arg.string({ required: true }),
      date: t.arg({ type: "Date", required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.report.update({
        ...query,
        where: {
          id: Number(args.id),
        },
        data: {
          name: args.name,
          date: args.date,
        },
      }),
  })
)

builder.mutationField("createBodyMap", t =>
  t.prismaField({
    type: "BodyMap",
    args: {
      reportId: t.arg.id({ required: true }),
      label: t.arg.string({ required: true }),
      details: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.bodyMap.create({
        ...query,
        data: {
          label: args.label,
          details: args.details,
          report: {
            connect: { id: Number(args.reportId) },
          },
        },
      }),
  })
)
builder.mutationField("editBodyMap", t =>
  t.prismaField({
    type: "BodyMap",
    args: {
      id: t.arg.id({ required: true }),
      label: t.arg.string({ required: true }),
      details: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.bodyMap.update({
        ...query,
        where: {
          id: Number(args.id),
        },
        data: {
          label: args.label,
          details: args.details,
        },
      }),
  })
)

builder.mutationField("deleteBodyMap", t =>
  t.prismaField({
    type: "BodyMap",
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.bodyMap.delete({
        ...query,
        where: {
          id: Number(args.id),
        },
      }),
  })
)

const schema = builder.toSchema()

export default createYoga<{
  req: NextApiRequest
  res: NextApiResponse
}>({
  schema,
  graphqlEndpoint: "/api/graphql",
})

export const config = {
  api: {
    bodyParser: false,
  },
}
