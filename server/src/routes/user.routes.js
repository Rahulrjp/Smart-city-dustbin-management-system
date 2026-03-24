import { Router } from "express";
import { deleteUser, getUserById, getUsers, updateUser } from "../controllers/user.controller.js";

const router = Router();

router.route('/users').get(getUsers);
router.route('/user/current').get(getUserById);
router.route('/user/update').patch(updateUser);
router.route('/user/delete').delete(deleteUser);

const userRouter = router;

export default userRouter;