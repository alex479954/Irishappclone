export default function handler(req, res) {
  res.status(200).json([
    { date: '2025-10-15', description: 'Grocery Store', amount: -45.20 },
    { date: '2025-10-13', description: 'Salary', amount: 2500.00 },
    { date: '2025-10-10', description: 'Electric Bill', amount: -120.00 },
    { date: '2025-10-08', description: 'Coffee Shop', amount: -5.50 },
    { date: '2025-10-05', description: 'Online Shopping', amount: -200.00 }
  ]);
}
