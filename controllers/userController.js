import HttpErrors from "../models/errorModel.js";
import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

// Register a new user
// posrt api/users/register

//unProtected
const registerUser = async(req, res, next) => {
 

  try {
    const { name, email, password, password2 } = req.body;
    if (!name || !email || !password) {
      return next(new HttpErrors("Fill in all fields.", 422));
    }
    const newEmail = email.toLowerCase();

    const emailExist = await User.findOne({ email: newEmail });
    if (emailExist) {
        return next(new HttpErrors("Email already exists", 422));
    }

    if (password !== password2) {
        return next(new HttpErrors("Passwords don't match", 422));
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ name, email: newEmail, password: hashPassword });
    res.status(201).json(`New user ${newUser.email} Registerd`);
  } catch (error) {
    // Handle specific error types and provide corresponding error messages
    if (error.name === 'ValidationError') {
      // Handle Mongoose validation errors
      const errorMessage = Object.values(error.errors).map((val) => val.message).join(', ');
      return next(new HttpErrors(errorMessage, 422));
    } else {
      // Handle other types of errors
      return next(new HttpErrors("User registration failed. Please try again later.", 500));
    }
  }
};

// Login a new user
// posrt api/users/login
//unProtected
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if email and password are provided
    if (!email || !password) {
      return next(new HttpErrors("Please provide email and password.", 400));
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return next(new HttpErrors("Invalid email or password.", 401));
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return next(new HttpErrors("Invalid email or password.", 401));
    }

    // If email and password are correct, create and return a token (you'll need to implement this)
  // Generate a JWT token or session token here
const {_id:id,name}=user;
const token = jwt.sign({id,name},process.env.JWT_SECRRET,{expiresIn:"1h"}); 
    res.status(200).json({ token,id,name }); // Return the token to the client
  } catch (error) {
    // Handle unexpected errors
    console.error("Login failed:", error);
    return next(new HttpErrors("Login failed. Please try again later.", 500));
  }
};

// user Profile
// posrt api/users/:id
//Protected
const getUser= async (req, res, next) => {
  try{
  const {id} = req.params;
  const user =await User.findById(id).select('-password');
  if(!user) {
  return next(new HttpErrors("User not found.", 404))
  }
  res.status(200).json(user);
  } catch (error) {
  return next(new HttpErrors(error))
  }
}
// change user avatar
//port : api/users/change-avatar
//Protected
const changeAvatar = (req, res, next) => {
  // console.log(req.file)
  res.json("Change user Profile");
};

// edit user avatar
//port : api/users/edit-user
//Protected
const editUser = (req, res, next) => {
  res.json({ message: "Change avatar route reached" });
};

// get author
//port : api/users/authors
//un Protected
const getAuthor = async (req, res, next) => {
  try {
    const authors = await User.find().select('-password');
    res.json({ authors });
  } catch (error) {
    console.error("Failed to retrieve authors:", error);
    return next(new HttpErrors("Failed to retrieve authors", 500));
  }
};


export { getAuthor, editUser, changeAvatar, getUser, loginUser, registerUser };
