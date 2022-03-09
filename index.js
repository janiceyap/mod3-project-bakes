// Import routes
const app = require("./routes/routes");
const {testConnection,syncDatabase} = require('./model/model');
const PORT = process.env.PORT || 3300;

syncDatabase();
testConnection();

app.listen(PORT, ()=>{
    console.log(`Listening to port ${PORT}`);
})

// http://localhost:3300/