const router = require('express').Router();
const pockerMethods = require('../../services/pocker.ts');


router.post('/', (req, res) => {
  console.log('---pocker', pockerMethods(req.body.hands), '---errors', pockerMethods(req.body.hands).errors);
  console.log('---body', req.body.hands)
});

module.exports = router;