import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  enableNetwork,
  disableNetwork,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Configure Firestore settings for better error handling
if (typeof window !== "undefined") {
  // Handle Firestore connection state
  const handleFirestoreError = (error: Error) => {
    console.error("Firestore connection error:", error);
    // You could dispatch to a global error handler here
  };

  // Set up connection monitoring
  window.addEventListener("online", async () => {
    try {
      await enableNetwork(db);
    } catch (error) {
      handleFirestoreError(error as Error);
    }
  });

  window.addEventListener("offline", async () => {
    try {
      await disableNetwork(db);
    } catch (error) {
      handleFirestoreError(error as Error);
    }
  });
}

// Initialize messaging safely
let messagingInstance: unknown = null;

const initializeMessaging = async () => {
  try {
    // Only load messaging in browser environment and when supported
    if (typeof window !== "undefined") {
      const { getMessaging, isSupported } = await import("firebase/messaging");
      const supported = await isSupported();

      if (supported) {
        messagingInstance = getMessaging(app);
      } else {
        console.warn("Firebase messaging is not supported in this browser");
      }
    }
  } catch (error) {
    console.warn("Firebase messaging initialization failed:", error);
  }
  return messagingInstance;
};

// Export messaging getter
export const getMessagingInstance = () => {
  if (!messagingInstance) {
    initializeMessaging().catch(() => {
      // Silently fail - messaging is optional
    });
  }
  return messagingInstance;
};

// For backward compatibility
export const messaging = messagingInstance;

export default app;
