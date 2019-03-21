/* eslint-disable global-require */
import racasCao from './racasCao';
import racasGato from './racasGato';

export const tipos = ['cao', 'gato'];

export const naoDefinidos = [
  { name: 'dog_undefined.png', uri: require('./cachorro/dog_undefined.png') },
  { name: 'dog_undefined2.png', uri: require('./cachorro/dog_undefined2.png') },
  { name: 'dog_undefined3.png', uri: require('./cachorro/dog_undefined3.png') },
  { name: 'dog_undefined4.png', uri: require('./cachorro/dog_undefined4.png') },
  { name: 'dog_undefined5.png', uri: require('./cachorro/dog_undefined5.png') }
];

export function getMiniatura(doacao) {
  if (tipos[0] === doacao.tipo) {
    return racasCao.find(e => e.raca === doacao.raca);
  } if (tipos[1] === doacao.tipo) {
    return racasGato.find(e => e.raca === doacao.raca);
  }
  return null;
  // return imagensMiniatura.find((e) => e.name === nameMiniatura);
}

export function getNaoDefinido() {
  const index = Math.floor(Math.random() * 5);
  return naoDefinidos[index].uri;
}
