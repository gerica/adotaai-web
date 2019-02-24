import { firebaseDatabase } from '../Utils/FirebaseUtils';

class FbSessionService {
  async signIn({ email, password }) {
    let user = null;
    try {
      user = await this.firebaseDatabase
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
      user = await this.firebaseDatabase
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
        await firebaseDatabase.auth().signOut();
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }

  async update({ name }) {
    const userRef = this.firebaseDatabase.auth().currentUser;
    try {
      await userRef.updateProfile({ displayName: name });
    } catch (err) {
      throw err;
    }
  }

  async refresh() {
    const userRef = this.firebaseDatabase.auth().currentUser;
    try {
      // return await ref.getUser(uid);
      await userRef.reload();
      return firebaseDatabase.auth().currentUser;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  isSignedIn() {
    return this.firebaseDatabase.auth().currentUser;
  }
}

export default new FbSessionService();
