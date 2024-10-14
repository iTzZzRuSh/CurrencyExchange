const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User'); // Dodaj to
const jwt = require('jsonwebtoken'); // Dodaj to

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5001;

// Rejestracja
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await User.create(username, password);
    res.status(201).json({ message: 'Użytkownik zarejestrowany!', userId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Błąd podczas rejestracji: ' + error.message });
  }
});

// Logowanie
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).json({ error: 'Nieprawidłowe dane logowania' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Nieprawidłowe dane logowania' });
    }

    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' }); // Zmień 'your_jwt_secret' na swój sekret
    res.json({ message: 'Zalogowano pomyślnie!', token });
  } catch (error) {
    res.status(500).json({ error: 'Błąd podczas logowania: ' + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
