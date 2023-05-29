const express = require('express');
const { ID, PORT } = require('./veribals');
const app = express();


app.use(express.json());
app.post('/v1/test', (req, res) => {
  const { name, type } = req.body;

  if (!name || !type) {
    return res.status(400).json({ error: `ім'я та тип є обов'язковими полями` });
  }
  if (typeof name !== 'string' || name.length > 255) {
    return res.status(400).json({ error: `Поле "name" має бути рядком і містити максимум 255 символів` });
  }
  if (typeof type !== 'number') {
    return res.status(400).json({ error: `Поле "type" має бути числом` });
  }
  res.status(201).json({ ID });
});


app.put('/v1/test/:id', (req, res) => {
  const { id } = req.params;
  const { type } = req.body;

  if (Number(id) === ID) {
    if (type !== undefined) {
      const response = { id: Number(id), type: Number(type) };
      return res.status(200).json(response);
    } else {
      return res.status(204).send();
    }
  } else {
    return res.status(404).json({ error: 'Запит не знайдено.' });
  }
});


app.get('/v1/test', (req, res) => {
  const { name, type } = req.query;

  if (name === 'pest' && Number(type) === 123) {
    return res.status(200).json({ ID, name: 'pest', type: 123 });
  } else if (name.length > 255) {
    return res.status(400).json({ error: `Ім'я має містити максимум 255 символів` });
  } else {
    return res.status(404).json({ error: 'Запит не знайдено.' });
  }
});


app.listen(PORT, () => {
  console.log(`Сервер працює на порту ${PORT}`);
});

