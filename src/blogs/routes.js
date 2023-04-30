const express = require('express');
const controller = require('./controller/index');
const { ERROR_SERVER } = require('../../const');

const router = express.Router();


router.get('/', async (req, res) => {

  const id = req.query.id;
  let result = {}

  if(!id){
    result = await controller.getAllBlogs();
  }else{
    result =  await controller.getBlog(id);
  }
  if (result) return res.json(result);
  return res.status(400).json({ result: ERROR_SERVER });
});

router.post('/', async (req, res) => {
  const result = await controller.createBlog(req.body);
  if (result) return res.json(result);
  return res.status(400).json({ result: ERROR_SERVER });
});

router.get('/categorized', async (req, res) => {
  const slug = req.params.slug;
  const result = await controller.getCategorizedBlogs(slug);
  return res.json(result);

});


router.get('/:slug', async (req, res) => {
  const slug = req.params.slug;
  const result = await controller.getBlog(slug);
  return res.json(result);

});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await controller.updateBlog(id, req.body);
  if (result) return res.json(result);
  return res.status(400).json({ result: ERROR_SERVER });
});

router.delete('/:slug', async (req, res) => {
  const id = req.params.slug;
  const result = await controller.deleteBlog(id);
  if (result) {
    return res.json(result);
  }
  return res.status(400).json({ result: ERROR_SERVER });
});

module.exports = router;
