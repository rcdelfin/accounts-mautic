// v0.6.5
Accounts.addAutopublishFields({
  forLoggedInUser: ['services.mautic'],
});

Meteor.methods({
  integrateMauticToLoggedUser: function(credentialToken, credentialSecret, isPrimary) {
    this.unblock();

    var service = OAuth.retrieveCredential(credentialToken, credentialSecret);
    if (!_.isEmpty(service)) {
      if(_.isNull(isPrimary)) {
        isPrimary = true;
      }

      var serviceName = 'mautic';
      var services = _.isUndefined(Meteor.user().profile.services) ? {} : Meteor.user().profile.services;

      var profile = _.isUndefined(services.mautic) ? {} : services.mautic;
      services[serviceName] = _.extend(profile, {primary: isPrimary, connected: true, id: service.serviceData.id});

      Meteor.users.upsert({
        _id: Meteor.userId()
      }, {
        $set: {
          'services.mautic': _.extend(service.serviceData, {id: Meteor.userId()}),
          'profile.services': services
        }
      });
    }
  },
  disconnectLoggedUser: function() {
    this.unblock();
    return Meteor.users.update({
      _id: Meteor.userId()
    }, {
      $set: {
        'services.mautic': {},
        'profile.services.mautic.connected': false
      }
    });
  }
});
