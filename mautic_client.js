Meteor.loginWithMautic = function(options, callback) {
  // support a callback without options
  if (!callback && typeof options === "function") {
    callback = options;
    options = null;
  }

  if (!_.isEmpty(options)) {
    if (!_.isUndefined(options.integrate) && options.integrate) {
      var source = _.isUndefined(options.source) ? {} : options.source;
      Mautic.requestCredential(source, function (credentialToken) {
        var credentialSecret = OAuth._retrieveCredentialSecret(credentialToken) || null;
        options = _.extend({isPrimary: true}, options);
        Meteor.call('integrateMauticToLoggedUser', credentialToken, credentialSecret, options.isPrimary);
      });
    }
  } else {
    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Mautic.requestCredential(options, credentialRequestCompleteCallback);
  }
};

Meteor.disconnectLoggedUser = function (callback) {
  Meteor.call('disconnectLoggedUser', callback);
};


if(Meteor.settings && Meteor.settings.public !== undefined
  && Meteor.settings.public.mautic !== undefined
  && Meteor.settings.public.mautic.baseUrl !== undefined) {
	// Make it work with 0.9.3
	Meteor.loginWithMautic = Meteor.loginWithMautic;
  Meteor.disconnectLoggedUser = Meteor.disconnectLoggedUser;
} else {
    console.log("public.mautic.baseUrl has not been set in your settings.json file.")
}
