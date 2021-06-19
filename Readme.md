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

# Using Mongoose

- Makes it easier to run MongoDB driver. Note that installing this package does not install the mongo DB database

**Establishing a Connection**
- In the `app.js` you will have to import mongoose with `const mongoose=require('mongoose');`
- Then you want to establish a connection with MongoDB at the time the server is activated so that `app.listen` is part of the mongoose connection. See the sample code below

```Javascript
mongoose
  .connect('mongodb+srv://<user:password>@cluster0-ntrwp.mongodb.net/<table name in mongo cluster>?retryWrites=true&w=majority')
  .then(() => {
    // First connct and once a connection has been established, start the server at port 5000
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });

  ```

  **Designing a collection**
  - The designs for a collection or schema are kept in the models folder which act as a `blue print`. See below an example

```Javascript

const mongoose = require('mongoose');
// Mongoose unique validator is an NPM package that checks the data points before they are admitted as documents inside the database
const uniqueValidator = require('mongoose-unique-validator');

// Schema is a blue print template that stores individual datapoints usually coming from forms to an object collection
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    image: { type: String, required: true },
    places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place'}]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);

```
  
