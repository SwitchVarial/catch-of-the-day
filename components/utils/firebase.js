import { initializeApp } from "firebase/app";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGIN_SENDER_ID,
  FIREBASE_APP_ID,
} from "@env";
import {
  getDatabase,
  push,
  set,
  ref,
  onValue,
  remove,
  update,
} from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGIN_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const saveTrip = (region, startTime, selected) => {
  const tripKey = push(ref(database, "/fishing-trips"), {
    startLocation: {
      latitude: region.latitude,
      longitude: region.longitude,
    },
    startTime: startTime,
    fishingType: selected,
  }).key;
  return tripKey;
};

export const getTrip = (tripKey) => {
  let trip = [];
  const itemsRef = ref(database, "/fishing-trips/" + tripKey);
  return onValue(itemsRef, (snapshot) => {
    const data = snapshot.val();
    if (data !== null) {
      trip = Object.values(data);
    }
  });
  return trip;
};

export const getFishes = (tripKey) => {
  let fish = [];
  const itemsRef = ref(database, "/fishing-trips/" + tripKey + "/fish");
  onValue(itemsRef, (snapshot) => {
    const data = snapshot.val();
    fish = data ? Object.keys(data).map((key) => ({ key, ...data[key] })) : [];
  });
  return fish;
};
