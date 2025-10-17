export default function handler(req, res) {
  res.status(200).json([
    { message: 'Statement ready for download', type: 'info' },
    { message: 'New login from Dublin', type: 'warning' },
    { message: 'Payment received: €500', type: 'success' }
  ]);
}
