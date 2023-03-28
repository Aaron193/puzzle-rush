import express from 'express';

const app = express();
let PORT = 6969 || process.env.PORT;

app.use(express.static('dist'));

app.listen(PORT, () => {
    console.log(`Waiting on: ${PORT}`);
});
