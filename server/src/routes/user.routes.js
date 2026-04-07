import { Router } from "express";
import { deleteUser, getCurrentUser, getUserById, getUsers, updateUser } from "../controllers/user.controller.js";

const router = Router();

router.route('/').get(getUsers);
router.route('/current').get(getCurrentUser);
router.route('/').patch(updateUser);
router.route('/').delete(deleteUser);

const userRouter = router;

export default userRouter;