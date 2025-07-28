import prisma from './client';

const colorSeeding = async (): Promise<void> => {
  await prisma.color.createMany({
    data: [
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
      { name: 'color.quentin', value: '#ff00ff' },
    ],
    skipDuplicates: true,
  });
  console.log('Colors created.');
};

await colorSeeding()
  .then(() => console.log('Color seeding completed successfully.'))
  .catch((error) => console.error('Error seeding colors:', error));
