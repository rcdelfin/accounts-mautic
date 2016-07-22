// v0.6.5
Accounts.addAutopublishFields({
  forLoggedInUser: ['services.mautic'],
});

Meteor.methods({
  integrateMauticToLoggedUser: function (credentialToken, credentialSecret) {
    this.unblock();

    var serviceData = OAuth.retrieveCredential(credentialToken, credentialSecret).serviceData;
    Meteor.users.upsert({_id: Meteor.userId}, {$set: {'services.mautic': serviceData, 'profile.service': 'mautic'}});
  }
});
