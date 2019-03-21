import firebaseApp, { googleProvider } from '../Utils/FirebaseUtils';

class GoogleSigninService {
  // Somewhere in your code
  async signIn() {
    try {
      firebaseApp.auth().languageCode = 'pt';
      return await firebaseApp.auth().signInWithPopup(googleProvider);
    } catch (error) {
      throw error;
    }
    // try {
    //     await GoogleSignin.hasPlayServices();
    //     return await GoogleSignin.signIn();
    // } catch (error) {
    //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //         error.msgCustom = 'user cancelled the login flow';
    //     } else if (error.code === statusCodes.IN_PROGRESS) {
    //         error.msgCustom = 'operation (f.e. sign in) is in progress already';
    //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //         error.msgCustom = 'play services not available or outdated';
    //     }
    //     throw (error);
    // }
  }

  async signOut() {
    try {
      // if (await this.isSignedIn()) {
      // }
      await firebaseApp.auth().signOut();
    } catch (error) {
      throw error;
    }
  }

  async isSignedIn() {
    // return await GoogleSignin.isSignedIn();
  }
}
export default new GoogleSigninService();
