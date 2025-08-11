const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");

let app;

if (!admin.apps.length) {
  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  app = admin.app();
}

const auth = admin.auth();

module.exports = auth;
