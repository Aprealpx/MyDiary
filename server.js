const fs = require('fs');
const path = require('path');

// Manually load .env file
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    lines.forEach(line => {
        const [key, ...rest] = line.split('=');
        if (key && rest.length) {
            process.env[key.trim()] = rest.join('=').trim();
        }
    });
    console.log('.env loaded from:', envPath);
} else {
    console.log('.env NOT found at:', envPath);
}

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

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
