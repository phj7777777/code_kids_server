const express = require('express');
const controller = require('./controller/index');
const { ERROR_SERVER } = require('../../const');

const router = express.Router();


router.post('/', async (req, res) => {
  const result = await controller.createService(req.body);
  if (result) return res.json(result);
  return res.status(400).json({ result: ERROR_SERVER });
});

router.get('/:id', async (req, res) => {

  const id = req.params.id;
  const result = await controller.getService(id);
  if (result) return res.json({ result: result.message });
  return res.status(400).json({ result: ERROR_SERVER });
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await controller.updateService(id, req.body);
  if (result) return res.json(result);
  return res.status(400).json({ result: ERROR_SERVER });
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await controller.deleteService(id);
  if (result) {
    return res.json(result);
  }
  return res.status(400).json({ result: ERROR_SERVER });
});

module.exports = router;
