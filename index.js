const express = require('express');
const { ID, PORT,MAX_LENGTH,TYPE_VALUE } = require('./variable');
const app = express();
const statusCodes = require('http').STATUS_CODES


app.use(express.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(statusCodes.BAD_REQUEST).json({errorCode: 'statusCodes.BAD_REQUEST'});
});


app.post('/v1/test', (req, res) => {
  const { name, type } = req.body;

  if (!name || !type) {
    return res.status(statusCodes.BAD_REQUEST).json({ errorCode: statusCodes.BAD_REQUEST});
  }
  if (typeof name !== 'string' || name.length > MAX_LENGTH) {
    return res.status(statusCodes.BAD_REQUEST).json({errorCode: statusCodes.BAD_REQUEST});
  }
  if (typeof type !== 'number') {
    return res.status(statusCodes.BAD_REQUEST).json({errorCode: statusCodes.BAD_REQUEST});
  }
  res.status(statusCodes).json({ id:ID });
});


app.put('/v1/test/:id', (req, res) => {
  const { id } = req.params;
  const { type } = req.body;

  if (!/^[0-9]+$/.test(id) ) {
    return res.status(statusCodes[400]).json({ error: statusCodes[400]});
  }
  const parceId = parseInt(id);
  if ( parceId !== ID ){
    return res.status(statusCodes[400]).json({ error: statusCodes[400] });
  }
  if (!isNaN(type)) {
    return res.status(statusCodes.UNPROCESSABLE_CONTENT).json({ error: statusCodes[422]});
  }
  return res.status(statusCodes[200]).json({ id: parceId, type});
});


app.get('/v1/test', (req, res) => {
  const { name, type } = req.query;
  
  if (!name && !type || (!name || !type || name.length <= 0 || type.length <= 0)) {
    return res.sendStatus(204);
  }
  if (name.length > MAX_LENGTH) {
    return res.status(400).json({ error: HTTP_MESSAGES[400] });
  }
  if (!/^[0-9]+$/.test(type)) {
    return res.status(422).json({ error: 'Invalid type' });
  }
  const parseType = parseInt(type);
  if (name === 'pest' && parseType === TYPE_VALUE) {
    return res.status(200).json({ id: ID, name: 'pest', type: TYPE_VALUE });
  }
  return res.sendStatus(204);
});




app.listen(PORT, () => {
  console.log(`server runs on the port ${PORT}`);
});
