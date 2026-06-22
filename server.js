require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// POST /api/check-password
app.post('/api/check-password', (req, res) => {
  const { password } = req.body;
  const correct = process.env.DIARY_PASSWORD || 'diary2024';
  if (password === correct) {
    res.json({ ok: true });
  } else {
    res.status(401).json({ ok: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Diary running on port ${PORT}`));
