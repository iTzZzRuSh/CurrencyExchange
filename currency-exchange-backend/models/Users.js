const mysql = require('mysql');
const bcrypt = require('bcrypt');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Uzupełnij swoimi danymi
  password: '', // Uzupełnij swoimi danymi
  database: 'currency_exchange' // Uzupełnij swoimi danymi
});

const User = {
  create: (username, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) return reject(err);

        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (error, results) => {
          if (error) return reject(error);
          resolve(results);
        });
      });
    });
  },

  findByUsername: (username) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
        if (error) return reject(error);
        resolve(results[0]);
      });
    });
  }
};

module.exports = User;
