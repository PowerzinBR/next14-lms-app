const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Programação" },
        { name: "Inglês" },
        { name: "Português" },
      ]
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding db category", error);
  } finally {
    await database.$disconnect();
  }
}

main();