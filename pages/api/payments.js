export default function handler(req, res) {
  if (req.method === 'POST') {
    const { type, amount, recipient } = req.body;
    res.status(200).json({ success: true, message: `${type} of €${amount} to ${recipient} completed.` });
  }
}
