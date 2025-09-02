const mongoose=require('mongoose');
const taskSchema=new mongoose.Schema({
    text:String,
    category:String,
    done: {
        type: Boolean,
        default: false
    },
    edit: {
        type: Boolean,
        default: false
    }

})
const Task=new mongoose.model("Task",taskSchema);
module.exports=Task;