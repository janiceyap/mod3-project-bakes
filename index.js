// Import routes
const app = require("./routes/routes");
const {testConnection,syncDatabase} = require('./model/model');

syncDatabase();
testConnection();

app.listen(3300, ()=>{
    console.log("Listening to port 3300");
})

// http://localhost:3300/