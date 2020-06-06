 // firebase project url 
// https://console.firebase.google.com/project/test-5f3d0/overview

const firebase =require('firebase-admin');

let serviceAccount = require('./test-5f3d0-firebase-adminsdk-bn2jx-a1541220fc.json');

var defaultApp = firebase.initializeApp({
                    credential: firebase.credential.cert(serviceAccount),
                    databaseURL: 'https://test-5f3d0.firebaseio.com/'
                });

console.log(defaultApp.name);  // '[DEFAULT]'

// Retrieve services via the defaultApp variable...
var defaultAuth = defaultApp.auth();
var defaultDatabase = defaultApp.database();

// ... or use the equivalent shorthand notation
defaultAuth = admin.auth();
defaultDatabase = admin.database();

module.exports = firebase;