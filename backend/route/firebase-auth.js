const express = require('express');
const router = express();
const firebase = require("firebase-admin");
const credentials = require("./credentials.json");

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
  databaseURL: "https://filofax.firebaseio.com",
});

module.exports = firebase;
router.route('/login')
  .get(async (req, res) => {
  })
  .post(async (req, res) => {
    try {

    } catch (error) {
      console.log(error)
    }
  })

router.route('/signup')
  .post(async (req, res) => {
    try {
    } catch (error) {
      console.log(error)
    }
  })

router.route('/logout')
  .get(async (req, res) => {

  })

module.exports = router;


