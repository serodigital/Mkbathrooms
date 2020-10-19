const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const admin=require('firebase-admin');
const { info } = require('console');

admin.initializeApp()

require('dotenv').config()

const {SENDER_EMAIL, SENDER_PASSWORD}= process.env;

exports.sendEmailNotification=functions.firestore.document('submissions/{docId}')
.onCreate((snap,ctx)=>{
    const data = snap.data();

    let authData = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        secure: true,
        auth:{
            user: SENDER_EMAIL,
            pass: SENDER_PASSWORD
        }
    });

    authData.sendMail({
        from: 'info.test@gmail.com',
        to: '${data.email}',
        subject: 'Your submission info',
        text: '${data.email}',
        html: '${data.email}',
    }).then(res=> console.log('Successfully sent')).catch(err=>console.log(err));

})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
