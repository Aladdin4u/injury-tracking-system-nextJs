import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    reports: {
      create: [
        {
          name: "Alice",
          date: "2023-10-18T13:15:03-08:00",
          bodymaps: {
            create: [
              {
                label: "left hand",
                details: "my left hand got hurt",
              },
              {
                label: "right hand",
                details: "my right hand got hurt",
              },
            ],
          },
        },
      ],
    },
  },
  {
    name: "Matti Luukkainen",
    email: "matti@prisma.io",
    reports: {
      create: [
        {
          name: "Matti Luukkainen",
          date: "2023-10-18T13:15:03-08:00",
          bodymaps: {
            create: [
              {
                label: "left hand",
                details: "my left hand got hurt",
              },
              {
                label: "right hand",
                details: "my right hand got hurt",
              },
            ],
          },
        },
      ],
    },
  },
  {
    name: "Arto Hellas",
    email: "artoe@prisma.io",
    reports: {
      create: [
        {
          name: "Arto Hellas",
          date: "10/18/2023",
          bodymaps: {
            create: [
              {
                label: "left arm",
                details: "my left arm got hurt",
              },
              {
                label: "right arm",
                details: "my right arm got hurt",
              },
            ],
          },
        },
      ],
    },
  },
]

export async function main() {
  try {
    console.log(`Start seeding ...`)
    for (const u of userData) {
      const user = await prisma.user.create({
        data: u,
      })
      console.log(`Created user with id: ${user.id}`)
    }
    console.log(`Seeding finished.`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
