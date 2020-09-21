module.exports = {
    "extends": "airbnb-base",
    "rules": {
    	"no-underscore-dangle": [0, {
	    	"allow": ["_id"],
    	}],
    	"camelcase": [0, {
	    	"properties": "never"
			}],
			"class-methods-use-this": 0,
    },
};