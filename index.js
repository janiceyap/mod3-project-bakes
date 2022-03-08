// Import routes
const app = require("./routes/routes");
const {testConnection,syncDatabase} = require('./model/model');

syncDatabase();
testConnection();

app.listen(3400, ()=>{
    console.log("Listening to port 3400");
})

// http://localhost:3300/