export default function handler(req, res) {
  res.status(200).json({
    current: 8000.00,
    savings: 3500.00,
    credit: 845.67,
    total: 12345.67,
    change: 345.00
  });
}
