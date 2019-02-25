import firebase from '../Utils/FirebaseUtils';

class FbSessionService {
  async signIn({ email, password }) {
    let user = null;
    try {
      user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
    } catch (err) {
      throw err;
    }
    return user;
  }

  async login({ username, password }) {
    let user = null;
    try {
      user = await firebase
        .auth()
        .signInWithEmailAndPassword(username, password);
    } catch (err) {
      console.log(err);
      throw err;
    }
    return user;
  }

  async signOut() {
    if (this.isSignedIn()) {
      try {
        await firebase.auth().signOut();
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }

  async update({ name }) {
    const userRef = firebase.auth().currentUser;
    try {
      await userRef.updateProfile({ displayName: name });
    } catch (err) {
      throw err;
    }
  }

  async refresh() {
    const userRef = firebase.auth().currentUser;
    try {
      // return await ref.getUser(uid);
      await userRef.reload();
      return firebase.auth().currentUser;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  isSignedIn() {
    return firebase.auth().currentUser;
  }
}

export default new FbSessionService();
