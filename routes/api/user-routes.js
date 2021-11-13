const  { User }  = require('../../models');
const router = require('express').Router();
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

router.route('/').post(
    ({ body }, res) => {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    }
);

// /api/users/:userId/friends/:friendId

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
