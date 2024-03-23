import { Router } from "express";
import {getAuthor,editUser,changeAvatar,getUser,loginUser,registerUser} from '../controllers/userController.js';


const router=Router()

router.get('/',(req,res)=>{
    res.json('This is the user router')
});
// Register a new user 
// POST api/users/register
// Unprotected
router.post('/register', registerUser);

// Login a new user 
// POST api/users/login
// Unprotected
router.post('/login', loginUser);

// Change user avatar
// POST api/users/change-avatar
// Protected
router.post('/change-avatar', changeAvatar);

// Edit user avatar
// POST api/users/edit-user
// Protected
router.post('/edit-user', editUser);

// Get author
// POST api/users/authors
// Unprotected
router.get('/authors', getAuthor);

// User Profile
// POST api/users/:id
// Protected
router.post('/:id', getUser);

export default router