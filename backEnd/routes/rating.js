const express = require('express');
const Router = require('express-promise-router');

const db = require('../db/index')

const router = new Router()

router.post('/',  async (req, res) => {
  const query = {
    text: 'SELECT id, "last name", "first name", "middle initial", age, citizenship, "home city", "home brgy", "bank branch", employment, "employer / business name", "current position", "id presented", "total years at work", "nature of business", "business address" FROM public.customer',
    values: []
  }

  const query2 = {
    text: 'SELECT id, customer_id, name, rating FROM public.rating',
    values: []
  }

  const query3 = {
    text: 'SELECT id, category, weight FROM public.category',
    values: []
  }

  const gooc = [
    "Al-Amanah Islamic Investment Bank of the Philippines (AAIIBP)",
    "AFP-Retirement and Separation Benefits System",
    "Alabang-Sto. Tomas Development, Inc.",
    "APO Production Unit, Inc.",
    "Aurora Pacific Economic Zone and Freeport Authority",
    "Authority of the Freeport of Bataan ",
    "Bangko Sentral ng Pilipinas (BSP)",
    "Bases Conversion and Development Authority (BCDA)",
    "Batangas Land Company, Inc. (BLCI)",
    "Batong Buhay Gold Mines, Inc. (BBGMI)",
    "BCDA Management and Holdings, Inc. (BMHI)",
    "Boy Scouts of the Philippines (BSP)",
    "Bukidnon Forest, Inc. (BFI)",
    "Cagayan Economic Zone Authority (CEZA)",
    "Cebu Port Authority (CPA)",
    "Center for International Trade Expositions and Missions (CITEM)",
    "Central Bank-Board of Liquidators",
  ]

  const plc = [
    "2GO Group, Inc.",
    "8990 Holdings, Inc.",
    "A Brown Company, Inc.",
    "A. Soriano Corporation",
    "ABS-CBN Corporation",
    "ABS-CBN Holdings Corporation",
    "AG Finance, Incorporated",
    "APC Group, Inc.",
    "ATN Holdings, Inc.",
    "AbaCore Capital Holdings, Inc.",
    "Aboitiz Equity Ventures, Inc.",
    "Aboitiz Power Corporation",
    "Abra Mining and Industrial Corporation",
    "Acesite (Phils.) Hotel Corporation",
    "AgriNurture, Inc.",
    "Alliance Global Group, Inc.",
    "Alliance Select Foods International, Inc.",
    "Allied Banking Corporation",
    "Alsons Consolidated Resources, Inc.",
    "Anchor Land Holdings, Inc.",
    "Anglo Philippine Holdings Corporation",
    "Apex Mining Co., Inc.",
    "Apollo Global Capital, Inc.",
    "Araneta Properties, Inc.",
    "Arthaland Corporation",
    "Asia Amalgamated Holdings Corporation",
  ]

  const nob = [
    "Casino",
    "E-Gaming operator",
    "Lending company",
    "Art and Antique Dealing",
    "Jewerly or Precious Metals Dealer",
    "Dealer of 2nd hand automobile who is not a primary dealer",
    "Foundation"
  ]

  try {
    if ( req.body.key == "calcurisk") {
      const queryResponse = await db.query(query)
      const queryResponse3 = await db.query(query3)
      const queryResponse2 = await db.query(query2)

      queryResponse.rows.forEach( async (e)=> {
        let payload = []
        // console.log(e["total years at work"] >= 0.5, e["total years at work"])
        if (e["total years at work"] >= 0.5) {
          payload.push(2)
        }
        if (gooc.findIndex((val)=>{return val == e["employer / business name"]}) != -1) {
          payload.push(10)
        }
        if (plc.findIndex((val)=>{return val == e["employer / business name"]}) != -1) {
          payload.push(11)
        }
        const index = queryResponse3.rows.find((val)=>{return e["nature of business"].toLowerCase().match(val.category.toLowerCase())})
        if (index) {
          payload.push(index.id)
        }
        if (e["id presented"]) {
          payload.push(6)
        }


        // console.log(payload)
        const payload3 = payload.map((e)=> {
          const obj = queryResponse3.rows.find(o => o.id == e);
          if (obj) {
            return obj.weight
          } else {
            const obj2 = queryResponse3.rows.find(o => o.category == e);
            return obj2 ? obj2.category : 0
          }
        });
        const sum = payload3.reduce((a,b)=> parseInt(a, 10)+parseInt(b, 10), 0)
        // console.log(payload3, sum, e["id"], `${e["last name"]}, ${e["first name"]} ${e["middle initial"]}.`,`${(sum/150*10).toFixed(2)}`)


        if (queryResponse2.rows.findIndex((val)=>{return val["customer_id"] == e["id"]}) == -1) {
          // console.log("insert")
           const query4 = {
              text: 'INSERT INTO public.rating(customer_id, name, rating) VALUES ($1, $2, $3);',
              values: [e["id"], `${e["last name"]}, ${e["first name"]} ${e["middle initial"]}.`, `${(sum/150*10).toFixed(2)}`]
            }
          const queryResponse5 = await db.query(query4)
        }

      });
      const queryResponse4 = await db.query(query2)
      res.json(queryResponse4.rows);
    }
  } catch(err) {
    console.log(err.stack)
  }
});

module.exports = router;
