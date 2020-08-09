const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./router');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ entended: true }));

app.use(express.static(__dirname + '/../public'));

app.use('/', router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
