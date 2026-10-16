
const path = require("path");
const admin = require("firebase-admin");

// Build the absolute path to the service-account JSON file.
const serviceAccountPath = path.resolve(
  __dirname,
  "..",
  "serviceAccountKey.json"
);

// Load the service-account credentials.
const serviceAccount = require(serviceAccountPath);

// Initialize Firebase Admin only once.
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const auth = admin.auth();

module.exports = { admin, auth };
