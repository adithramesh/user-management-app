const express =require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const {verifyToken} = require('../middleware/authMiddleware')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.put('/update-user',verifyToken, authController.updateUser)
router.get('/users',verifyToken, authController.getAllUsers)
router.delete("/users/:userId", authController.deleteUser)

module.exports=router;