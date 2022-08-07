const express = require('express');

const router = express.Router();

//Endpoint con 2 parametros dinamicos en la url
router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId} = req.params;
  res.json({
    categoryId,
    productId
  });
});

module.exports = router;
