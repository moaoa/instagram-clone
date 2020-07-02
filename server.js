const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    require('morgan')('tiny');
}
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ msg: 'hello' });
});

app.listen(port, () => `server runnig on port ${port}`);
