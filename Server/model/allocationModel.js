const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var allocationSchema = new Schema({
    
   
    username: String,
    registerid : String,
    email:String,
    phone:Number,
    quali:String,
    course:Array,
    comp:String,
    batch:String,
    emp:String,
    courseid:String,
    stime:Number,
    etime:Number,
    startdate:Date,
    enddate:Date,
    meeting:String,
    schedule:String,
    day:String
    
    
    
   
});

var Allocation = mongoose.model('allocations', allocationSchema);

module.exports = Allocation;