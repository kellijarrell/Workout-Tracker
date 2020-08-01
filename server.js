const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path")

const PORT = process.env.PORT || 3000;

const db = require("./models");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/userdb", { useNewUrlParser: true });

app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    .then (dbWorkout => {
        res.json(dbWorkout)
    })
    .catch(err => {
        res.json(err);
    })
})

app.get("/exercise", (req, res) => {
    return res.sendFile(path.join(__dirname, "./public/exercise.html"))
})

app.post("/api/workouts", ({body}, res) =>{
    console.log("POST",body)
    db.Workout.create(body)

    .then(dbWorkout => {
        res.json(dbWorkout)
    })
    .catch(err => {
        res.json(err);
    })
})

app.put("/api/workouts/:id", (req, res) =>{
    console.log("PUT",req.body)
    const id = req.params.id
    db.Workout.findByIdAndUpdate(id, {$push:{exercises: req.body} }, { new: true })
    .then(dbWorkout => {
        console.log(dbWorkout)
        res.json(dbWorkout)
    })
    .catch(err => {
        res.json(err);
    })
})


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
