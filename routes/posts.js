const express = require('express');
const router = express.Router();

const POSTS = [
  {
    title: 'hi',
    content:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse laborum in consectetur velit. Incidunt sequi perspiciatis enim aspernatur laborum tenetur saepe sunt optio natus ad amet magnam aliquam, error cupiditate.',
  },
];

router.get('/', (req, res) => {
  res.render('posts', { POSTS, postCount: POSTS.length });
});

router.post('/add', (req, res) => {
  if (Object.keys(req.body).length >= 1) {
    const newPost = {
      title: req.body.title,
      content: req.body.content,
    };
    POSTS.push(newPost);
    res.redirect('/posts');
  } else {
    const err = new Error('데이터가 입력되지 않았습니다.');
    err.statusCode = 400;
    throw err;
  }
});

module.exports = router;
