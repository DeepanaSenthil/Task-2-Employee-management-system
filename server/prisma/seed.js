const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  console.log("entering");

  const hashedPassword = await bcrypt.hash("Deepana@123", 10);

  await prisma.user.create({
    data: {
      name: "Deepana",
      email: "deepana@gmail.com",
      password: hashedPassword,
      role: "admin",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
