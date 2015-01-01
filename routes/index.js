'use strict';
var express = require('express');
var router = express.Router();

var rs = require('../src/randomstring');

// Include upload manager
var uploadManager = require('./uploadManager')(router);

/* GET home page. */
router.get('/', function(req, res) {

	// Create session
	var sess = req.session

	// Set random session code
	if (!sess.code) sess.code = rs.randomString(8, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789');
	
	// Render view
	res.render('index', { 
		title: 'Malta printing service',
		session: sess 
	});
});

module.exports = router;