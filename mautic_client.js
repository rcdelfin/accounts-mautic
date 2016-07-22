Meteor.loginWithMautic = function(options, callback) {
  // support a callback without options
  if (!callback && typeof options === "function") {
    callback = options;
    options = null;
  }

  if (!_.isEmpty(options)) {
    if (!_.isUndefined(options.integrate) && options.integrate) {
      Mautic.requestCredential(function (credentialToken) {
        var credentialSecret = OAuth._retrieveCredentialSecret(credentialToken) || null;
        Meteor.call('integrateMauticToLoggedUser', credentialToken, credentialSecret);
      });
    }
  } else {
    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Mautic.requestCredential(options, credentialRequestCompleteCallback);
  }
};


if(Meteor.settings && Meteor.settings.public !== undefined
  && Meteor.settings.public.mautic !== undefined
  && Meteor.settings.public.mautic.baseUrl !== undefined) {
	// Make it work with 0.9.3
	Meteor.loginWithMautic = Meteor.loginWithMautic;
} else {
    console.log("public.mautic.baseUrl has not been set in your settings.json file.")
}
