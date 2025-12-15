require('dotenv').config();

const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

async function test() {
  try {
    const dados = await prisma.tbl_teste.findMany();
    console.log(dados);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

test();