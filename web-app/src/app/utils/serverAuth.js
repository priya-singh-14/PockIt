import initFirebaseAdmin from "../../../firebaseAdmin";

// server side auth helper
export async function getCurrentUser(cookies) {
  const cookieStore = await cookies;
  const authToken = cookieStore.get("authToken")?.value;

  if (!authToken) {
    return null;
  }

  try {
    const adminAuth = initFirebaseAdmin();
    const decodedToken = await adminAuth.verifyIdToken(authToken);
    console.log("got token");
    return decodedToken;
  } catch (error) {
    console.error("Error verifying auth token:", error);
    return null;
  }
}
