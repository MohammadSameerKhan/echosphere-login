const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (like login.html)
app.use(express.static(path.join(__dirname)));

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Placeholder for login
app.post('/login', (req, res) => {
  res.send('Login submitted (not implemented)');
});

// Google auth route placeholder
app.get('/auth/google', (req, res) => {
  res.send('Redirecting to Google OAuth (not implemented)');
});

app.listen(PORT, () => {
  console.log(`EchoSphere Login Server running at http://localhost:${PORT}`);
});


Add basic Node.js Express server to serve login page
