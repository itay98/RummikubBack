const express = require('express'), app = express();
const users = require('./routes/users'), avatars = require('./routes/avatars');
const port = process.env.PORT || 5000, createS = require('./utils/socket');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': '*'
  });
  next();
});
app.use('/avatars', avatars);
app.use('/users', users);

const server = createS(app);
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));