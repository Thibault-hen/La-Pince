import argon2 from 'argon2';
import prisma from './client';

async function main() {
  console.log('Emptying database ...');

  // L'ordre de suppression est important pour respecter les contraintes de clé étrangère
  await prisma.notification.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.budget.deleteMany();
  await prisma.category.deleteMany();
  await prisma.income.deleteMany();
  await prisma.user.deleteMany();
  await prisma.color.deleteMany();
  
  console.log('Start seeding ...');

  const hashedPassword = await argon2.hash('password');

  // --- 1. Colors ---
  await prisma.color.createMany({
    data: [
      { name: 'Blanc', value: '#ffffff' }, { name: 'Rouge', value: '#ef4444' },
      { name: 'Vert', value: '#22c55e' }, { name: 'Bleu', value: '#3b82f6' },
      { name: 'Jaune', value: '#eab308' }, { name: 'Violet', value: '#8b5cf6' },
      { name: 'Orange', value: '#f97316' }, { name: 'Rose', value: '#ec4899' },
      { name: 'Sarcelle', value: '#14b8a6' }, { name: 'Indigo', value: '#6366f1' },
      { name: 'Gris', value: '#6b7280' }
    ],
    skipDuplicates: true,
  });
  console.log('Colors created.');

  // Récupérer toutes les couleurs pour une utilisation facile
  const colors = await prisma.color.findMany();
  const colorMap = colors.reduce((acc, color) => {
    acc[color.name] = color;
    return acc;
  }, {});

  // --- 2. Users ---
  const alice = await prisma.user.create({
    data: {
      name: 'Alice Dupont',
      email: 'alice.dupont@example.com',
      password: hashedPassword,
      currency: 'EUR',
      alert: true,
      createdAt: new Date('2023-01-15T10:00:00.000Z'),
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

  // --- 3. Categories ---
  console.log('Creating categories...');
  // Categories for Alice
  const [categoryCoursesAlice, categoryTransportAlice, categoryLoisirsAlice, categorySanteAlice, categoryShoppingAlice] = await prisma.$transaction([
    prisma.category.create({ data: { title: 'Courses', userId: alice.id, colorId: colorMap['Bleu'].id } }),
    prisma.category.create({ data: { title: 'Transport', userId: alice.id, colorId: colorMap['Jaune'].id } }),
    prisma.category.create({ data: { title: 'Loisirs', userId: alice.id, colorId: colorMap['Vert'].id } }),
    prisma.category.create({ data: { title: 'Santé', userId: alice.id, colorId: colorMap['Rose'].id } }),
    prisma.category.create({ data: { title: 'Shopping', userId: alice.id, colorId: colorMap['Violet'].id } }),
  ]);
  // Categories for John
  const [categoryFacturesJohn, categoryAlimentationJohn, categoryVoitureJohn, categoryDivertissementJohn] = await prisma.$transaction([
    prisma.category.create({ data: { title: 'Factures', userId: john.id, colorId: colorMap['Rouge'].id } }),
    prisma.category.create({ data: { title: 'Alimentation', userId: john.id, colorId: colorMap['Bleu'].id } }),
    prisma.category.create({ data: { title: 'Voiture', userId: john.id, colorId: colorMap['Gris'].id } }),
    prisma.category.create({ data: { title: 'Divertissement', userId: john.id, colorId: colorMap['Orange'].id } }),
  ]);
  console.log('Categories created for Alice and John.');


  // --- 4. Incomes ---
  await prisma.income.createMany({
    data: [
      // Incomes for Alice
      { value: 2500.00, month: 7, year: 2023, userId: alice.id, createdAt: new Date('2023-07-01T08:00:00Z') },
      { value: 2550.00, month: 8, year: 2023, userId: alice.id, createdAt: new Date('2023-08-02T08:00:00Z') },
      { value: 2550.00, month: 9, year: 2023, userId: alice.id, createdAt: new Date('2023-09-01T08:00:00Z') },
      { value: 2600.00, month: 10, year: 2023, userId: alice.id, createdAt: new Date('2023-10-01T08:00:00Z') },
      // Incomes for John
      { value: 3200.00, month: 7, year: 2023, userId: john.id, createdAt: new Date('2023-07-05T09:00:00Z') },
      { value: 3200.00, month: 8, year: 2023, userId: john.id, createdAt: new Date('2023-08-04T09:00:00Z') },
      { value: 3250.00, month: 9, year: 2023, userId: john.id, createdAt: new Date('2023-09-05T09:00:00Z') },
      { value: 3250.00, month: 10, year: 2023, userId: john.id, createdAt: new Date('2023-10-06T09:00:00Z') },
    ]
  });
  console.log('Incomes created.');

  // --- 5. Budgets & 6. Expenses ---
  console.log('Creating budgets and expenses...');
  
  // --- ALICE'S DATA ---

  // Budget & Expenses for Alice - Juillet 2023
  const budgetCoursesAliceJuillet = await prisma.budget.create({ data: { amount: 400.00, limitAlert: 200, month: 7, year: 2023, categoryId: categoryCoursesAlice.id, userId: alice.id } });
  await prisma.expense.createMany({ data: [
      { description: 'Super U', amount: 92.45, date: new Date('2023-07-04T18:00Z'), budgetId: budgetCoursesAliceJuillet.id, userId: alice.id },
      { description: 'Marché local', amount: 35.10, date: new Date('2023-07-09T11:00Z'), budgetId: budgetCoursesAliceJuillet.id, userId: alice.id },
      { description: 'Lidl', amount: 78.90, date: new Date('2023-07-18T17:30Z'), budgetId: budgetCoursesAliceJuillet.id, userId: alice.id },
      { description: 'Boulangerie', amount: 15.20, date: new Date('2023-07-25T08:00Z'), budgetId: budgetCoursesAliceJuillet.id, userId: alice.id },
  ]});

  // Budget & Expenses for Alice - Août 2023
  const budgetTransportAliceAout = await prisma.budget.create({ data: { amount: 120.00, limitAlert: 200, month: 8, year: 2023, categoryId: categoryTransportAlice.id, userId: alice.id } });
  const budgetLoisirsAliceAout = await prisma.budget.create({ data: { amount: 150.00, limitAlert: 200, month: 8, year: 2023, categoryId: categoryLoisirsAlice.id, userId: alice.id } });
  await prisma.expense.createMany({ data: [
      { description: 'Pass Navigo', amount: 75.20, date: new Date('2023-08-01T09:00Z'), budgetId: budgetTransportAliceAout.id, userId: alice.id },
      { description: 'Uber sortie', amount: 18.50, date: new Date('2023-08-12T23:00Z'), budgetId: budgetTransportAliceAout.id, userId: alice.id },
      { description: 'Cinéma', amount: 24.00, date: new Date('2023-08-05T20:00Z'), budgetId: budgetLoisirsAliceAout.id, userId: alice.id },
      { description: 'Restaurant entre amis', amount: 42.80, date: new Date('2023-08-19T21:00Z'), budgetId: budgetLoisirsAliceAout.id, userId: alice.id },
  ]});

  // Budget & Expenses for Alice - Septembre 2023
  const budgetCoursesAliceSept = await prisma.budget.create({ data: { amount: 450.00, limitAlert: 200, month: 9, year: 2023, categoryId: categoryCoursesAlice.id, userId: alice.id } });
  const budgetSanteAliceSept = await prisma.budget.create({ data: { amount: 75.00, limitAlert: 200, month: 9, year: 2023, categoryId: categorySanteAlice.id, userId: alice.id } });
  await prisma.expense.createMany({ data: [
      { description: 'Carrefour', amount: 110.50, date: new Date('2023-09-03T16:00Z'), budgetId: budgetCoursesAliceSept.id, userId: alice.id },
      { description: 'Picard Surgelés', amount: 55.20, date: new Date('2023-09-11T19:00Z'), budgetId: budgetCoursesAliceSept.id, userId: alice.id },
      { description: 'Pharmacie', amount: 23.40, date: new Date('2023-09-14T12:00Z'), budgetId: budgetSanteAliceSept.id, userId: alice.id },
      { description: 'Rendez-vous médecin', amount: 25.00, date: new Date('2023-09-21T10:00Z'), budgetId: budgetSanteAliceSept.id, userId: alice.id },
  ]});

// --- JOHN'S DATA ---

// Budget & Expenses for John - Juillet 2023 (ce bloc est correct)
const budgetFacturesJohnJuillet = await prisma.budget.create({ data: { amount: 1200.00, limitAlert: 1200, month: 7, year: 2023, categoryId: categoryFacturesJohn.id, userId: john.id } });
await prisma.expense.createMany({ data: [
    { description: 'Loyer', amount: 850.00, date: new Date('2023-07-02T10:00Z'), budgetId: budgetFacturesJohnJuillet.id, userId: john.id },
    { description: 'Facture électricité', amount: 75.50, date: new Date('2023-07-15T10:00Z'), budgetId: budgetFacturesJohnJuillet.id, userId: john.id },
    { description: 'Abonnement Internet', amount: 49.99, date: new Date('2023-07-20T10:00Z'), budgetId: budgetFacturesJohnJuillet.id, userId: john.id },
]});

// Budget & Expenses for John - Août 2023 (ce bloc est correct)
const budgetAlimentationJohnAout = await prisma.budget.create({ data: { amount: 600.00, limitAlert: 800, month: 8, year: 2023, categoryId: categoryAlimentationJohn.id, userId: john.id } });
const budgetVoitureJohnAout = await prisma.budget.create({ data: { amount: 250.00, limitAlert: 500, month: 8, year: 2023, categoryId: categoryVoitureJohn.id, userId: john.id } });
await prisma.expense.createMany({ data: [
    { description: 'Costco run', amount: 215.30, date: new Date('2023-08-06T14:00Z'), budgetId: budgetAlimentationJohnAout.id, userId: john.id },
    { description: 'Restaurant date', amount: 120.00, date: new Date('2023-08-18T20:30Z'), budgetId: budgetAlimentationJohnAout.id, userId: john.id },
    { description: 'Plein d\'essence', amount: 65.70, date: new Date('2023-08-10T08:00Z'), budgetId: budgetVoitureJohnAout.id, userId: john.id },
]});

// =========================================================================
// == REMPLACEZ LE BLOC CI-DESSOUS DANS VOTRE FICHIER ==
// =========================================================================

// Budget & Expenses for John - Septembre 2023 (BLOC CORRIGÉ)
const budgetVoitureJohnSept = await prisma.budget.create({ data: { amount: 500.00, limitAlert: 800, month: 9, year: 2023, categoryId: categoryVoitureJohn.id, userId: john.id } });
const budgetDivertissementJohnSept = await prisma.budget.create({ data: { amount: 150.00, limitAlert: 200, month: 9, year: 2023, categoryId: categoryDivertissementJohn.id, userId: john.id } });

await prisma.expense.createMany({ data: [
  // Dépenses pour la voiture
  { description: 'Lavage auto', amount: 25.00, date: new Date('2023-09-08T11:00Z'), budgetId: budgetVoitureJohnSept.id, userId: john.id },
  { description: 'Révision annuelle', amount: 350.50, date: new Date('2023-09-12T15:00Z'), budgetId: budgetVoitureJohnSept.id, userId: john.id },
  { description: 'Plein d\'essence', amount: 70.10, date: new Date('2023-09-25T18:00Z'), budgetId: budgetVoitureJohnSept.id, userId: john.id },
  
  // Dépenses pour le divertissement
  { description: 'Concert', amount: 89.00, date: new Date('2023-09-22T19:00Z'), budgetId: budgetDivertissementJohnSept.id, userId: john.id },
]});

// =========================================================================

  console.log('Budgets and expenses created.');

  // --- 7. Notifications ---
  await prisma.notification.createMany({
    data: [
      {
        content: "Votre budget 'Courses' pour Juillet 2023 approche de sa limite.",
        isSeen: false,
        userId: alice.id,
        createdAt: new Date('2023-07-28T10:00:00.000Z'),
      },
      {
        content: 'Bienvenue John ! Configurez vos premières catégories et budgets.',
        isSeen: true,
        userId: john.id,
        createdAt: new Date('2023-02-20T14:35:00.000Z'),
        updatedAt: new Date('2023-02-22T09:00:00.000Z'),
      },
      {
        content: "Dépense importante détectée sur le budget 'Voiture'.",
        isSeen: false,
        userId: john.id,
        createdAt: new Date('2023-09-12T16:00:00.000Z'),
      }
    ]
  });
  console.log('Notifications created.');

  console.log('Seeding finished successfully.');
}

main()
  .catch(async (e) => {
    console.error('An error occurred during seeding:');
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });