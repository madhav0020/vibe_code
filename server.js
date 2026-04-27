const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Mock User Database
const users = [
    { email: 'admin@influencerstudio.com', password: 'password123' }
];

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // In a real app, you would set a session or JWT here
        res.send('<h1>Login Successful!</h1><p>Welcome to the INFLUENCER STUDIO dashboard.</p><a href="/">Back to Home</a>');
    } else {
        res.status(401).send('<h1>Login Failed</h1><p>Invalid email or password.</p><a href="/login">Try Again</a>');
    }
});

app.listen(PORT, () => {
    console.log(`INFLUENCER STUDIO Platform running at http://localhost:${PORT}`);
});