

// Craete Post cntroller 
// POST /api/posts
// Protected
const createPost=async(req,res,next)=>{
    res.json('craete post');
}

// get  Post cntroller 
// GET /api/posts
// unprotected
const getPosts=async(req,res,next)=>{
    res.json('get all post');
}

// get a single post
// GET /api/posts/:id
// uppprotected
const getPost=async(req,res,next)=>{
    res.json('get single post');
}

// get post by category
// GET /api/posts/categorys/:category
// unprotected
const getCatPost=async(req,res,next)=>{
    res.json('get post by category');
}

// getpost By auther 
// GET /api/posts/users/:id
// unprotected
const getUserPost=async(req,res,next)=>{
    res.json('get post by user');
}

//   Edit post 
// PATCH /api/posts/:id
// protected
const editPost=async(req,res,next)=>{
    res.json('edit post');
}
//   DELETE post 
// DELETE /api/posts/:id
// protected
const deletePost=async(req,res,next)=>{
    res.json('delete post');
}

export {createPost,getPosts,getPost,getCatPost,getUserPost,editPost,deletePost}