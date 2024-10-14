import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CurrencyList.css';

const CurrencyList = () => {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD'); // Zastąp URL odpowiednim API
        setCurrencies(Object.entries(response.data.rates));
        setLoading(false);
      } catch (error) {
        console.error('Błąd podczas pobierania walut:', error);
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  if (loading) {
    return <div>Ładowanie...</div>;
  }

  return (
    <div>
      <h1>Kursy Walut</h1>
      <ul>
        {currencies.map(([currency, rate]) => (
          <li key={currency}>
            {currency}: {rate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrencyList;
