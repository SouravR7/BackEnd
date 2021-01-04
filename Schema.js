const { Schema, mongoose } = require("mongoose");
const schema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
});

exports.schema = schema;
