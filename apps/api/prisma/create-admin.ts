import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Uso: pnpm create-admin -- --email=admin@example.com --password=xxxxxxxx
// Crea (o aggiorna la password di) l'unico amministratore previsto nell'MVP,
// associato allo shop attivo (SHOP_SLUG). Nessuna UI di registrazione:
// l'admin viene creato da riga di comando dal deploy/operatore.
function parseArgs() {
  const args = Object.fromEntries(
    process.argv.slice(2).map((arg) => {
      const [key, value] = arg.replace(/^--/, '').split('=');
      return [key, value];
    }),
  );
  return args as { email?: string; password?: string };
}

async function main() {
  const { email, password } = parseArgs();

  if (!email || !password) {
    console.error('Uso: pnpm create-admin -- --email=admin@example.com --password=xxxxxxxx');
    process.exit(1);
  }
  if (password.length < 8) {
    console.error('La password deve avere almeno 8 caratteri.');
    process.exit(1);
  }

  const shopSlug = process.env.SHOP_SLUG ?? 'shop-detersivi';
  const shop = await prisma.shop.findUnique({ where: { slug: shopSlug } });
  if (!shop) {
    console.error(`Shop con slug "${shopSlug}" non trovato. Esegui prima il seed.`);
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash, shopId: shop.id },
  });

  console.log(`Admin pronto: ${admin.email} (shop: ${shop.name})`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
