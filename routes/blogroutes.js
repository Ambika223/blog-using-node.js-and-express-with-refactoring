const express = require('express');
const router = express.Router();
const {
    getAllBlog,
    getSingleBlog,
    createBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blogController');

router.get('/', getAllBlog);
router.get('/:id', getSingleBlog);
router.post('/', createBlog);
router.patch('/:id', updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;