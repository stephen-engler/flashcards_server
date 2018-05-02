const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();


router.get("/:id", (req, res) => {
  console.log("in router get cards");
  if (req.isAuthenticated()) {
    const queryText = `SELECT * FROM "flashcard"."card" WHERE deck_id = $1;`;
    pool
      .query(queryText, [req.params.id])
      .then(result => {
        res.send(result.rows);
      })
      .catch(error => {
        console.log("error in get cards route, ", error);
      });
  } else {
    res.sendStatus(403);
  }
});


router.post("/", (req, res) => {
  if (req.isAuthenticated()) {
    let queryText = `INSERT INTO "flashcard"."card" 
                            ("deck_id","prompt","answer") 
                            VALUES ($1, $2, $3);`;

    pool
      .query(queryText, [req.body.deck.id, req.body.prompt, req.body.answer])
      .then(result => {
        res.sendStatus(200);
      })
      .catch(error => {
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

// PUTs
router.put('/:id', (req,res)=>{
    if(req.isAuthenticated()){
        const queryText = `UPDATE "flashcard"."card" 
                            SET "prompt"=$1, 
                                "answer"=$2 
                            WHERE id = $3;`;
        pool.query(queryText, [req.body.prompt, req.body.answer, req.params.id])
            .then((result)=>{
                res.sendStatus(200);
            })
            .catch((error)=>{
                res.sendStatus(500);
            })
    }else{
        res.sendStatus(403);
    }
})


router.delete("/:id", (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `DELETE FROM "flashcard"."card" 
                                WHERE id = $1;`;
    pool
      .query(queryText, [req.params.id])
      .then(result => {
        res.sendStatus(200);
      })
      .catch(error => {
        console.log("an error in delete card route ", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});


module.exports = router;