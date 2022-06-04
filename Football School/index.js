const app = require("./app/servar")
app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`))