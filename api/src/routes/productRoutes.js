const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        res.status(200).json({
        ok: true,
        count: products.length,
        data: products
        });
    } catch (error) {
        res.status(500).json({
        ok: false,
        message: "Error al obtener los productos",
        error: error.message
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
        return res.status(404).json({
            ok: false,
            message: "Producto no encontrado"
        });
        }

        res.status(200).json({
        ok: true,
        data: product
        });
    } catch (error) {
        res.status(500).json({
        ok: false,
        message: "Error al obtener el producto",
        error: error.message
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, description, imageUrl } = req.body;

        const product = await Product.create({
        name,
        description,
        imageUrl
        });

        res.status(201).json({
        ok: true,
        message: "Producto creado correctamente",
        data: product
        });
    } catch (error) {
        res.status(400).json({
        ok: false,
        message: "Error al crear el producto",
        error: error.message
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
        return res.status(404).json({
            ok: false,
            message: "Producto no encontrado"
        });
        }

        res.status(200).json({
        ok: true,
        message: "Producto eliminado correctamente",
        data: product
        });
    } catch (error) {
        res.status(500).json({
        ok: false,
        message: "Error al eliminar el producto",
        error: error.message
        });
    }
});

module.exports = router;