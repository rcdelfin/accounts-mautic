Meteor.startup(function () {
  Accounts.loginServiceConfiguration.upsert({
    service: 'mautic'
  }, {
    service: 'mautic',
    clientId: 'fakeClientId',
    secret: 'fakeSecret',
    loginStyle: 'popup'
  });
});
