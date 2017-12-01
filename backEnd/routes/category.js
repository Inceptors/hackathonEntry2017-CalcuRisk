const express = require('express');
const Router = require('express-promise-router');

const db = require('../db/index')

const router = new Router()

router.post('/',  async (req, res) => {
  const query = {
    text: 'SELECT id, category, weight FROM category ORDER BY id ASC',
    values: []
  }

  try {
    if (req.body.mode == "update" && req.body.key == "calcurisk") {
      req.body.update.map(async (e) => {
        const queryResponse = await db.query({
          text: "UPDATE category SET weight=$1 WHERE id=$2",
          values: [e.weight, e.id]
        })
      })
    }
    if ( req.body.key == "calcurisk") {
      const queryResponse = await db.query(query)
      // let payload = []
      // queryResponse.rows.forEach((e)=> {
      //   payload.push({
      //     "id": e.id,
      //     "category": e.category,
      //     "weight": e.weight})

      // });
      res.json(queryResponse.rows);
    }else {
      res.status(404)        // HTTP status 404: NotFound
      .send('Not found');
    }

  } catch(err) {
    console.log(err.stack)
  }
});

module.exports = router;
