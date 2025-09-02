const express = require("express");
const router = express.Router();
const Task=require('../models/task');
const User=require('../models/user')
router.get("/gettask/:id", async (req, res) => {
  try {
    const {id}=req.params;
    const user=await User.findOne({firebaseUID:id});
    console.log(user);
    if (!user) return res.status(404).json({ error: "User not found" });
    const tasks = await Task.find({userId:user._id});
    // console.log(tasks);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});
router.post('/addtask/:id',async (req,res)=>{
  const { id } = req.params;
  const user = await User.findOne({firebaseUID:id});
  console.log(user);
   const {text}=req.body;
   const newtodo=new Task({text,userId:user._id,done:false,edit:false});
   await newtodo.save();
   res.json(newtodo);
})
router.put('/update/:id',async(req,res)=>{
  const {text,done}=req.body;
  const {id}=req.params;
  const todo=await Task.findById(id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  todo.text=text;
  todo.done=done;
  await todo.save();
  res.json(todo);
})
router.delete("/delete/:id",async(req,res)=>{
  const {id}=req.params;
  await Task.findByIdAndDelete(id);
})
module.exports=router;
