import firebase from '../Utils/FirebaseUtils';

class FbListaDoacaoService {
  constructor() {
    this.ref = firebase.firestore().collection('listaDoacao');
  }

  async save(payload) {
    const result = await this.ref.add(payload);
    return result;
  }

  async update({ payload }) {
    try {
      const values = await this.fetchByUser(payload);
      // console.log(payload);
      // console.log('-----------');
      // console.log(values);
      if (values && values.length > 0) {
        const { userCustom } = payload;
        for (const doacao of values) {
          // eslint-disable-next-line no-await-in-loop
          const doacaoDoc = await this.ref.doc(doacao.id);
          // eslint-disable-next-line no-await-in-loop
          await doacaoDoc.update({ user: userCustom });
        }
      }
      // const userRef = firebase.auth().currentUser;
      //     await userRef.updateProfile({ displayName: name });
    } catch (err) {
      throw err;
    }
  }

  async updateInfo({ payload }) {
    try {
      const { doacao, status } = payload;

      const doacaoDoc = await this.ref.doc(doacao.id);
      await doacaoDoc.update({ status });
      console.log('alterado');
    } catch (err) {
      throw err;
    }
  }

  async load(id) {
    try {
      return await this.ref.doc(id).get();
    } catch (err) {
      throw err;
    }
    // var query = citiesRef.where("state", "==", "CA");
    // if (doc.exists) {
    //     return doc.data();
    // }
    // const defaultDoc = {
    //     name: 'ABC',
    //     age: 2
    // };
    // await this.ref.doc(id).set(defaultDoc);
    // return doc;
  }

  async fetchAll() {
    try {
      const result = [];

      await this.ref
        .where('status', '==', 'aberto')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            result.push({ id: doc.id, ...doc.data() });
          });
        });
      return result;
    } catch (err) {
      throw new Error('Erro ao obter lista de pets.');
    }
  }

  async fetchByUser({ userCustom }) {
    if (!userCustom) {
      throw new Error('usuário não pode ser nulo.');
    }
    const result = [];
    try {
      if (userCustom.id) {
        await this.ref
          .where('user.id', '==', userCustom.id)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              result.push({ id: doc.id, ...doc.data() });
            });
          });
      }
      // else {
      //     await this.ref.where('user.uid', '==', user.uid).get().then((querySnapshot) => {
      //         querySnapshot.forEach((doc) => {
      //             result.push({ id: doc.id, ...doc.data() });
      //         });
      //     });
      // }
    } catch (err) {
      throw new Error('Erro ao obter lista de pets.');
    }
    return result;
  }
}
export default new FbListaDoacaoService();
