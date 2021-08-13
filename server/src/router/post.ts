import { Router } from 'express';
import { post } from '../controllers';

const router = Router();

router.get('/:postid', post.getPost);
router.get('/posts', post.getPosts);
router.post('/', post.postPost);
router.delete('/:postid', post.deletePost);


export default router;