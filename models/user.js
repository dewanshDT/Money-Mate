const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  // email: {
  //   type: String,
  //   required: true,
  // },
  // firstName: {
  //   type: String,
  //   required: true,
  // },
  // lastName: {
  //   type: String,
  //   required: true,
  // }
});

UserSchema.plugin(passportLocalMongoose);
/* this plugin adds additional fields of:
 *  -username
 *  -password
 *  username is set to unique: true
 */

module.exports = mongoose.model('User', UserSchema);
