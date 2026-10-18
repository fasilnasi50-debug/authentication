
const path = require("path");
const admin = require("firebase-admin");

const serviceAccountPath = path.resolve(
  __dirname,
  "..",
  "serviceAccountKey.json")

 const serviceAccount = require(serviceAccountPath);


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const auth = admin.auth();

module.exports = { admin, auth };
