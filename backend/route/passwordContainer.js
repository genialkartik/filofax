const express = require('express');
const router = express();
const { v4: uuidv4 } = require('uuid');

const PassContainer = require('../model/PasswordContainers')
const User = require('../model/User');

router.route('/list')
  .get(async (req, res) => {
    let user = req.session.userdata;
    try {
      if (!user) throw 'nosession';
      const password_list = await PassContainer.find();
      res.json(password_list.length > 0 ? password_list : [])
    } catch (error) {
      console.log(error);
      if (error == 'nosession') res.json({ loggedin: false });
      else res.json({});
    }
  })
  .post(async (req, res) => {
    let user = req.session.userdata;
    try {
      if (!user) throw 'nosession';
      if (req.session.userdata.pin === Number(req.body.pin)) {
        res.json({ valid_pin: true });
      } else {
        res.json({ valid_pin: false })
      }
    } catch (error) {
      console.log(error);
      if (error == 'nosession') res.json({ loggedin: false });
      else res.json({ valid_pin: false });
    }
  })

router.route('/add')
  .post(async (req, res) => {
    let user = req.session.userdata;
    try {
      if (!user) throw 'nosession';
      const newCont = new PassContainer({
        passid: uuidv4(),
        user_email: req.session.userdata.email,
        title: req.body.formInput.title,
        url: req.body.formInput.url,
        username: req.body.formInput.username,
        email: req.body.formInput.email,
        password: req.body.formInput.password,
        note: req.body.formInput.note,
        category: req.body.formInput.category,
      })
      let new_password_container = await newCont.save();
      if (!new_password_container) throw 'Unable to Save';
      else {
        res.json({
          pass_container_added: true,
          containerData: new_password_container
        });
      }
    } catch (error) {
      console.log(error);
      if (error == 'nosession') res.json({ loggedin: false });
      else res.json({ pass_container_added: false });
    }
  })

router.route('/pin')
  // create 1hr pin session
  .get(async (req, res) => {
    let user = req.session.userdata;
    try {
      if (!user) throw 'nosession';
      res.json({ is_session: req.session.pinsession ? true : false })
    } catch (error) {
      console.log(error);
      if (error == 'nosession') res.json({ loggedin: false });
      else res.json({ is_session: false });
    }
  })
  // create pin session
  .post(async (req, res) => {
    let user = req.session.userdata;
    console.log(req.body)
    try {
      if (!user) throw 'nosession';
      if (req.session.pinsession) {
        res.json({ is_session: true });
      } else {
        if (req.session.userdata.pin === Number(req.body.pin)) {
          // create session
          req.session.pinsession = {
            session_duration: 86400000, // miliseconds = 1 hr
          }
          setTimeout(() => req.session.pinsession = null, 1000 * 60 * 60);
          res.json({ is_session: true })
        } else {
          res.json({ is_session: false })
        }
      }
    } catch (error) {
      console.log(error);
      if (error == 'nosession') res.json({ loggedin: false });
      else res.json({ is_session: false });
    }
  })


module.exports = router;


