const app = require("./app");
const db = require("./config/db");

const PORT = process.env.PORT || 5000;

db.query("SELECT NOW()", (err, res) => {
    if (err) {
        console.log("Database Connection Failed");
        console.log(err);
    } else {
        console.log("Database Connected Successfully");
        console.log(res.rows[0]);
    }
});
console.log("JWT Secret:", process.env.JWT_SECRET);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});