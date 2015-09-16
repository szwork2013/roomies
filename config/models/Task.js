import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let taskSchema = new Schema({
  name: String,
  description: Array,
  startDate: Date,
  endDate: Date,
  frequency: Number
});

const Task = mongoose.model('Task', taskSchema)

module.exports = Task;