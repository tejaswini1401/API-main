//index.js is a server file frim that file our apis start runnung

/* jshint esversion: 6 */

const express = require("express");
const app = express();
const path = require("path"); // Import the 'path' module

const mongoose = require("mongoose");
const { MONGO_DB_CONFIG } = require("./config/app.config");
const errors = require("./middleware/errors.js");
const swaggerUi = require("swagger-ui-express"), swaggerDocument = require("./swagger.json");

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_DB_CONFIG.DB).then(
    () => {
        console.log("Database Connected");

    },
    (error) => {
        console.log("Database cant be connected: " + error);
    }
);

app.use(express.json());

app.use("/uploads", 
    express.static(path.join(__dirname,"uploads")));

app.use("/api", require("./routes/app.routes"));
app.use(errors.errorHandler);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(process.env.port || 4000, function () {
    console.log("Ready to Go!");
});
