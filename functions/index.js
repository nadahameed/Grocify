/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require('firebase-admin');
admin.initializeApp();

// Function to add a message to Firestore
exports.addMessage = onRequest(async (req, res) => {
  logger.info("Request received to add a message", {structuredData: true});
  const message = req.query.text;
  try {
    const writeResult = await admin.firestore().collection('messages').add({ text: message });
    res.json({ result: `Message with ID: ${writeResult.id} added.` });
  } catch (error) {
    logger.error("Error adding message: ", error);
    res.status(500).send("Error adding message");
  }
});
