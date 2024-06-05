const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.deleteMany({
      data: [
        { name: "Programação" },
        { name: "Inglês" },
        { name: "Português" },
        { name: "Outro" },
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