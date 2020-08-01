const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
day: {
    type: Date,
    default: Date.now
},
exercises: [{
    type: {
        type:  String
    },
    name: String,
    duration: Number,
    weight: Number,
    reps: Number,
    sets: Number,
    distance: Number
    

}]
    


},
{
  toJSON: {
    // include any virtual properties when data is requested
    virtuals: true
  }
})
WorkoutSchema.virtual("totalDuration").get(function () {
    // "reduce" array of exercises down to just the sum of their durations
    return this.exercises.reduce(function(total, currentValue){
        return currentValue.duration + total
    }, 0)
});
const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;