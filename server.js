require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// POST /api/check-password
app.post('/api/check-password', (req, res) => {
    const { password } = req.body;

    console.log("Entered:", JSON.stringify(password));
    console.log("Env Password:", JSON.stringify(process.env.DIARY_PASSWORD));
    console.log("Match:", password === process.env.DIARY_PASSWORD);

    if (password === process.env.DIARY_PASSWORD) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Diary running on port ${PORT}`));
