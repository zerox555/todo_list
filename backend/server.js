const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


app.get("/todos", async (req, res) => {

});

const PORT = process.env.PORT || 3000
app.listen(5000, () => console.log("Server running on port 5000"));
