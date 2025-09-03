if(process.env.NODE_ENV!=="production"){
  require('dotenv').config();
}
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(
    require("./todolist-d6219-firebase-adminsdk-fbsvc-a34fe1b261.json")
  ),
});

module.exports = admin;
