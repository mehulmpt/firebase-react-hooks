import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const config = {
  apiKey: "AIzaSyAQM03y6PsPZfgJWV5-PdztWRsJ7TM6iDM",
  authDomain: "grocery-list-4bda3.firebaseapp.com",
  databaseURL: "https://grocery-list-4bda3.firebaseio.com",
  projectId: "grocery-list-4bda3",
  storageBucket: "grocery-list-4bda3.appspot.com",
  messagingSenderId: "228478752812",
  appId: "1:228478752812:web:b258b7296dbe5142"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name
    });
  }

  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }
}

export default new Firebase();
