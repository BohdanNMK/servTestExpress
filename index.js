const express = require('express');
const { ID, PORT } = require('./variable');
const app = express();


app.use(express.json());
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send('Bad Request');
});


app.post('/v1/test', (req, res) => {
  const { name, type } = req.body;

  if (!name || !type) {
    return res.status(400).json({ error: `'name' and 'type' are required fields` });
  }
  if (typeof name !== 'string' || name.length > 255) {
    return res.status(400).json({ error: `"name" field must be a string with a maximum of 255 characters` });
  }
  if (typeof type !== 'number') {
    return res.status(400).json({ error: `Field "type" must be a number` });
  }
  res.status(201).json({ id:ID });
});


app.put('/v1/test/:id', (req, res) => {
  const { id } = req.params;
  const { type } = req.body;

  if (!/^[a-zA-Z0-9]+$/.test(id) || isNaN(id) || Number(id) !== ID) {
    return res.status(400).json({ error: 'Bad Request' });
  }
  if (type !== undefined) {
    const response = { id: Number(id), type: Number(type) };
    return res.status(200).json(response);
  } else {
    return res.status(204).send();
  }
});


app.get('/v1/test', (req, res) => {
  const { name, type } = req.query

  if (!name && !type) {
    return res.status(422).json({ error: 'Unprocessable Entity' });
  } else if (name === 'pest' && Number(type) === 123) {
    return res.status(200).json({ id: ID, name: 'pest', type: 123 });
  } else if (typeof name !== 'string' || name.length > 255 || !name) {
    return res.status(400).json({ error: `Bad Request` });
  } else {
    return res.status(404).json({ error: 'Not Found' });
  }
});


app.listen(PORT, () => {
  console.log(`server runs on the port ${PORT}`);
});
