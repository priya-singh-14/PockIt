"use client";

// client-side auth helper
export const setAuthCookie = async (user) => {
  if (user) {
    try {
      const token = await user.getIdToken();
      document.cookie = `authToken=${token}; path=/; max-age=3600; SameSite=Strict`;
      return true;
    } catch (error) {
      console.error("Error setting auth cookie:", error);
      return false;
    }
  } else {
    document.cookie = 'authToken=; path=/; max-age=0';
    return true;
  }
};