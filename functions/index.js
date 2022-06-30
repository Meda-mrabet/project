const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.notifyUser = functions.firestore
    .document('commandes/{commandeId}')
    .onCreate(async (snap, context) =>{
        
    const commande = snap.data();
    const userId = commande.uid_client

    // Message details for end user
    const payload = {
        notification: {
            title: 'New message!',
            body: `${commande.displayName} sent you a new message`,
            icon: 'https://placeimg.com/250/250/people'
          }
    }

    // ref to the parent document
    const db = admin.firestore()
    const userRef = db.collection('users').doc(userId)


    // get users tokens and send notifications
    return userRef.get()
        .then(snapshot => snapshot.data() )
        .then(user => {
            
            const tokens = user.fcmTokens ? Object.keys(user.fcmTokens) : []

            if (!tokens.length) {
               throw new Error('User does not have any tokens!')
            }

            return admin.messaging().sendToDevice(tokens, payload)
        })
        .catch(err => console.log('hay'+err) )
});