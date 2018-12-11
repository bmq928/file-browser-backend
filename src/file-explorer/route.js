const route = require('express').Router();
const {readdirRecursive, readdirShallow} = require('./controller');
const config = require('config');
// const path = require('path')
// const rootFolderFs = config.get('rootFolder');
const options = {
	s3: config.get('s3'),
	bucket: config.get('aws.bucket')
};

route.get('/recursive', async (req, res) => {
	try {
		let {dir} = req.query;
		dir === '/' && req.decoded ? dir += req.decoded.company ? req.decoded.company + "/" + req.decoded.username : '' : null;
		// if(!options.s3) dir = path.join(rootFolderFs, dir)
		
		
		const data = await readdirRecursive(dir, options);
		res.status(200).json({data})
		
	} catch (error) {
		console.log({error})
		res.status(400).json({message: error.message})
	}
});

route.get('/shallow', async (req, res) => {
	try {
		let {dir} = req.query;
		dir === '/' && req.decoded ? dir += req.decoded.company ? req.decoded.company + "/" + req.decoded.username : '' : null;
		// if(!options.s3) dir = path.join(rootFolderFs, dir)
		const data = await readdirShallow(dir, options);
		res.status(200).json({data})
	} catch (error) {
		console.log({error})
		res.status(400).json({message: error.message})
	}
});

module.exports = route;