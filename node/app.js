//jshint esversion:6

const mongoose = require('mongoose');

// Database Name
const dbName = 'fruitsDB';

// Connection URL, name of host mongo; mongo in dockerfile , /databaseName
mongoose.connect("mongodb://mongo:27017/fruitsDB",{ useNewUrlParser: true ,useUnifiedTopology: true});

// create blueprint of data that will be sended
//  const fruitSchema = new mongoose.Schema ({
//   name: String,
//   score: Number,
//   review: String
//  });
const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true , "No name specified"]
  },
  score:{
    type:Number,
    min:1,
    max:10,
  },
  review: String
 });
 
//  for mongoose you specify name in singular type for collection and mangooose convert it to plural
//also mongoose will drop the capital letter and change it to small letter Fruit -> fruits
//make model based on fruitsSchema
const Fruit = mongoose.model("Fruit",fruitSchema);

//construct document
const fruit = new Fruit({
  name: "Apple",
  score: 7,
  review: "Pretty solid as a fruit"
});

//save documnet to db
//--------------------save one to db----------------------------------------
fruit.save();

//mongoose will wonvert Person to poeple
const personSchema = new mongoose.Schema ({
  name: String,
  age: Number
 });

const Person = mongoose.model("Person",personSchema);
//construct document
const person = new Person({
  name: "John",
  age: 37
});
//--------------------save one to db----------------------------------------
person.save();


const kiwi = new Fruit({
  name: "Kiwi",
  score: 8,
  review: "I like it!"
});

const banana =  new Fruit({
  name: "Banana",
  score: 10,
  review: "Best fruit ever!!!"
});

const redOrange =  new Fruit({
  name: "Red Orange",
  score: 9,
  review: "Best orange ever!!!"
});
//------------------insert many---------------------------------------
// Fruit.insertMany([kiwi,banana,redOrange],function(err){
//     if(err){
//       console.log(err);      
//     }else{
//       console.log("Success we save all the fruits to fruitsDB!");
//     }
// });
 
//-----read from DB-------------------------------------------------------
Fruit.find(function(error,fruits){
  if(error){
    console.log(error);
  }else{
    //--close connetion with database------------------------------
      mongoose.connection.close();
    //-------------------------------------------------------------
    fruits.forEach(element => {
      console.log(element.name);
    });
    // console.log(fruits);
  }
});
Person.find(function(error,people){
  if(error){
    console.log(error);
  }else{
    //--close connetion with database------------------------------
      // mongoose.connection.close();
    //-------------------------------------------------------------
    people.forEach(element => {
      console.log(element.name);
    });
    // console.log(fruits);
  }
});
//update-----------------------------------------------------------
Fruit.updateOne({_id:"5eb9bbb328048b82cb4042ad"},{name:"Peach",score:9,review:"Delicious!!!"},function(err){
  if(err){
    console.log(err);
  }else{
    // mongoose.connection.close();
    console.log("Succesfully updated the document!!!");
  }
});
//deleteOne-----------------------------------------------------------------------------
// Fruit.deleteOne({_id:"5eb9bbb328048b32b54042ab"},function(err){
//   if(err){
//     console.log(err),function(){

// };
//   }else{
//     console.log("Succesfully deleted the record!!!");
//   }
// });
//deleteMany-----------------------------------------------------------------------------
Fruit.deleteMany({name: "Banana"},function(err){
  if(err){
    console.log(err);
  }else{
    mongoose.connection.close();
    console.log("Succesfully deleted the the records!!!");
  }
});


// mongoose.connection.close();


// my functions-------------------------------------------------------------------------
// const insertDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('documents');
//   // Insert some documents
//   collection.insertMany([
//     {
//       name: "Apple",
//       score: 8,
//       review: "Great fruit"
//     },
//     {
//       name: "Orange",
//       score: 6,
//       review: "Kinda sour"
//     }, 
//     {
//       name: "Banana",
//       score: 9,
//       review: "Great stuff!!!"
//     }
//   ], function(err, result) {
//     assert.equal(err, null);
//     assert.equal(3, result.result.n);
//     assert.equal(3, result.ops.length);
//     console.log("Inserted 3 documents into the collection");
//     callback(result);
//   });
// }

// const findDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('fruits');
//   // Find some documents
//   collection.find({}).toArray(function(err, fruits) {
//     assert.equal(err, null);
//     console.log("Found the following records");
//     console.log(fruits)
//     callback(fruits);
//   });
// }