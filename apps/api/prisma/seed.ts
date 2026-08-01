import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Immagine placeholder deterministica per prodotto (nessun account Cloudinary
// necessario per vedere il catalogo funzionante in locale/demo).
function placeholderImage(seed: string) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/480/480`;
}

async function main() {
  const shop = await prisma.shop.upsert({
    where: { slug: 'shop-detersivi' },
    update: {},
    create: { name: 'Detersivi Rossi', slug: 'shop-detersivi' },
  });

  const categories = await Promise.all(
    [
      { name: 'Detersivi lavatrice', slug: 'detersivi-lavatrice' },
      { name: 'Detersivi piatti', slug: 'detersivi-piatti' },
      { name: 'Ammorbidenti', slug: 'ammorbidenti' },
      { name: 'Pulizia casa', slug: 'pulizia-casa' },
    ].map((c) =>
      prisma.category.upsert({
        where: { shopId_slug: { shopId: shop.id, slug: c.slug } },
        update: {},
        create: { ...c, shopId: shop.id },
      }),
    ),
  );

  const [lavatrice, piatti, ammorbidenti, casa] = categories;

  const products = [
    {
      name: 'Detersivo lavatrice liquido 3L',
      slug: 'detersivo-lavatrice-liquido-3l',
      description: 'Detersivo liquido per lavatrice, adatto a capi bianchi e colorati.',
      price: 8.9,
      categoryId: lavatrice.id,
    },
    {
      name: 'Detersivo lavatrice in polvere 5kg',
      slug: 'detersivo-lavatrice-polvere-5kg',
      description: 'Detersivo in polvere ad alta concentrazione, formato risparmio.',
      price: 12.5,
      categoryId: lavatrice.id,
    },
    {
      name: 'Capsule lavatrice 3in1 (30 pz)',
      slug: 'capsule-lavatrice-3in1-30pz',
      description: 'Capsule monodose con detersivo, smacchiatore e ammorbidente.',
      price: 10.2,
      categoryId: lavatrice.id,
    },
    {
      name: 'Detersivo piatti limone 1L',
      slug: 'detersivo-piatti-limone-1l',
      description: 'Sgrassa a fondo, profumo di limone.',
      price: 2.3,
      categoryId: piatti.id,
    },
    {
      name: 'Pastiglie lavastoviglie (60 pz)',
      slug: 'pastiglie-lavastoviglie-60pz',
      description: 'Pastiglie tutto in uno per lavastoviglie, effetto brillantante incluso.',
      price: 9.8,
      categoryId: piatti.id,
    },
    {
      name: 'Ammorbidente concentrato 2L',
      slug: 'ammorbidente-concentrato-2l',
      description: 'Profumazione lunga durata, formula concentrata.',
      price: 4.5,
      categoryId: ammorbidenti.id,
    },
    {
      name: 'Ammorbidente perle profumate 3L',
      slug: 'ammorbidente-perle-profumate-3l',
      description: 'Perle profumate per un bucato morbido e profumato.',
      price: 6.9,
      categoryId: ammorbidenti.id,
    },
    {
      name: 'Sgrassatore multiuso spray 750ml',
      slug: 'sgrassatore-multiuso-spray-750ml',
      description: 'Rimuove grasso e sporco ostinato da tutte le superfici lavabili.',
      price: 3.2,
      categoryId: casa.id,
    },
    {
      name: 'Candeggina delicata 1L',
      slug: 'candeggina-delicata-1l',
      description: 'Igienizza e sbianca delicatamente su tessuti e superfici.',
      price: 2.1,
      categoryId: casa.id,
    },
  ];

  for (const p of products) {
    const product = await prisma.product.upsert({
      where: { shopId_slug: { shopId: shop.id, slug: p.slug } },
      update: {},
      create: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        categoryId: p.categoryId,
        shopId: shop.id,
        available: true,
      },
    });

    const existingImage = await prisma.productImage.findFirst({
      where: { productId: product.id },
    });
    if (!existingImage) {
      await prisma.productImage.create({
        data: { productId: product.id, url: placeholderImage(p.slug), position: 0 },
      });
    }
  }

  console.log(`Seed completato: shop "${shop.name}", ${categories.length} categorie, ${products.length} prodotti.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
