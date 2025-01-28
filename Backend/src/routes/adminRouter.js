import express from 'express';
import { verifyTokenAdmin } from '../middleware/admin.js';
import UserManagement from '../controllers/adminController.js';

const router = express.Router();

router.use(verifyTokenAdmin);

router.get('/users', UserManagement.getAllUser)

router.get('/users/:id', UserManagement.getUserById)

router.delete('/users/:id', UserManagement.deleteUserAsAdmin)

router.post('/users/create', UserManagement.createUserWithPrivilege)

router.put('/users/block/:userId', UserManagement.banUser)

router.put('/users/unblok/:userId', UserManagement.unBanUser)

router.put('/users/upadate/:id', UserManagement.updateUserAsAdmin)

router.post('/create-admin',UserManagement.createAdmin)


export default router;