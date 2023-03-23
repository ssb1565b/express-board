const express = require('express');
// 노드js 기본 패키지거나 우리가 설치한 패키지 (= nodemoudle 폴더에 있는) 경우 앞에 경로 입력없이 써도됨

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
