const express = require('express');
const { ID: id, PORT, ID } = require('./veribals');
const app = express();


app.use(express.json());
      app.post('/v1/test', (req, res) => {
        const { name, type } = req.body;

        if (!name || !type) {
          return res.status(400).json({ error: `ім'я та тип є обов'язковими полями` });
        }
        if (name.length > 255) {
          return res.status(400).json({ error: `Ім'я має містити максимум 255 символів` });
        }
        res.status(201).json({ ID: id });
      });


              app.put('/v1/test/:id', (req, res) => {
                const { id } = req.params;
                const type = req.body.type;

                if (Number(id) === ID) {
                  if (type !== undefined) {
                    const response = { ID: id, type };
                    return res.status(200).json(response);
                  } else {
                    return res.status(400).json({ error: 'Поле "type" є обов\'язковим.' });
                  }
                } else {
                  return res.status(404).json({ error: 'Запит не знайдено.' });
                }
              });

      app.get('/v1/test/:name/:type', (req, res) => {
        const { name, type } = req.params;

        if (name === 'pest' && Number(type) === 123) {
          return res.status(200).json({ ID: id, name: 'pest', type: 123 });
        } else {
          return res.status(404).json({ error: 'Запит не знайдено.' });
        }
      });

app.listen(PORT, () => {
  console.log(`Сервер працює на порту ${PORT}`);
});

