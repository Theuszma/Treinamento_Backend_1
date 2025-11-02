import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.produto.deleteMany({});
  await prisma.categoria.deleteMany({});

  const novaCategoria = await prisma.categoria.create({
    data: {
      nome: 'Eletrônicos',
    },
  });

  const novoProduto = await prisma.produto.create({
    data: {
      nome: 'Notebook',
      descricao: 'Notebook de alto desempenho',
      preco: 4500.0,
      categoriaId: novaCategoria.id,
    },
  });

  await prisma.categoria.update({
    where: { id: novaCategoria.id },
    data: {
      produtos: {
        connect: { id: novoProduto.id },
      },
    },
  });

  console.log('Seed executado com sucesso ✅');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
