const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

exports.someroute = functions.http.onRequest(async (req, res) => {
  const { name, phone } = req.query;

  const addContact = await admin
    .firestore()
    .collection("contacts")
    .add({ name, phone });

  req.json({ result: addContact.id });
});

exports.addDate = functions.firestore
  .document("contacts/{contactId}")
  .onCreate((snap, ctx) => {
    const timestamp = admin.firestore.FieldValue.serverTimestamp();
    return admin
      .firestore()
      .doc(`contacts/${ctx.params.contactId}`)
      .update({ createAt: timestamp });
  });

exports.addLog = functions.http.onCall((data, ctx) => {
  const log = {
    message: data.message,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  };

  return admin.firestore().doc(`logs`).update(log);
});
