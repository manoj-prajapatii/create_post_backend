const app = require('./src/app');
const connectDb = require('./src/db/db');

connectDb()
    .then(() => {
        app.listen(3000, () => {
            console.log("Chalne do Guru.....☠️!");
        });
    })
    .catch((err) => {
        console.log("Database Connection Failed:", err);
    });