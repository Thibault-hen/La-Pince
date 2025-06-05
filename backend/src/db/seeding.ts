import { hash } from 'argon2';
import prisma from './client';

async function main() {
  console.log('Empty database ...');

  await prisma.color.deleteMany();

  console.log('Start seeding ...');

  // --- 1. Colors (no dependencies, IDs auto-incremented) ---
  // On peut les créer en premier et ensuite les récupérer par leur 'name' ou 'value' unique.
  await prisma.color.createMany({
    data: [
      { name: 'Rouge Vibrant', value: '#FF0000' },
      { name: 'Bleu Ciel', value: '#87CEEB' },
      { name: 'Vert Forêt', value: '#228B22' },
      { name: 'Jaune Soleil', value: '#FFD700' },
      { name: 'Orange Doux', value: '#FFA500' },
    ],
    skipDuplicates: true, // Au cas où tu relances le seed
  });
  console.log('Colors created.');

  /* // Récupérer les couleurs pour les utiliser plus tard
  const colorRouge = await prisma.color.findUniqueOrThrow({ where: { name: 'Rouge Vibrant' } });
  const colorBleu = await prisma.color.findUniqueOrThrow({ where: { name: 'Bleu Ciel' } });
  const colorVert = await prisma.color.findUniqueOrThrow({ where: { name: 'Vert Forêt' } });
  const colorJaune = await prisma.color.findUniqueOrThrow({ where: { name: 'Jaune Soleil' } });
  const colorOrange = await prisma.color.findUniqueOrThrow({ where: { name: 'Orange Doux' } });

  // --- 2. Users (no dependencies, IDs CUID auto-generated) ---
  const alice = await prisma.user.create({
    data: {
      name: 'Alice Dupont',
      email: 'alice.dupont@example.com',
      password: 'hashed_password_alice', // Assure-toi de hasher les mots de passe dans un vrai scénario
      currency: 'EUR',
      alert: true,
      createdAt: new Date('2023-01-15T10:00:00.000Z'),
      // updatedAt est géré par @updatedAt
    },
  });
  console.log(`Created user Alice with id: ${alice.id}`);

  const bob = await prisma.user.create({
    data: {
      name: 'Bob Martin',
      email: 'bob.martin@example.com',
      password: 'hashed_password_bob',
      currency: 'USD',
      alert: false,
      createdAt: new Date('2023-02-20T14:30:00.000Z'),
    },
  });
  console.log(`Created user Bob with id: ${bob.id}`);

  // --- 3. Categories (depends on User and Color) ---
  // Categories for Alice
  const categoryCoursesAlice = await prisma.category.create({
    data: {
      title: 'Courses Alimentaires',
      userId: alice.id, // ou user: { connect: { id: alice.id } }
      colorId: colorRouge.id, // ou color: { connect: { id: colorRouge.id } }
      createdAt: new Date('2023-01-16T10:00:00.000Z'),
    },
  });
  console.log(`Created category 'Courses Alimentaires' for Alice with id: ${categoryCoursesAlice.id}`);

  const categoryTransportAlice = await prisma.category.create({
    data: {
      title: 'Transport',
      user: { connect: { id: alice.id } },
      color: { connect: { id: colorBleu.id } },
      createdAt: new Date('2023-01-16T11:00:00.000Z'),
    },
  });
  console.log(`Created category 'Transport' for Alice with id: ${categoryTransportAlice.id}`);

  const categoryLoisirsAlice = await prisma.category.create({
    data: {
      title: 'Loisirs',
      userId: alice.id,
      colorId: colorJaune.id,
      createdAt: new Date('2023-01-16T12:00:00.000Z'),
    },
  });
   console.log(`Created category 'Loisirs' for Alice with id: ${categoryLoisirsAlice.id}`);

  // Categories for Bob
  const categoryFacturesBob = await prisma.category.create({
    data: {
      title: 'Factures Mensuelles',
      userId: bob.id,
      colorId: colorVert.id,
      createdAt: new Date('2023-02-21T09:00:00.000Z'),
    },
  });
  console.log(`Created category 'Factures Mensuelles' for Bob with id: ${categoryFacturesBob.id}`);

  const categoryAlimentationBob = await prisma.category.create({
    data: {
      title: 'Alimentation',
      userId: bob.id,
      colorId: colorOrange.id,
      createdAt: new Date('2023-02-21T10:00:00.000Z'),
    },
  });
  console.log(`Created category 'Alimentation' for Bob with id: ${categoryAlimentationBob.id}`);

  // --- 4. Incomes (depends on User) ---
  // Incomes for Alice
  await prisma.income.create({
    data: {
      value: 2500.00,
      month: 7, // Juillet
      year: 2023,
      userId: alice.id,
      createdAt: new Date('2023-07-01T08:00:00.000Z'),
    },
  });
  await prisma.income.create({
    data: {
      value: 2550.00,
      month: 8, // Août
      year: 2023,
      userId: alice.id,
      createdAt: new Date('2023-08-01T08:00:00.000Z'),
    },
  });
  console.log('Incomes for Alice created.');

  // Income for Bob
  await prisma.income.create({
    data: {
      value: 3200.00,
      month: 7, // Juillet
      year: 2023,
      userId: bob.id,
      createdAt: new Date('2023-07-01T09:00:00.000Z'),
    },
  });
  console.log('Income for Bob created.');

  // --- 5. Budgets (depends on User and Category) ---
  // Rappel: Budget @@unique([month, year, userId]), donc un seul budget "global" par mois/année par user,
  // ou alors le categoryId est là pour spécifier *quel* budget parmi plusieurs.
  // Si la contrainte unique est stricte, on ne peut avoir qu'UN budget par (mois, année, user).
  // Je vais créer des budgets pour différentes catégories, mais pour des mois/utilisateurs différents
  // pour ne pas violer la contrainte si elle est interprétée comme "un seul enregistrement budget".
  // Si vous voulez plusieurs budgets par catégories pour le même mois/user, la contrainte devrait être
  // @@unique([month, year, userId, categoryId])

  // Budget for Alice - Juillet 2023 (Courses)
  const budgetCoursesAliceJuillet = await prisma.budget.create({
    data: {
      amount: '450.00', // Le schéma indique String pour amount
      limitAlert: 0.8,
      month: 'Juillet', // Le schéma indique String pour month
      year: 2023,
      categoryId: categoryCoursesAlice.id,
      userId: alice.id,
      createdAt: new Date('2023-07-01T10:00:00.000Z'),
    },
  });
  console.log(`Created budget for 'Courses Alimentaires' (Alice, Juillet) with id: ${budgetCoursesAliceJuillet.id}`);
  
  // Budget for Alice - Juillet 2023 (Transport)
  // ATTENTION: Ceci violera `@@unique([month, year, userId])` si vous avez déjà un budget pour Alice en Juillet 2023.
  // Si vous voulez des budgets par catégorie pour le même mois/user, modifiez la contrainte unique.
  // Pour cet exemple, je vais le mettre sur un autre mois pour Alice pour éviter le conflit.
  const budgetTransportAliceAout = await prisma.budget.create({
    data: {
      amount: '120.00',
      limitAlert: 0.9,
      month: 'Août', // Changé en Août
      year: 2023,
      categoryId: categoryTransportAlice.id,
      userId: alice.id,
      createdAt: new Date('2023-08-01T10:05:00.000Z'),
    },
  });
  console.log(`Created budget for 'Transport' (Alice, Août) with id: ${budgetTransportAliceAout.id}`);

  // Budget for Bob - Juillet 2023 (Factures)
  const budgetFacturesBobJuillet = await prisma.budget.create({
    data: {
      amount: '800.00',
      limitAlert: 0.85,
      month: 'Juillet',
      year: 2023,
      categoryId: categoryFacturesBob.id,
      userId: bob.id,
      createdAt: new Date('2023-07-01T12:00:00.000Z'),
    },
  });
  console.log(`Created budget for 'Factures Mensuelles' (Bob, Juillet) with id: ${budgetFacturesBobJuillet.id}`);

  // --- 6. Expenses (depends on User and Budget) ---
  // Remarque: le champ `expences` sur `User` est une relation, il sera peuplé automatiquement.
  // Le champ `expenses` sur `Budget` est aussi une relation.

  // Expenses for Alice's "Courses Alimentaires" budget in July
  await prisma.expense.create({
    data: {
      description: 'Supermarché hebdomadaire',
      amount: 85.50,
      date: new Date('2023-07-05T17:00:00.000Z'),
      budgetId: budgetCoursesAliceJuillet.id,
      userId: alice.id,
      createdAt: new Date('2023-07-05T17:01:00.000Z'),
    },
  });
  await prisma.expense.create({
    data: {
      description: 'Boulangerie',
      amount: 12.30,
      date: new Date('2023-07-08T09:00:00.000Z'),
      budgetId: budgetCoursesAliceJuillet.id, // Lié au même budget
      userId: alice.id,
      createdAt: new Date('2023-07-08T09:01:00.000Z'),
    },
  });
  console.log('Expenses for Alice (Courses Juillet) created.');

  // Expense for Alice's "Transport" budget in August
  await prisma.expense.create({
    data: {
      description: 'Pass Navigo mensuel',
      amount: 75.20,
      date: new Date('2023-08-02T08:00:00.000Z'),
      budgetId: budgetTransportAliceAout.id,
      userId: alice.id,
      createdAt: new Date('2023-08-02T08:01:00.000Z'),
    },
  });
  console.log('Expense for Alice (Transport Août) created.');

  // Expense for Bob's "Factures Mensuelles" budget in July
  await prisma.expense.create({
    data: {
      description: 'Loyer',
      amount: 650.00,
      date: new Date('2023-07-03T10:00:00.000Z'),
      budgetId: budgetFacturesBobJuillet.id,
      userId: bob.id,
      createdAt: new Date('2023-07-03T10:01:00.000Z'),
    },
  });
  console.log('Expense for Bob (Factures Juillet) created.');

  // --- 7. Notifications (depends on User) ---
  await prisma.notification.create({
    data: {
      content: "Votre budget 'Courses Alimentaires' pour Juillet 2023 approche de sa limite.",
      isSeen: false,
      userId: alice.id,
      createdAt: new Date('2023-07-20T10:00:00.000Z'),
    },
  });
  await prisma.notification.create({
    data: {
      content: 'Bienvenue Bob ! Configurez vos premières catégories et budgets.',
      isSeen: true,
      userId: bob.id,
      createdAt: new Date('2023-02-20T14:35:00.000Z'),
      updatedAt: new Date('2023-02-22T09:00:00.000Z'), // updatedAt peut être spécifié manuellement si besoin
    },
  });
  console.log('Notifications created.'); */

  console.log('Seeding finished.');
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect(); // Assure-toi de déconnecter en cas d'erreur aussi
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
