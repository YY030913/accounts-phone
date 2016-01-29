Package.describe({
    name: 'yy030913:accounts-phone',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: 'https://github.com/YY030913/accounts-phone',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.1');
    api.use('accounts-base', ['client', 'server']);
    api.imply('accounts-base', ['client', 'server']);

    api.use('http', ['server']);
    api.use('templating', 'client');
    api.use('risul:chance', 'server');
    api.use('underscore', 'server');
    api.use('random', 'client');
    api.use('service-configuration', ['client', 'server']);

    api.addFiles('accounts-phone-server.js', 'server');
    api.addFiles('accounts-phone-client.js', 'client');
    api.addFiles('verificationCodeColl.js', 'server');

    api.export('accounts-phone');
});

Package.onTest(function(api) {});