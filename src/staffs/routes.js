const express = require('express');
const controller = require('./controller/index');
const router = express.Router();


router.post('/', async (req, res) => {
  const result = await controller.createStaff(req.body);
  if (result.status == '200') return res.status(parseInt(result.status)).json({ result: result.result });
  return res.status(400).json({ result: 'error_server' });
});

router.get('/', async (req, res) => {
  const result = await controller.getAllStaff();
  if (result) return res.status(parseInt(result.status)).json({ data: result.data });
  return res.status(400).json({ result: 'error_server' });
});


router.get('/:id', async (req, res) => {

  const id = req.params.id;
  if (!id) return res.status(400).json({ result: 'error_server' });

  const result = await controller.getStaff(id);
  if (result) return res.status(parseInt(result.status)).json({ result: result.message });
  return res.status(400).json({ result: 'error_server' });
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ result: 'error_param' });
  console.log(req.body)
  const result = await controller.updateStaff(id, req.body);
  if (result) return res.status(parseInt(result.status)).json({ result: result.message });
  return res.status(400).json({ result: 'error_server' });
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ result: 'error_param' });
  }
  const result = await controller.deleteStaff(id);
  if (result) {
    return res.status(parseInt(result.status)).json({ result: result.message });
  }
  return res.status(400).json({ result: 'error_server' });
});

module.exports = router;
