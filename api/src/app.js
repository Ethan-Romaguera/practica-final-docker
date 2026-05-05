const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/practica_final";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        ok: true,
        message: "API REST funcionando correctamente",
        project: "Práctica final ISO - Docker CI/CD"
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({
        ok: true,
        status: "healthy",
        service: "api"
    });
});

app.use("/api/products", productRoutes);

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Conectado correctamente a MongoDB");

        app.listen(PORT, () => {
        console.log(`API escuchando en el puerto ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error al conectar con MongoDB:", error.message);
        process.exit(1);
    });