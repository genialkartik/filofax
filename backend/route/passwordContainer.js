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
  .post(async (req, res)=>{
    let user = req.session.userdata;
    try {
      if (!user) throw 'nosession';
      console.log(req.body);
    } catch (error) {
      console.log(error);
      if (error == 'nosession') res.json({ loggedin: false });
      else res.json({ pass_container_added: false });
    }
  })

router.route('/add')
  .post(async (req, res) => {
    let user = req.session.userdata;
    try {
      if (!user) throw 'nosession';
      const newCont = new PassContainer({
        passid: uuidv4(),
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




module.exports = router;


