const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
  },
  password: {
    type: String,
  },

  notes :[
    {type :mongoose.Schema.Types.ObjectId , ref :'Note'}
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
