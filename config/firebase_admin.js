const admin = require('firebase-admin');
let serviceAccount = require('./test-5f3d0-firebase-adminsdk-bn2jx-a1541220fc.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://test-5f3d0.firebaseio.com/'
});

var registrationTokens = [
    'bk3RNwTe3H0:CI2k_HHwgIpoDKCIZvvDMExUdFQ3P1...',
    'ecupwIfBy1w:APA91bFtuMY7MktgxA3Au_Qx7cKqnf...'
  ];

// See the "Defining the message payload" section below for details on how to define a message payload.
var payload = {
    notification: {
      title: "Title of Notification",
      body: 'body of Notification'
    }
  };

const options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24, // 1 day
  };
  // Send a message to the devices corresponding to the provided registration tokens.
admin.messaging().sendToDevice(registrationTokens, payload ,options)
    .then(function(response) {
      console.log('Successfully sent message:', response);
    })
    .catch(function(error) {
      console.log('Error sending message:', error);
    });


// See the "Managing device groups" link above on how to generate a notification key.
var notificationKey = 'some-notification-key';

// Send a message to the device group corresponding to the provided notification key.
admin.messaging().sendToDeviceGroup(notificationKey, payload ,options)
  .then(function(response) {
    // See the MessagingDeviceGroupResponse reference documentation for the contents of response.
    console.log('Successfully sent message:', response);
  })
  .catch(function(error) {
    console.log('Error sending message:', error);
  });

module.exports = admin;