import { firebaseDatabase } from '../Utils/FirebaseUtils';

class FbUsuarioService {
  constructor() {
    this.ref = firebaseDatabase.ref('usuario');
  }

  async save(payload) {
    try {
      const docUser = await this.ref.add(payload);
      const getUser = await docUser.get();
      return { ...getUser.data() };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update({
    user: {
      userCustom: { idDoc }
    },
    dados
  }) {
    try {
      await this.ref.doc(idDoc).update(dados);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getByIdUser(user) {
    try {
      const fbUser = await this.ref
        .where('id', '==', user.id || user.uid)
        .get();
      switch (fbUser.size) {
        case 0:
          return null;
        case 1: {
          let result;
          fbUser.forEach(doc => {
            result = { idDoc: doc.id, ...doc.data() };
          });
          return result;
        }
        default:
          throw new Error('Existe mais de um usuário com o id informado');
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async load({ id }) {
    try {
      const doc = await this.ref.doc(id).get();
      // var query = citiesRef.where("state", "==", "CA");
      if (doc.exists) {
        return { idDoc: doc.id, ...doc.data() };
      }
      return null;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async fetchAll() {
    const result = [];
    await this.ref.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        result.push({ id: doc.id, ...doc.data() });
      });
    });
    return result;
  }
}

export default new FbUsuarioService();
