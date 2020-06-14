var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true, useUnifiedTopology: true });

const persona = new mongoose.Schema({
  name: String,
  age : Number
});

const People = mongoose.model('People', persona);

// const people = new People ({
//   name: 'John',
//   age: 37
// });

// const manner = new People({
//   name:'Adam',
//   age: 26
// });

// const frau = new People({
//   name: 'Alisa',
//   age: 45
// })

// People.insertMany([manner, frau], function(err){
//   if (err){
//     console.log('Uh oh')
//   } else{
//     console.log('Added Successfully!')
//   }
// });

// people.save();

People.find(function(err, person){
  if (err){
    console.log(err);
  } else {
    mongoose.connection.close()
    person.forEach(function(persona){
      console.log(persona.name);
    });
  }
});
// const fruitSchema = new mongoose.Schema({
//   name: String,
//   score : Number,
//   review : String
// }); 

// const Fruit = mongoose.model('Fruit', fruitSchema);

// const fruit = new Fruit ({
//   name:'Apple',
//   score: 8,
//   review: 'Red Fruit'
// });

// fruit.save();

// const insertDocuments = function(db, callback) {
//     // Get the documents collection
//     const collection = db.collection('fruits');
//     // Insert some documents
//     collection.insertMany([
//       {
//           name:'Apple',
//           score: 8,
//           review: 'Red Fruit'
//       },
//       {
//         name:'Orange',
//         score: 6,
//         review: 'Orange Fruit'
//     },
//     {
//         name:'Banana',
//         score: 7,
//         review: 'Yellow Fruit'
//     }
//     ], function(err, result) {
//       assert.equal(err, null);
//       assert.equal(3, result.result.n);
//       assert.equal(3, result.ops.length);
//       console.log("Inserted 3 documents into the collection");
//       callback(result);
//     });
//   }

//   const findDocuments = function(db, callback) {
//     // Get the documents collection
//     const collection = db.collection('fruits');
//     // Find some documents
//     collection.find({}).toArray(function(err, fruits) {
//       assert.equal(err, null);
//       console.log("Found the following records");
//       console.log(fruits)
//       callback(fruits);
//     });
//   }