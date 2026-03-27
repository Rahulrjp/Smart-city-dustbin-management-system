import { Router } from "express";
import { deleteUser, getUserById, getUsers, updateUser } from "../controllers/user.controller.js";

const router = Router();

router.route('/').get(getUsers);
router.route('/current').get(getUserById);
router.route('/').patch(updateUser);
router.route('/').delete(deleteUser);

const userRouter = router;

export default userRouter;