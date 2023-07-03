const express = require('express');
const { VALUE, HTTP_MESSAGES, PORT } = require('./variable');
const app = express();
const statusCodes = require('http2').constants


app.use(express.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(statusCodes.HTTP_STATUS_BAD_REQUEST).json({ error: HTTP_MESSAGES.BAD_REQUEST });
});


app.post('/v1/test', (req, res) => {
  const { name, type } = req.body;

  if (!name && !type(!name || !type)) {
    return res.status(statusCodes.HTTP_STATUS_BAD_REQUEST).json({ error: HTTP_MESSAGES.ERR400.ERR_REQUIRED_FIELDS });
  }
  if (typeof name !== 'string' && typeof type !== 'number' || name.length >= VALUE.MAX_LENGTH) {
    return res.status(statusCodes.HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: HTTP_MESSAGES.UNPROCESSABLE_ENTITY });
  }
  res.status(statusCodes.HTTP_STATUS_CREATED).json({ id: VALUE.ID });
});


app.put('/v1/test/:id', (req, res) => {
  const { id } = req.params;
  const { type } = req.body;

  if (typeof id === 'undefined') {
    return res.status(statusCodes.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR })
  }
  if (!/^[0-9]+$/.test(id)) {
    return res.status(statusCodes.HTTP_STATUS_BAD_REQUEST).json({ error: HTTP_MESSAGES.BAD_REQUEST });
  }
  const parceId = parseInt(id);
  if (parceId !== VALUE.ID) {
    return res.status(statusCodes.HTTP_STATUS_BAD_REQUEST).json({ error: HTTP_MESSAGES.BAD_REQUEST });
  }
  if (!type || typeof type === 'undefined' || typeof type !== 'number') {
    return res.status(statusCodes.HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: HTTP_MESSAGES.UNPROCESSABLE_ENTITY });
  }
  return res.status(statusCodes.HTTP_STATUS_OK).json({ id: parceId, type });
});


app.get('/v1/test', (req, res) => {
  const { name, type } = req.query;

  if (!name && !type || (!name || !type || name.length <= 0 || type.length <= 0)) {
    return res.sendStatus(statusCodes.HTTP_STATUS_BAD_REQUEST);
  }
  if (typeof name !== 'string' || name.length >= VALUE.MAX_LENGTH) {
    return res.status(statusCodes.HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: HTTP_MESSAGES.BAD_REQUEST });
  }
  if (!/^[0-9]+$/.test(type)) {
    return res.status(statusCodes.HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: HTTP_MESSAGES.UNPROCESSABLE_ENTITY });
  }

  const parseType = parseInt(type);
  if (name === VALUE.NAME_VALUE && parseType === VALUE.TYPE_VALUE) {
    return res.status(statusCodes.HTTP_STATUS_OK).json({ id: VALUE.ID, name: VALUE.NAME_VALUE, type: VALUE.TYPE_VALUE });
  }
  return res.sendStatus(statusCodes.HTTP_STATUS_NO_CONTENT);
});


app.listen(PORT, () => {
  console.log(`server runs on the port ${PORT}`);
});
