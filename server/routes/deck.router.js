const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GETs
 */
router.get('/', (req, res) => {
    if(req.isAuthenticated()){
        let queryText = 'SELECT * FROM "flashcard"."deck" WHERE user_id = $1;';
        pool.query(queryText, [req.user.id])
            .then((result)=>{
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

router.delete('/:id', (req, res)=>{
    console.log('in router delete ', req.params.id);
    if(req.isAuthenticated()){
        const queryText = `DELETE FROM "flashcard"."deck" WHERE id = $1;`;
        pool.query(queryText, [req.params.id])
            .then((result)=>{
                res.sendStatus(200);
            })
            .catch((error)=>{
                console.log('an error deleting deck ', error);
                res.sendStatus(500);
            })
    }
    else{
        res.sendStatus(403)
    }
})

/**
 * POSTs
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







module.exports = router;