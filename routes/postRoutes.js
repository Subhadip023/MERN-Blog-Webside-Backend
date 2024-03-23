import { Router } from "express";
const router=Router()

router.get('/',(req,res)=>{
    res.json('This is the Post router')
});

export default router