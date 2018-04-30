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

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;