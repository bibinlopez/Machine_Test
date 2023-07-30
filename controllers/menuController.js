const Menu = require('../models/menuSchema')
const CustomError = require('../errors/custom-error')

const createMenu = async (req, res) => {
  try {
    req.body.admin = req.user.userId
    const price = req.body.price
    if (price < 10) {
      throw new CustomError(`Minimum price amount is : 10 rupees`, 400)
    }
    const menu = new Menu(req.body)
    const result = await menu.save()
    return res.status(201).json({ data: result })
  } catch (error) {
    next(error)
  }
}

const getAllMenu = async (req, res) => {
  try {
    const menu = await Menu.find({}).populate({
      path: 'admin',
      select: '_id name',
    })
    return res.status(200).json({ count: menu.length, data: menu })
  } catch (error) {
    next(error)
  }
}

const getMenuByFilter = async (req, res) => {
  try {
    const { name, category1, category2, category3, category4 } = req.query
    const queryObject = {}

    if (name) {
      queryObject.name = { $regex: name, $options: 'i' }
    }
    if (category1) {
      queryObject.category1 = { $regex: category1, $options: 'i' }
    }
    if (category2) {
      queryObject.category2 = { $regex: category2, $options: 'i' }
    }
    if (category3) {
      queryObject.category3 = { $regex: category3, $options: 'i' }
    }
    if (category4) {
      queryObject.category4 = { $regex: category4, $options: 'i' }
    }

    const menu = await Menu.find(queryObject).populate({
      path: 'admin',
      select: '_id name',
    })

    return res.status(200).json({ count: menu.length, data: menu })
  } catch (error) {
    next(error)
  }
}

const getSingleMenu = async (req, res) => {
  try {
    const { id } = req.params
    const menu = await Menu.findById(id).populate({
      path: 'admin',
      select: '_id name',
    })
    if (!menu) {
      throw new CustomError(`No menu with the id: ${id}`, 404)
    }
    return res.status(200).json({ data: menu })
  } catch (error) {
    next(error)
  }
}

const updateMenu = async (req, res) => {
  try {
    const { id } = req.params
    const menu = await Menu.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!menu) {
      throw new CustomError(`No menu with the id: ${id}`, 404)
    }
    return res.status(200).json({ data: menu })
  } catch (error) {
    next(error)
  }
}

const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params
    const menu = await Product.findById(id)
    if (!menu) {
      throw new CustomError(`No menu with the id: ${id}`, 404)
    }
    await menu.deleteOne()
    return res.status(200).json({ msg: 'Menu deleted!!!' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createMenu,
  getAllMenu,
  getMenuByFilter,
  getSingleMenu,
  updateMenu,
  deleteMenu,
}
