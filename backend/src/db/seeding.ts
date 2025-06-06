import argon2 from 'argon2';
import prisma from './client';

async function main() {
  console.log('Empty database ...');

  await prisma.color.deleteMany();
  await prisma.budget.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.user.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.category.deleteMany();
  await prisma.income.deleteMany();

  console.log('Start seeding ...');

  const hashedPassword = await argon2.hash('password'); 

  // --- 1. Colors (no dependencies, IDs auto-incremented) ---
  // On peut les créer en premier et ensuite les récupérer par leur 'name' ou 'value' unique.
  await prisma.color.createMany({
    data: [
      { name: 'Blanc', value: 'bg-white' },
      { name: 'Rouge', value: 'bg-red-500' },
      { name: 'Vert', value: 'bg-green-500' },
      { name: 'Bleu', value: 'bg-blue-500' },
      { name: 'Jaune', value: 'bg-yellow-500' },
      { name: 'Violet', value: 'bg-purple-500' },
      { name: 'Orange', value: 'bg-orange-500' },
      { name: 'Rose', value: 'bg-pink-500' },
      { name: 'Sarcelle', value: 'bg-teal-500' },
      { name: 'Indigo', value: 'bg-indigo-500' },
      { name: 'Gris', value: 'bg-gray-500' },
    ],
    skipDuplicates: true, // Au cas où tu relances le seed
  });
  console.log('Colors created.');

  // Récupérer les couleurs pour les utiliser plus tard
  const colorRouge = await prisma.color.findUniqueOrThrow({ where: { name: 'Rouge' } });
  const colorBleu = await prisma.color.findUniqueOrThrow({ where: { name: 'Bleu' } });
  const colorVert = await prisma.color.findUniqueOrThrow({ where: { name: 'Vert' } });
  const colorJaune = await prisma.color.findUniqueOrThrow({ where: { name: 'Jaune' } });
  const colorOrange = await prisma.color.findUniqueOrThrow({ where: { name: 'Orange' } });
  const colorWhite = await prisma.color.findUniqueOrThrow({ where: { name: 'Blanc' } });


  // --- 2. Users (no dependencies, IDs CUID auto-generated) ---
  const alice = await prisma.user.create({
    data: {
      name: 'Alice Dupont',
      email: 'alice.dupont@example.com',
      password: hashedPassword, // Assure-toi de hasher les mots de passe dans un vrai scénario
      currency: 'EUR',
      alert: true,
      createdAt: new Date('2023-01-15T10:00:00.000Z'),
      // updatedAt est géré par @updatedAt
    },
  });
  console.log(`Created user Alice with id: ${alice.id}`);


  const john = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: hashedPassword,
      currency: 'USD',
      alert: false,
      createdAt: new Date('2023-02-20T14:30:00.000Z'),
    },
  });
  console.log(`Created user John with id: ${john.id}`);

  // --- 3. Categories (depends on User and Color) ---
  // Categories for Alice
  const categoryCoursesAlice = await prisma.category.create({
    data: {
      title: 'Courses Alimentaires',
      userId: alice.id, // ou user: { connect: { id: alice.id } }
      colorId: colorWhite.id, // ou color: { connect: { id: colorRouge.id } }
      createdAt: new Date('2023-01-16T10:00:00.000Z'),
    },
  });
  console.log(`Created category 'Courses Alimentaires' for Alice with id: ${categoryCoursesAlice.id}`);

  const categoryTransportAlice = await prisma.category.create({
    data: {
      title: 'Transport',
      user: { connect: { id: alice.id } },
      color: { connect: { id: colorWhite.id } },
      createdAt: new Date('2023-01-16T11:00:00.000Z'),
    },
  });
  console.log(`Created category 'Transport' for Alice with id: ${categoryTransportAlice.id}`);

  const categoryLoisirsAlice = await prisma.category.create({
    data: {
      title: 'Loisirs',
      userId: alice.id,
      colorId: colorWhite.id,
      createdAt: new Date('2023-01-16T12:00:00.000Z'),
    },
  });
   console.log(`Created category 'Loisirs' for Alice with id: ${categoryLoisirsAlice.id}`);

  // Categories for John
  const categoryFacturesJohn = await prisma.category.create({
    data: {
      title: 'Factures Mensuelles',
      userId: john.id,
      colorId: colorWhite.id,
      createdAt: new Date('2023-02-21T09:00:00.000Z'),
    },
  });
  console.log(`Created category 'Factures Mensuelles' for John with id: ${john.id}`);

  const categoryAlimentationJohn = await prisma.category.create({
    data: {
      title: 'Alimentation',
      userId: john.id,
      colorId: colorWhite.id,
      createdAt: new Date('2023-02-21T10:00:00.000Z'),
    },
  });
  console.log(`Created category 'Alimentation' for John with id: ${categoryAlimentationJohn.id}`);

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

  // Income for John
  await prisma.income.create({
    data: {
      value: 3200.00,
      month: 7, 
      year: 2023,
      userId: john.id,
      createdAt: new Date('2023-07-01T09:00:00.000Z'),
    },
  });
  console.log('Income for John created.');

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
      month: 7, // Le schéma indique String pour month
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
      month: 8, // Changé en Août
      year: 2023,
      categoryId: categoryTransportAlice.id,
      userId: alice.id,
      createdAt: new Date('2023-08-01T10:05:00.000Z'),
    },
  });
  console.log(`Created budget for 'Transport' (Alice, Août) with id: ${budgetTransportAliceAout.id}`);

  // Budget for John - Juillet 2023 (Factures)
  const budgetFacturesJohnJuillet = await prisma.budget.create({
    data: {
      amount: '800.00',
      limitAlert: 0.85,
      month: 7,
      year: 2023,
      categoryId: categoryFacturesJohn.id,
      userId: john.id,
      createdAt: new Date('2023-07-01T12:00:00.000Z'),
    },
  });
  console.log(`Created budget for 'Factures Mensuelles' (John, Juillet) with id: ${budgetFacturesJohnJuillet.id}`);

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

  // Expense for John's "Factures Mensuelles" budget in July
  await prisma.expense.create({
    data: {
      description: 'Loyer',
      amount: 650.00,
      date: new Date('2023-07-03T10:00:00.000Z'),
      budgetId: budgetFacturesJohnJuillet.id,
      userId: john.id,
      createdAt: new Date('2023-07-03T10:01:00.000Z'),
    },
  });
  console.log('Expense for John (Factures Juillet) created.');

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
      content: 'Bienvenue John ! Configurez vos premières catégories et budgets.',
      isSeen: true,
      userId: john.id,
      createdAt: new Date('2023-02-20T14:35:00.000Z'),
      updatedAt: new Date('2023-02-22T09:00:00.000Z'), // updatedAt peut être spécifié manuellement si besoin
    },
  });
  console.log('Notifications created.');

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
