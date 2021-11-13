const router = require('express').Router();
const  { Thought }  = require('../../models');

// get all thoughts
router.get('/', (req, res) => {
    Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

module.exports = router;