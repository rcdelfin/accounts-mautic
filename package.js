Package.describe({
  name: 'rcdelfin:accounts-mautic',
  summary: "Accounts service for Mautic accounts",
  version: "0.0.4",
  git: "https://github.com/PoBuchi/meteor-accounts-mautic.git"
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('accounts-base', ['client', 'server']);
  api.imply('accounts-base', ['client', 'server']);

  api.use('accounts-oauth', ['client', 'server']);
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('rcdelfin:mautic@0.0.5', ['client', 'server']);

  api.addFiles(['mautic_login_button.css'], 'client');
  api.addFiles('mautic_common.js', ['client', 'server']);
  api.addFiles('mautic_server.js', 'server');
  api.addFiles('mautic_client.js', 'client');
});


Package.onTest(function(api) {
  api.versionsFrom('1.2.1');
  api.use('tinytest');
  api.use('ecmascript');
  api.use('rcdelfin:accounts-mautic');

  api.addFiles('mautic_client_tests.js', 'client');
  api.addFiles('mautic_server_tests.js', 'server');
});
