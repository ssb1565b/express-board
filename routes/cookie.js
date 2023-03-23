const express = require('express');
const router = express.Router();

// router.get('/', (req, res) => {
//   res.cookie('alert', true, {
//     expires: new Date(Date.now() + 1000 * 60),
//     httpOnly: true,
//   });
//   console.log(req.cookies);
//   res.render('index');
// });

router.get('/', (req, res) => {
  res.render('cookie');
});

router.get('/cook', (req, res) => {
  res.cookie('alert', true, {
    maxAge: 1000 * 5,
    httpOnly: false,
  });
  console.log(req.cookies);
  res.send('cookie');
});

module.exports = router;
