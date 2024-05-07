import { router } from '../../../helpers/middle.helper';
import { addUsers, loginUsers, defaultUsers } from './user.controller';

router.get('/', defaultUsers);
router.post('/users', addUsers);
router.post('/users/login', loginUsers);

export default router;
