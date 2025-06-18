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
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const threeMonthsAgo = getRelativeMonthInfo(-3);
  const twoMonthsAgo = getRelativeMonthInfo(-2);
  const lastMonth = getRelativeMonthInfo(-1);
  const currentMonth = getRelativeMonthInfo(0);

  // --- 1. Colors ---
  await prisma.color.createMany({
    data: [
       { name: 'color.white', value: '#ffffff' },
  { name: 'color.red', value: '#ef4444' },
  { name: 'color.green', value: '#22c55e' },
  { name: 'color.blue', value: '#3b82f6' },
  { name: 'color.yellow', value: '#eab308' },
  { name: 'color.violet', value: '#8b5cf6' },
  { name: 'color.orange', value: '#f97316' },
  { name: 'color.pink', value: '#ec4899' },
  { name: 'color.teal', value: '#14b8a6' },
  { name: 'color.indigo', value: '#6366f1' },
  { name: 'color.gray', value: '#6b7280' },
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
      createdAt: new Date(),
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
      createdAt: new Date(),
    },
  });
  console.log(`Created user John with id: ${john.id}`);

  // --- 3. Categories ---
  console.log('Creating categories...');
  // Categories for Alice
  const [categoryCoursesAlice, categoryTransportAlice, categoryLoisirsAlice, categorySanteAlice, categoryShoppingAlice] = await prisma.$transaction([
    prisma.category.create({ data: { title: 'category.food', userId: alice.id, colorId: colorMap['color.blue'].id } }),
    prisma.category.create({ data: { title: 'category.transport', userId: alice.id, colorId: colorMap['color.yellow'].id } }),
    prisma.category.create({ data: { title: 'category.entertainment', userId: alice.id, colorId: colorMap['color.green'].id } }),
    prisma.category.create({ data: { title: 'category.health', userId: alice.id, colorId: colorMap['color.pink'].id } }),
    prisma.category.create({ data: { title: 'category.shopping', userId: alice.id, colorId: colorMap['color.violet'].id } }),
  ]);
  // Categories for John
  const [categoryFacturesJohn, categoryAlimentationJohn, categoryVoitureJohn, categoryDivertissementJohn] = await prisma.$transaction([
    prisma.category.create({ data: { title: 'category.bills', userId: john.id, colorId: colorMap['color.red'].id } }),
    prisma.category.create({ data: { title: 'category.food', userId: john.id, colorId: colorMap['color.blue'].id } }),
    prisma.category.create({ data: { title: 'category.transport', userId: john.id, colorId: colorMap['color.gray'].id } }),
    prisma.category.create({ data: { title: 'category.entertainment', userId: john.id, colorId: colorMap['color.orange'].id } }),
  ]);
  console.log('Categories created for Alice and John.');


  // --- 4. Incomes ---

  await prisma.income.createMany({
  data: [
    // Incomes for Alice (dynamiques et cohérents)
    { 
      value: 2500.00, 
      month: threeMonthsAgo.month, 
      year: threeMonthsAgo.year, 
      userId: alice.id, 
      createdAt: new Date(threeMonthsAgo.year, threeMonthsAgo.month - 1, 5) // Le 5 du mois
    },
    { 
      value: 2550.00, 
      month: twoMonthsAgo.month, 
      year: twoMonthsAgo.year, 
      userId: alice.id, 
      createdAt: new Date(twoMonthsAgo.year, twoMonthsAgo.month - 1, 3) // Le 3 du mois
    },
    { 
      value: 2550.00, 
      month: lastMonth.month, 
      year: lastMonth.year, 
      userId: alice.id, 
      createdAt: new Date(lastMonth.year, lastMonth.month - 1, 2) // Le 2 du mois
    },
    { 
      value: 2600.00, 
      month: currentMonth.month, 
      year: currentMonth.year, 
      userId: alice.id, 
      createdAt: new Date(currentMonth.year, currentMonth.month - 1, 1) // Le 1er du mois
    },

    // Incomes for John (également dynamiques et cohérents)
    { 
      value: 3200.00, 
      month: threeMonthsAgo.month, 
      year: threeMonthsAgo.year, 
      userId: john.id, 
      createdAt: new Date(threeMonthsAgo.year, threeMonthsAgo.month - 1, 5) 
    },
    { 
      value: 3200.00, 
      month: twoMonthsAgo.month, 
      year: twoMonthsAgo.year, 
      userId: john.id, 
      createdAt: new Date(twoMonthsAgo.year, twoMonthsAgo.month - 1, 4) 
    },
    { 
      value: 3250.00, 
      month: lastMonth.month, 
      year: lastMonth.year, 
      userId: john.id, 
      createdAt: new Date(lastMonth.year, lastMonth.month - 1, 6) 
    },
    { 
      value: 3250.00, 
      month: currentMonth.month, 
      year: currentMonth.year, 
      userId: john.id, 
      createdAt: new Date(currentMonth.year, currentMonth.month - 1, 2) 
    },
  ],});

  console.log('Incomes created.');

  // --- 5. Budgets & 6. Expenses ---
  console.log('Creating budgets and expenses...');

// --- ALICE'S DATA ---

// -- Données pour il y a 3 mois (dynamique) --
const budgetCoursesAlice1 = await prisma.budget.create({ 
  data: { 
    amount: 400.00, 
    limitAlert: 350, 
    month: threeMonthsAgo.month, 
    year: threeMonthsAgo.year, 
    categoryId: categoryCoursesAlice.id, 
    userId: alice.id 
  } 
});
await prisma.expense.createMany({ data: [
    { description: 'Super U', amount: 92.45, date: new Date(threeMonthsAgo.year, threeMonthsAgo.month - 1, 4), budgetId: budgetCoursesAlice1.id, userId: alice.id },
    { description: 'Marché local', amount: 35.10, date: new Date(threeMonthsAgo.year, threeMonthsAgo.month - 1, 11), budgetId: budgetCoursesAlice1.id, userId: alice.id },
    { description: 'Lidl', amount: 78.90, date: new Date(threeMonthsAgo.year, threeMonthsAgo.month - 1, 18), budgetId: budgetCoursesAlice1.id, userId: alice.id },
    { description: 'Boulangerie', amount: 15.20, date: new Date(threeMonthsAgo.year, threeMonthsAgo.month - 1, 25), budgetId: budgetCoursesAlice1.id, userId: alice.id },
]});

// -- Données pour il y a 2 mois (dynamique) --
const budgetTransportAlice2 = await prisma.budget.create({ 
  data: { 
    amount: 120.00, 
    limitAlert: 100, 
    month: twoMonthsAgo.month, 
    year: twoMonthsAgo.year, 
    categoryId: categoryTransportAlice.id, 
    userId: alice.id 
  } 
});
const budgetLoisirsAlice2 = await prisma.budget.create({ 
  data: { 
    amount: 150.00, 
    limitAlert: 120, 
    month: twoMonthsAgo.month, 
    year: twoMonthsAgo.year, 
    categoryId: categoryLoisirsAlice.id, 
    userId: alice.id 
  } 
});
await prisma.expense.createMany({ data: [
    { description: 'Pass Navigo', amount: 75.20, date: new Date(twoMonthsAgo.year, twoMonthsAgo.month - 1, 1), budgetId: budgetTransportAlice2.id, userId: alice.id },
    { description: 'Uber sortie', amount: 18.50, date: new Date(twoMonthsAgo.year, twoMonthsAgo.month - 1, 15), budgetId: budgetTransportAlice2.id, userId: alice.id },
    { description: 'Cinéma', amount: 24.00, date: new Date(twoMonthsAgo.year, twoMonthsAgo.month - 1, 20), budgetId: budgetLoisirsAlice2.id, userId: alice.id },
    { description: 'Restaurant entre amis', amount: 42.80, date: new Date(twoMonthsAgo.year, twoMonthsAgo.month - 1, 26), budgetId: budgetLoisirsAlice2.id, userId: alice.id },
]});

// -- Données pour le mois dernier (dynamique) --
const budgetCoursesAlice3 = await prisma.budget.create({ 
  data: { 
    amount: 450.00, 
    limitAlert: 400, 
    month: lastMonth.month, 
    year: lastMonth.year, 
    categoryId: categoryCoursesAlice.id, 
    userId: alice.id 
  } 
});
const budgetSanteAlice3 = await prisma.budget.create({ 
  data: { 
    amount: 75.00, 
    limitAlert: 60, 
    month: lastMonth.month, 
    year: lastMonth.year, 
    categoryId: categorySanteAlice.id, 
    userId: alice.id 
  } 
});
await prisma.expense.createMany({ data: [
    { description: 'Carrefour', amount: 110.50, date: new Date(lastMonth.year, lastMonth.month - 1, 6), budgetId: budgetCoursesAlice3.id, userId: alice.id },
    { description: 'Picard Surgelés', amount: 55.20, date: new Date(lastMonth.year, lastMonth.month - 1, 12), budgetId: budgetCoursesAlice3.id, userId: alice.id },
    { description: 'Pharmacie', amount: 23.40, date: new Date(lastMonth.year, lastMonth.month - 1, 19), budgetId: budgetSanteAlice3.id, userId: alice.id },
    { description: 'Rendez-vous médecin', amount: 25.00, date: new Date(lastMonth.year, lastMonth.month - 1, 28), budgetId: budgetSanteAlice3.id, userId: alice.id },
]});

const budgetShoppingAliceCurrent = await prisma.budget.create({ 
  data: { 
    amount: 200.00, 
    limitAlert: 180, 
    month: currentMonth.month, 
    year: currentMonth.year, 
    categoryId: categoryShoppingAlice.id, // Catégorie "Shopping"
    userId: alice.id 
  } 
});
const budgetLoisirsAliceCurrent = await prisma.budget.create({ 
  data: { 
    amount: 150.00, 
    limitAlert: 120, 
    month: currentMonth.month, 
    year: currentMonth.year, 
    categoryId: categoryLoisirsAlice.id, // Catégorie "Loisirs"
    userId: alice.id 
  } 
});
await prisma.expense.createMany({ data: [
  // Dépenses du mois courant pour Alice
  { description: 'Nouveaux vêtements', amount: 89.99, date: new Date(currentMonth.year, currentMonth.month - 1, 5), budgetId: budgetShoppingAliceCurrent.id, userId: alice.id },
  { description: 'Sortie au bar', amount: 35.50, date: new Date(currentMonth.year, currentMonth.month - 1, 12), budgetId: budgetLoisirsAliceCurrent.id, userId: alice.id },
  { description: 'Achat livre', amount: 22.00, date: new Date(currentMonth.year, currentMonth.month - 1, 15), budgetId: budgetLoisirsAliceCurrent.id, userId: alice.id },
]});

// --- JOHN'S DATA ---

// -- Données pour il y a 3 mois (dynamique) --
const budgetFacturesJohn1 = await prisma.budget.create({ 
  data: { 
    amount: 1200.00, 
    limitAlert: 1100, 
    month: threeMonthsAgo.month, 
    year: threeMonthsAgo.year, 
    categoryId: categoryFacturesJohn.id, 
    userId: john.id 
  } 
});
await prisma.expense.createMany({ data: [
    { description: 'Loyer', amount: 850.00, date: new Date(threeMonthsAgo.year, threeMonthsAgo.month - 1, 3), budgetId: budgetFacturesJohn1.id, userId: john.id },
    { description: 'Facture électricité', amount: 75.50, date: new Date(threeMonthsAgo.year, threeMonthsAgo.month - 1, 14), budgetId: budgetFacturesJohn1.id, userId: john.id },
    { description: 'Abonnement Internet', amount: 49.99, date: new Date(threeMonthsAgo.year, threeMonthsAgo.month - 1, 21), budgetId: budgetFacturesJohn1.id, userId: john.id },
]});

// -- Données pour il y a 2 mois (dynamique) --
const budgetAlimentationJohn2 = await prisma.budget.create({ 
  data: { 
    amount: 600.00, 
    limitAlert: 550, 
    month: twoMonthsAgo.month, 
    year: twoMonthsAgo.year, 
    categoryId: categoryAlimentationJohn.id, 
    userId: john.id 
  } 
});
const budgetVoitureJohn2 = await prisma.budget.create({ 
  data: { 
    amount: 250.00, 
    limitAlert: 200, 
    month: twoMonthsAgo.month, 
    year: twoMonthsAgo.year, 
    categoryId: categoryVoitureJohn.id, 
    userId: john.id 
  } 
});
await prisma.expense.createMany({ data: [
    { description: 'Costco run', amount: 215.30, date: new Date(twoMonthsAgo.year, twoMonthsAgo.month - 1, 7), budgetId: budgetAlimentationJohn2.id, userId: john.id },
    { description: 'Restaurant date', amount: 120.00, date: new Date(twoMonthsAgo.year, twoMonthsAgo.month - 1, 18), budgetId: budgetAlimentationJohn2.id, userId: john.id },
    { description: 'Plein d\'essence', amount: 65.70, date: new Date(twoMonthsAgo.year, twoMonthsAgo.month - 1, 24), budgetId: budgetVoitureJohn2.id, userId: john.id },
]});

// -- Données pour le mois dernier (dynamique) --
const budgetVoitureJohn3 = await prisma.budget.create({ 
  data: { 
    amount: 500.00, 
    limitAlert: 450, 
    month: lastMonth.month, 
    year: lastMonth.year, 
    categoryId: categoryVoitureJohn.id, 
    userId: john.id 
  } 
});
const budgetDivertissementJohn3 = await prisma.budget.create({ 
  data: { 
    amount: 150.00, 
    limitAlert: 125, 
    month: lastMonth.month, 
    year: lastMonth.year, 
    categoryId: categoryDivertissementJohn.id, 
    userId: john.id 
  } 
});
const budgetAlimentationJohnCurrent = await prisma.budget.create({ 
  data: { 
    amount: 550.00, 
    limitAlert: 500, 
    month: currentMonth.month, 
    year: currentMonth.year, 
    categoryId: categoryAlimentationJohn.id, // Catégorie "Alimentation"
    userId: john.id 
  } 
});
const budgetVoitureJohnCurrent = await prisma.budget.create({ 
  data: { 
    amount: 150.00, 
    limitAlert: 120, 
    month: currentMonth.month, 
    year: currentMonth.year, 
    categoryId: categoryVoitureJohn.id, // Catégorie "Voiture"
    userId: john.id 
  } 
});
await prisma.expense.createMany({ data: [
  // Dépenses du mois courant pour John
  { description: 'Courses de la semaine', amount: 130.45, date: new Date(currentMonth.year, currentMonth.month - 1, 3), budgetId: budgetAlimentationJohnCurrent.id, userId: john.id },
  { description: 'Plein d\'essence', amount: 72.80, date: new Date(currentMonth.year, currentMonth.month - 1, 8), budgetId: budgetVoitureJohnCurrent.id, userId: john.id },
  { description: 'Fast food midi', amount: 15.60, date: new Date(currentMonth.year, currentMonth.month - 1, 14), budgetId: budgetAlimentationJohnCurrent.id, userId: john.id },
]});

await prisma.expense.createMany({ data: [
  { description: 'Lavage auto', amount: 25.00, date: new Date(lastMonth.year, lastMonth.month - 1, 9), budgetId: budgetVoitureJohn3.id, userId: john.id },
  { description: 'Révision annuelle', amount: 350.50, date: new Date(lastMonth.year, lastMonth.month - 1, 16), budgetId: budgetVoitureJohn3.id, userId: john.id },
  { description: 'Plein d\'essence', amount: 70.10, date: new Date(lastMonth.year, lastMonth.month - 1, 23), budgetId: budgetVoitureJohn3.id, userId: john.id },
  { description: 'Concert', amount: 89.00, date: new Date(lastMonth.year, lastMonth.month - 1, 29), budgetId: budgetDivertissementJohn3.id, userId: john.id },
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
        createdAt: new Date(),
      },
      {
        content: 'Bienvenue John ! Configurez vos premières catégories et budgets.',
        isSeen: true,
        userId: john.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: "Dépense importante détectée sur le budget 'Voiture'.",
        isSeen: false,
        userId: john.id,
        createdAt: new Date(),
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

  /**
 * Calcule l'année et le mois (1-12) pour un décalage de mois donné par rapport à aujourd'hui.
 * @param {number} monthOffset - Le nombre de mois à décaler. -1 pour le mois dernier, etc.
 * @returns {{year: number, month: number}}
 */
function getRelativeMonthInfo(monthOffset: number) {
  const date = new Date();
  date.setDate(1); // On se base sur le 1er du mois pour éviter les problèmes de jours (ex: 31 Jan -> 2 Mars)
  date.setMonth(date.getMonth() + monthOffset);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  };
}
