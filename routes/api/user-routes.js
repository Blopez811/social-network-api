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

module.exports = router;
