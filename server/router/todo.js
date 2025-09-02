const express = require("express");
const router = express.Router();
const Task=require('../models/task');
router.get("/gettask", async (req, res) => {
  try {
    const tasks = await Task.find({});
    // console.log(tasks);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});
router.post('/addtask',async (req,res)=>{
   const {text}=req.body;
   const newtodo=new Task({text,done:false,edit:false});
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
