const router = require('express').express();
const { v4: uuidv4 } = require('uuid');

const PassContainer = require('../model/PasswordContainers')

route.route('/list')
  .post(async (req, res) => {
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

router.route('/add')
  .post(async (req, res) => {
    let user = req.session.userdata;
    try {
      if (!user) throw 'nosession';
      const newCont = new PassContainer({
        passid: uuidv4(),
        title: req.body.title,
        url: req.body.url,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        note: req.body.note,
        category: req.body.category,
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


