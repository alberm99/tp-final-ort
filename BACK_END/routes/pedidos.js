const express = require('express');
const router = express.Router();
const pedidos = require('../Data/pedidos');
const auth = require('../middleware/auth');
const cors =  require('cors')

router.use(cors())

/* GET users listing. */
router.get('/', async function(req, res) {
    res.json(await pedidos.getAllpedidos());  
});

router.get('/:id', async function(req, res) {
    res.json(await pedidos.getPedido(req.params.id));
});

router.post('/', auth, async function(req, res) {
     
    await pedidos.addPedido(req.body);
    res.json(await pedidos.getPedido(req.body._id))
    
});

router.put('/:id', async function(req, res) {
    req.body._id = req.params.id;
    await pedidos.editPedido(req.body);
    res.json(await pedidos.getPedido(req.body._id))
    
});

router.delete('/:id', async function(req, res) {
    let ped = await pedidos.getPedido(req.params.id);
    await pedidos.deletePedido(req.params.id);
    res.json(ped);

});


module.exports = router;