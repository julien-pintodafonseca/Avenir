module.exports = {
  root: true,
  extends: '@react-native-community',
  overrides: [
	{
		"files": ["*"],
		"rules": {
			"react-native/no-inline-styles": "off"
		}
	}
  ]
};
