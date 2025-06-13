export interface ICategory {
  id: string;
  title: string;
  color: string;
  budget: {
    id: string;
    amount: number;
    totalExpenses: number;
  };
}

export interface IBudget {
  id: string;
  title?: string;
  amount?: number;
  value?: string;
  totalExpenses: number;
}

export const budgets = [
  { id: '1', title: 'Nourriture', amount: 200, value: '#FF5733', totalExpenses: 201 },
  { id: '2', title: 'Voyages', amount: 200, value: '#33FF57', totalExpenses: 250 },
  { id: '3', title: 'Vêtements', amount: 287, value: '#3357FF', totalExpenses: 60 },
  { id: '4', title: 'Loisirs', amount: 173, value: '#FF33A1', totalExpenses: 520 },
  { id: '5', title: 'Autres', amount: 190, value: '#A133FF', totalExpenses: 130 },
  { id: '6', title: 'Loisirs', amount: 173, value: '#FF33A1', totalExpenses: 50 },
  { id: '7', title: 'Autres', amount: 190, value: '#A133FF', totalExpenses: 103 },
  { id: '8', title: 'Loisirs', amount: 173, value: '#FF33A1', totalExpenses: 50 },
  { id: '9', title: 'Autres', amount: 190, value: '#A133FF', totalExpenses: 103 },
] as IBudget[];

export const chartData = [
  { title: 'Nourriture', amount: 275, fill: '#4c51bf' },
  { title: 'Voyages', amount: 200, fill: '#f56565' },
  { title: 'Vêtements', amount: 287, fill: '#f97316' },
  { title: 'Loisirs', amount: 173, fill: '#22c55e' },
  { title: 'Autres', amount: 190, fill: '#a855f7' },
  { title: 'Nourriture', amount: 275, fill: '#4c51bf' },
  { title: 'Voyages', amount: 200, fill: '#f56565' },
  { title: 'Vêtements', amount: 287, fill: '#f97316' },
];

export const colors = [
  { hex: '#FF5733', title: 'Red' },
  { hex: '#33FF57', title: 'Green' },
  { hex: '#3357FF', title: 'Blue' },
  { hex: '#FF33A1', title: 'Pink' },
  { hex: '#A133FF', title: 'Purple' },
  { hex: '#33FFF5', title: 'Cyan' },
  { hex: '#F5FF33', title: 'Yellow' },
  { hex: '#FF8C33', title: 'Orange' },
  { hex: '#33FF8C', title: 'Teal' },
];

export const categories = [
  {
    id: '1',
    title: 'Nourriture',
    color: '#FF5733',
    budget: { id: 'b1', amount: 500, totalExpenses: 300 },
  },
  {
    id: '2',
    title: 'Voyages',
    color: '#33FF57',
    budget: { id: 'b2', amount: 1000, totalExpenses: 800 },
  },
  {
    id: '3',
    title: 'Vêtements',
    color: '#3357FF',
    budget: { id: 'b3', amount: 400, totalExpenses: 150 },
  },
  {
    id: '4',
    title: 'Loisirs',
    color: '#FF33A1',
    budget: { id: 'b4', amount: 300, totalExpenses: 100 },
  },
  {
    id: '5',
    title: 'Autres',
    color: '#A133FF',
    budget: { id: 'b5', amount: 200, totalExpenses: 150 },
  },
  {
    id: '6',
    title: 'Loisirs',
    color: '#33FFF5',
    budget: { id: 'b6', amount: 300, totalExpenses: 100 },
  },
  {
    id: '7',
    title: 'Autres',
    color: '#F5FF33',
    budget: { id: 'b7', amount: 200, totalExpenses: 150 },
  },
  {
    id: '8',
    title: 'Loisirs',
    color: '#FF8C33',
    budget: { id: 'b8', amount: 300, totalExpenses: 100 },
  },
  {
    id: '9',
    title: 'Autres',
    color: '#33FF8C',
    budget: { id: 'b9', amount: 200, totalExpenses: 150 },
  },
] as ICategory[];
