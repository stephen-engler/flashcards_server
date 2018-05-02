const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    if(req.isAuthenticated()){
        let queryText = 'SELECT * FROM "flashcard"."deck" WHERE user_id = $1;';
        pool.query(queryText, [req.user.id])
            .then((result)=>{
                console.log('in deck router get ', result.rows);
                res.send(result.rows);
            })
            .catch((error)=>{
                console.log('error in get deck router ', error);
                res.sendStatus(500);
            })
    }//end if
    else{
        res.sendStatus(403);
    }
});
//make sure to as about this
router.get('/cards/:id', (req, res)=>{
    console.log('in router get cards')
    if(req.isAuthenticated()){
        const queryText = `SELECT * FROM "flashcard"."card" WHERE deck_id = $1;`;
        pool.query(queryText, [req.params.id])
            .then((result)=>{
                console.log(result.rows);
                res.send(result.rows)
            })
            .catch((error)=>{
                console.log('error in get cards route, ', error);
            })
    }
    else{
        res.sendStatus(403);
    }
})

/**
 * POST route template
 */
router.post('/', (req, res) => {
    if(req.isAuthenticated()){
        const queryText = `INSERT INTO "flashcard"."deck" 
                            ("user_id", "deck_name") 
                            VALUES ($1, $2) RETURNING *;`;

        pool.query(queryText, [req.user.id, req.body.deck_name])
            .then((result)=>{
                res.send(result.rows)
            })
            .catch((error)=>{
                console.log('error from server in post deck route', error)
            })
    }else{
        res.sendStatus(403);
    }
});

router.post('/card', (req,res)=>{
    if(req.isAuthenticated()){
        console.log('in router post deck card ', req.body.deck_id);
        let queryText = `INSERT INTO "flashcard"."card" 
                            ("deck_id","prompt","answer") 
                            VALUES ($1, $2, $3);`;

        pool
          .query(queryText, [
            req.body.deck.id,
            req.body.prompt,
            req.body.answer
          ])
          .then(result => {
            res.sendStatus(200);
          })
          .catch(error => {
            res.sendStatus(500);
          });
    }else{
        res.sendStatus(403)
    }
})

router.put('/card/:id', (req,res)=>{
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

module.exports = router;