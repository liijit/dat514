const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const plantSchema = new Schema ({
	name: {
		type: String,
		required: true
	},
	duration: {
		type: String,
	},
	family_name: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now	
	}
})

//exposes the module to the project
module.exports = mongoose.model('plant', plantSchema)