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

// get a single thought
router.get('/:id', ({ params }, res) => {
    Thought.findOne({ _id: params.id })
    .select('-__v')
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });      
});

// create a thought
router.post('/', ({ body }, res) => {
    Thought.create(body)
    .then((data) => {
        console.log('==========')
        console.log(data)
        return Thought.findOneAndUpdate(
            { _id: body.userId },
            { $push: { thought: _id } },
            { new: true }
        );
    })
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.status(400).json(err));  
})

module.exports = router;