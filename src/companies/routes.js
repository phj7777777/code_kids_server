const express = require('express');
const controller = require('./controller/index');
const { ERROR_SERVER } = require('../../const');

const router = express.Router();


router.post('/', async (req, res) => {
  const result = await controller.createCompany(req.body);
  if (result) return res.json(result);
  return res.status(400).json({ result: ERROR_SERVER });
});

router.get('/:id', async (req, res) => {

  const id = req.params.id;
  const result = await controller.getCompany(id);
  if (result) return res.json(result);
  return res.status(400).json({ result: ERROR_SERVER });
});


router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await controller.updateCompany(id, req.body);
  if (result) return res.json(result);
  return res.status(400).json({ result: ERROR_SERVER });
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await controller.deleteCompany(id);
  if (result) {
    return res.json(result);
  }
  return res.status(400).json({ result: ERROR_SERVER });
});

module.exports = router;
