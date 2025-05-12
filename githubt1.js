const express = require('express');
// const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

const url = 'https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY';

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  'Accept': 'application/json',
  'Referer': 'https://www.nseindia.com/option-chain',
  'Cookie': 'nsit=sMdHdgAK2exBmELRqWPe7muw; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTc0NzA3NDI2MywiZXhwIjoxNzQ3MDgxNDYzfQ.0L8uJRwhmDYxqKiNm_oQeAU6wqJ6f5e_dWNefvXWD_M',
};

app.get('/data', async (req, res) => {
  try {
    const response = await fetch(url, { headers });
    const data = await response.json();
    res.json({
      callOptions: data.filtered?.CE,
      putOptions: data.filtered?.PE,
    });
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch NSE data' });
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to NSE Data App. Visit /data to fetch data.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
