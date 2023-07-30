const express = require('express')
const router = express.Router()

const { authMiddleware, authPermission } = require('../middlewares/auth')

const {
  createMenu,
  getAllMenu,
  getMenuByFilter,
  getSingleMenu,
  updateMenu,
  deleteMenu,
} = require('../controllers/menuController')

router.post('/create', authMiddleware, authPermission, createMenu) // admin route
router.get('/get_all', authMiddleware, authPermission, getAllMenu) // admin route

router.get('/get_single/:id', getSingleMenu)
router.get('/get_by_filter', getMenuByFilter)

router.put('/update/:id', authMiddleware, authPermission, updateMenu) // admin route
router.delete('/delete/:id', authMiddleware, authPermission, deleteMenu) // admin route

module.exports = router
