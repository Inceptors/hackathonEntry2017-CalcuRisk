const express = require('express');
const Router = require('express-promise-router');

const db = require('../db/index')

const router = new Router()

router.post('/',  async (req, res) => {

  try {
    if ( req.body.key == "calcurisk") {
      const query = {
          text: `INSERT INTO public.customer("last name", "first name", "middle initial", age, citizenship, "home city", "home brgy", "bank branch", employment, "employer / business name", "current position", "id presented", "total years at work", "nature of business", "business address") VALUES ($1, $2, $3, 20, 'Filipino', '', '', '', '', $4, '', $5, $6, $7, '')`,
          values: [req.body.update.lname, req.body.update.fname, req.body.update.mname, req.body.update.ebname, req.body.update.id, req.body.update.ywork, req.body.update.nob]
        }
      const queryResponse = await db.query(query)
      res.json(queryResponse.rows);
      // res.json(req.body)
    }
  } catch(err) {
    console.log(err.stack)
  }
});

module.exports = router;
