if (Meteor.isServer) {
	Accounts.registerLoginHandler(function(options) {

		var userId = null;
		var user = Meteor.users.findOne(
			options.selector
		);
		if (!user) {
			throw Meteor.error("the login phone or password is error!");
		} else {
			userId = user._id;
		}

		var stampedToken = Accounts._generateStampedLoginToken();
		var hashStampedToken = Accounts._hashStampedToken(stampedToken);

		Meteor.users.update(userId, {
			$push: {
				'services.resume.loginTokens': hashStampedToken
			}
		});
		return {
			id: userId,
			token: stampedToken.token
		}
	});
}

verificationCode = (new Chance()).string({pool: '0123456789'},{length: 4}) 

Meteor.methods({
	verifyPhone: function(phoneNum) {
		var zhiyan = ServiceConfiguration.configurations.findOne({
			service: "zhiyan",
		});

		if (!zhiyan) {
			throw Meteor.error("verifyPhone need register zhiyan service")
		};

		var sms = {
			"phoneNum": phoneNum,
			"verificationCode": verificationCode,
			"time": new Date()
		}
		try {
			var response = HTTP.post(
				"https://sms.zhiyan.net/sms/match_send.json", {
					headers: {
						'Accept': 'application/json',
						"Accept-Charset": "UTF-8",
						'Content-Type': 'application/json;charset=utf-8',
					},
					data: {
						apiKey: zhiyan.apiKey,
						appId: zhiyan.appId,
						mobile: phoneNum,
						content: "【无妄】您的验证码为：" + verificationCode + "。",
						extend: "",
						uid: "123456"
					},
					rejectUnauthorized: false,
				});
			sms.reason = response.reason;
			sms.status = response.result;
			if (response.result == "SUCCESS") {
				console.log("SUCCESS");
			};
		} catch (error) {
			sms.status = "error";
			sms.reason = error;
		}
		verificationCodeColl.insert(sms);
		if (sms.status == "error") {
			return false;
		}
		return true;
	},
	checkVerifyCode: function(verificationCode) {
		return this.verificationCode == verificationCode;
	}
});