const router = require('express').Router();
const  { User }  = require('../../models');

// get all users
router.route('/')
    .get(
        (req,res) =>{
            User.find()
                .populate({
                    path: 'thoughts',
                    select: '-__v'
                })
                .select('-__v')
                .then(dbUserData => res.json(dbUserData))
                .catch(err => {
                    console.log(err);
                    res.status(400).json(err);
                })

        }

    )
// get single user
router.get('/:id', (req, res) => {
    User.findOne({ _id: req.params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

// create new user
router.route('/').post(
    ({ body }, res) => {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    }
);

// update user 
router.put('/:id', ({ params, body }, res) => {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true }) //this "new: true" is telling mongoose to returne the new document, rather than the old one
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
})

// delete user
router.delete('/:id', ({ params, body }, res) => {
    User.findOneAndDelete({_id: params.id})
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
})


// add friend to friend's list
router.put('/:userId/friends/:friendId', ({ params }, res) => {
    User.findOneAndUpdate({_id: params.userId }, {$addToSet: {friends: params.friendId}}, {new: true})
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
});

// delete friend from friend's list
router.delete('/:userId/friends/:friendId', ({ params }, res) => {
    User.findOneAndUpdate({_id: params.userId }, {$pull: {friends: params.friendId}}, {new: true})
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
});


module.exports = router;
