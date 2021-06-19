# MongoDB for MERN Stack

MERN: MongoDB, Express.JS, React.JS, Node.JS

I have created this repository as a self reference. It consists of general pointers for using Mongo DB in a MERN Stack application

**Installation of MongoDB**
- `npm install  mongodb --save`
- This is essentially a MongoDB driver that will take commands to connect and send queries to and from the MongoDB cloud server (Mongo Atlas)

**Installation of Mongoose**
- `npm install mongoose --save`
- It uses schemas - gives you better of control of the structure of documents you want to store in the database
- Shcema is the blue print of the product and model builds on the schema

**Installtion of Unique Validator with mongoose**
- `npm install mongoose-unique-validator`
- This package is different from the package `express-validator` which is used to test data coming from a post request
- What `mongoose-unique-validator` does instead is that it double checks that there is no pre-existing user before a new user document object is stored in the user collection

# Using Mongoose

- Makes it easier to run MongoDB driver. Note that installing this package does not install the mongo DB database

**Establishing a Connection**
- In the `app.js` you will have to import mongoose with `const mongoose=require('mongoose');`
- Then you want to establish a connection with MongoDB at the time the server is activated so that `app.listen` is part of the mongoose connection. See the sample code below

```Javascript
mongoose
  .connect('mongodb+srv://<user:password>@cluster0-ntrwp.mongodb.net/<database name in mongo cluster>?retryWrites=true&w=majority')
  .then(() => {
    // First connct and once a connection has been established, start the server at port 5000
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });

  ```

  **Designing a collection**
  - The designs for a collection (like a table in SQL- note that MongoDB by definition has no tables, the equvilant is ) or schema are kept in the models folder which act as a `blue print`. See below an example

  - In MongoDB a collection is like a table and 

```Javascript

const mongoose = require('mongoose');
// Mongoose unique validator is an NPM package that checks the data points 
// before they are admitted as documents inside the database
const uniqueValidator = require('mongoose-unique-validator');

// Schema is a blue print template that stores individual datapoints 
// usually coming from forms to an object collection
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    image: { type: String, required: true },
    // ObjectId is making a reference to a document in another collection, place in this example
    // Here Place is referring to the collection being referred to 
    // Similarly the place Schema will also have 
    // creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'} to crossreference with user
    places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place'}]
});

// you can also add unique case sensitive as `uniqueCaseInsensitive:true` if you do not care about casing

// Plugin(uniqueValidator) will check that there is no duplicate in the collection 
userSchema.plugin(uniqueValidator);

// Here you are also assigining a name 'User' to the collection/table that stores data about all the users
module.exports = mongoose.model('User', userSchema);

// Note that the collection name 'User' must match exactly whereever it is used even 'user' wont work
// You will run queries into this table to screen for pre-existing users or add new users

```
- Note that Shcemas are like classes and constructor functions - thats why they get placed under the models folder

- What this 'Schema' object is doing is creating an object table template into which the incoming data from Express.JS will be placed

- Express.JS receives data from forms created with React

- Each datapoint captured in React will have a name, a tag is assigned to it in Express in the post-request. The tag is usually the same as the field such as name:name 

- The Flow is: React Form data object captured via `req.body` or `req.params`-> Express Route `Post` Request -> MongoDB schema/collection or object table

- When data comes in `reqq.body` you can use object destructuring to extract specific data points

- Then put tags on them, that match the tags in the Mongoose schema for instance the userSchema for the User table as shown below

```Javascript

const { name, email, password } = req.body;

// Note that the User here is the same as the User in the schema
  const createdUser = new User({
    name, // this is the sort version of typing name:name
    email,
    image: 'https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg',
    password,
    places: []
  });

// The above code is creating a user object. 
// It is then stored into the User table as specified into the userSchema

  try {
      // This sis saving the data in mongoose
      // The creatUser already directs the data to be stored into the User table
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again.',
      500
    );
    return next(error);
  }

  res.status(201).json({user: createdUser.toObject({ getters: true })});
};

//