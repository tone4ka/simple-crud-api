module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true
	},
	parser: "babel-eslint",
	extends: ["eslint-config-airbnb-base", "eslint-config-prettier"],
	"rules": {
    "import/prefer-default-export": "off",
    "prefer-destructuring": ["error", {
      "array": false,
      "object": true
    }],
    "no-use-before-define": ["error", {"functions": false, "classes":false, "variables": false}]
	},
	settings: {
		"import/resolver": {
			webpack: { config: "webpack.config.js" }

		}
  },
};
