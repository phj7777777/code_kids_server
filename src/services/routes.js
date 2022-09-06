const express = require('express');
const controller = require('./controller/index');

const router = express.Router();


router.post('/', async (req, res) => {
  const result = await controller.createService(req.body);
  if (result) return res.status(parseInt(result.status)).json({ result: result.result });
  return res.status(400).json({ result: 'error_server' });
});

router.get('/:id', async (req, res) => {

  const id = req.params.id;
  if (!id) return res.status(400).json({ result: 'error_server' });

  const result = await controller.getService(id);
  if (result) return res.status(parseInt(result.status)).json({ result: result.message });
  return res.status(400).json({ result: 'error_server' });
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ result: 'error_param' });
  const result = await controller.updateService(id, req.body);
  if (result) return res.status(parseInt(result.status)).json({ result: result.message });
  return res.status(400).json({ result: 'error_server' });
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ result: 'error_param' });
  }
  const result = await controller.deleteService(id);
  if (result) {
    return res.status(parseInt(result.status)).json({ result: result.message });
  }
  return res.status(400).json({ result: 'error_server' });
});

module.exports = router;
