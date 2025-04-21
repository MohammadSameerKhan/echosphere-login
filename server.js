const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


const GOOGLE_CLIENT_ID = '724759123545-hgl49r2hor0suniqn57rg6v80jejvdq.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

// Session middleware
app.use(session({
  secret: 'echosphere_secret',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Serve static login page
app.use(express.static(path.join(__dirname)));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res) => {
  res.send('Login form not implemented.');
});

app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.send(`<h2>Welcome, ${req.user.displayName}!</h2><p>Email: ${req.user.emails[0].value}</p>`);
  }
);

app.listen(PORT, () => {
  console.log(`EchoSphere Login Server running at http://localhost:${PORT}`);
});
