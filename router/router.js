const express = require('express');

const router = express.Router();

const pageTitle = 'Live Chat app';

router.get('/', (req ,res)=>{
		res.render('index',{
			pageTitle: pageTitle
		})
})


module.exports = router;