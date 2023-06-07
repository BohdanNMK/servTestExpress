const express = require('express');
const { ID, PORT,MAX_LENGTH,TYPE_VALUE,HTTP_STATUS,HTTP_MESSAGES } = require('./variable');
const app = express();


app.use(express.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(400).json({error: HTTP_MESSAGES[HTTP_STATUS.BAD_REQUEST] });//чи можна таким чином(чи дозволений такий формат)?
});


app.post('/v1/test', (req, res) => {
  const { name, type } = req.body;

  if (!name || !type) {
    return res.status(400).json({ error: HTTP_MESSAGES[400.1] });//Чи допустимий таким чином формат помилки?
  }
  if (typeof name !== 'string' || name.length > MAX_LENGTH) {
    return res.status(400).json({ error: HTTP_MESSAGES[400.2] });
  }
  if (typeof type !== 'number') {
    return res.status(400).json({ error: HTTP_MESSAGES[400.3] });
  }
  res.status(201).json({ id:ID });
});


app.put('/v1/test/:id', (req, res) => {
  const { id } = req.params;
  const { type } = req.body;

  if (!/^[0-9]+$/.test(id) || parseInt(id) !== ID) {
    return res.status(400).json({ error: HTTP_MESSAGES[400] });
  }
  if (type !== undefined) {
    const response = { id: parseInt(id), type: parseInt(type) };
    return res.status(200).json(response);
  } else {
    return res.status(204).json();
  }
});


app.get('/v1/test', (req, res) => {
  const { name, type } = req.query;

  if (name === 'pest' && typeof type === 'string' && parseInt(type) === TYPE_VALUE) {
    const response = { id: ID, name: 'pest', type: TYPE_VALUE };
    return res.status(200).json(response);
  } else if (!name && !type) {
    return res.status(204).json();
  } else if (
    (name && typeof name !== 'string') ||
    (name && name.length > MAX_LENGTH) ||
    (type && (typeof type !== 'string' || isNaN(parseInt(type)) || parseInt(type) !== TYPE_VALUE))
  ) {
    return res.status(400).json({ error: HTTP_MESSAGES[400] });
  } else {
    return res.status(404).json({ error: HTTP_MESSAGES[404] });//??? не зовсім зрозучів чому не 404.
  }
});



app.listen(PORT, () => {
  console.log(`server runs on the port ${PORT}`);
});
