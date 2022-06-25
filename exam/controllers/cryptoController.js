const router = require('express').Router();

router.get('/', (req,res) => {
    res.render('crypto');
})


module.exports = router;
