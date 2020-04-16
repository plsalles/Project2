const express = require('express');
const router = express.Router();

router.get('/home', (req, res, next) => {
  res.render('private/intranet', { message: req.flash('error') });
});



module.exports = router;