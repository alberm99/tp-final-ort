const express = require('express');
const router = express.Router();
const users = require('../Data/users');
const cors =  require('cors');

router.use(cors());


router.get('/', async function(req, res) {
  res.send( await users.getAllUsers());
});

router.get('/:email', async function(req, res) {
  res.send(await users.getUser(req.params.email));
});



/* GET users listing. */
router.post('/', async function(req, res) {
  const user = await users.createAccount(req.body);
  res.send(user.ops[0]);
});

router.post('/login', async function(req, res) {
  try {
    const user = await users.login(req.body.email, req.body.password);
    const token = await users.generateToken(user);
    res.send(token);
  }
  catch(Error) {
    res.status(401).send(Error.message);
  }

});


router.put('/:id', async function(req, res) {
  req.body._id = req.params.id;
  await users.updateUser(req.body);
  res.json(await users.getUser(req.body.email))
});



module.exports = router;
