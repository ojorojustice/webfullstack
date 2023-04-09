const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../../config/database");

const UserSchema = mongoose.Schema({
  id: { 
    type: String, 
    required: true },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = (module.exports = mongoose.model("User", UserSchema));

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};

// module.exports.getUserByUsername = function (username, callback) {
//   const query = { username: username };
//   User.findOne(query, callback);
// };

module.exports.getUserByUsername = function (username) {
  const query = { username: username };
  return User.findOne(query).exec();
};

module.exports.addUser = async function (newUser, cb) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;
    const returnedUser = await newUser.save();
    if (returnedUser) {
      cb(null, returnedUser);
    } else {
      cb("User cound not be registered due to unknown error");
    }
  } catch (err) {
    cb("User cound not be registered because: " + err);
  }
};      

module.exports.comparePassword = function (newPassword, hash, callback) {
  bcrypt.compare(newPassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};

// module.exports.addUser = function(newUser, callback){
//   bcrypt.genSalt(10, (err,salt)=>{
//     bcrypt.hash(newUser.password,salt, (err,hash)=>{
//       if(err) throw err;
//       newUser.password = hash;
//       newUser.save(callback);
//     })
//   })
// }
