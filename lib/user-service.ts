import prisma from "./prisma"

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email: email },
  })

  return user
}

export const getUserReport = async (id: number, userId: string) => {
  const report = await prisma.report.findFirst({
    where: {
      id: id,
      userId: userId,
    },
  })
  return report
}
