// Write your package code here!
if (Meteor.isClient) {
	Phones = {
		var verifyPhone = function(options) {
			check(options, Match.ObjectIncluding({
				phone: Match.Optional(String)
			}));

			var phone = options.phone;
			if (!phone) throw new Meteor.Error(400, "Need to set a phone");

			Accounts.callLoginMethod({
				methodName: 'verifyPhone',
				methodArguments: [options.phone],
				userCallback: callback
			});
		};

		var loginWithPhone = function(selector, password, callback) {
			if (typeof selector === 'string')
				selector = {
					phone: selector
				};

			Accounts.callLoginMethod({
				methodArguments: [{
					user: selector,
					password: Accounts._hashPassword(password)
				}],
				userCallback: function(error, result) {
					if (error) {
						callback && callback(error);
					} else {
						callback && callback();
					}
				}
			});
		}
	};
};