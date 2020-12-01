const express = require('express');
const router = express.Router();
const productos = require('../Data/productos');
const auth = require('../middleware/auth');
const cors =  require('cors')

router.use(cors())

/* GET users listing. */
router.get('/', async function(req, res) {
    res.json(await productos.getAllProductos());  
});

router.get('/:id', async function(req, res) {
    res.json(await productos.getProducto(req.params.id));
});

router.post('/', async function(req, res) {
     
    await productos.addProducto(req.body);
    res.json(await productos.getProducto(req.body._id))
    
});

router.put('/:id', async function(req, res) {
    req.body._id = req.params.id;
    await productos.editProducto(req.body);
    res.json(await productos.getProducto(req.body._id))
});

router.delete('/:id', async function(req, res) {
    let prod = await productos.getProducto(req.params.id);
    await productos.deleteProducto(req.params.id);
    res.json(prod);

});


module.exports = router;