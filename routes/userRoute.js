const express = require('express')
const router = express.Router()

const { authMiddleware, authPermission } = require('../middlewares/auth')

const {
  getAllUser,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  getAllAdmin,
  updateUserRole,
} = require('../controllers/userController')

router.get('/get_all_user', authMiddleware, authPermission, getAllUser) // admin route
router.get('/get_all_admin', authMiddleware, authPermission, getAllAdmin) // admin route
router.get(
  '/get_single_user/:id',
  authMiddleware,
  authPermission,
  getSingleUser
) // admin route
router.put('/update_user_role', authMiddleware, authPermission, updateUserRole) // admin route

router.get('/show_me', authMiddleware, showCurrentUser) // user route
router.put('/update_user', authMiddleware, updateUser) // user route
router.put('/update_user_password', authMiddleware, updateUserPassword) // user route

module.exports = router
