const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data.json");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
    .connect(MONGODB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((self) => {
        console.log(`Connected to the database: "${self.connection.name}"`);
        // Before adding any recipes to the database, let's remove all existing ones

        return Recipe.deleteMany();
    })
    .then((response) => {
        console.log("2. Database cleared");

        return Recipe.insertMany(data);
    })
    .then((response) => {
        response.forEach((eachRecipe) => {
            console.log(eachRecipe.title);
        }); // we have to iterate trough the array to have each title.*/
        return Recipe.findOneAndUpdate({
            title: "Rigatoni alla Genovese",
        }, { duration: 100 }, { new: true });
    })
    .then((response) => {
        console.log("duration changed!!")
        return Recipe.findOneAndDelete({
            title: "Carrot Cake"
        });
    })
    .then((response) => {
        console.log("Recipe deleted!!");
        mongoose.connection.close(); // not sure database is really closed. We have doubts about where to place the mongoose.connection.close()
    })
    .catch((error) => {
        console.error("Error connecting to the database", error);
    })