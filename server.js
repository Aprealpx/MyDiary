require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// POST /api/check-password
app.post('/api/check-password', (req, res) => {
    const { password } = req.body;

    console.log("Entered:", password);
    console.log("Env Password:", process.env.DIARY_PASSWORD);

    if (password === process.env.DIARY_PASSWORD) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Diary running on port ${PORT}`));
