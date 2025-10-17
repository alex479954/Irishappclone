export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    if (username && password) {
      res.status(200).json({ success: true, token: 'mock-token-123' });
    } else {
      res.status(401).json({ success: false });
    }
  }
}
