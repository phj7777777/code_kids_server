const express = require('express');
const controller = require('./controller/index');

const router = express.Router();


router.get('/', async (req, res) => {
  const result = await controller.getAllCustomer();
  if (result) return res.json({ data: result.data });
  return res.status(400).json({ result: 'error_server' });
});

router.post('/', async (req, res) => {
  const result = await controller.createCustomer(req.body);
  if (result) return res.json({ result: result.result });
  return res.status(400).json({ result: 'error_server' });
});


router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await controller.getCustomer(id);
  if (result) return res.json({ result: result.message });
  return res.status(400).json({ result: 'error_server' });
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await controller.updateCustomer(id, req.body);
  if (result) return res.json({ result: result.message });
  return res.status(400).json({ result: 'error_server' });
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await controller.deleteCustomer(id);
  if (result) {
    return res.json({ result: result.message });
  }
  return res.status(400).json({ result: 'error_server' });
});

module.exports = router;
