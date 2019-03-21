import { isNumber, isEmpty, isDate, parseInt } from 'lodash';

const join = rules => (value, data) =>
  rules.map(rule => rule(value, data)).filter(error => !!error)[0];

export function email(value) {
  if (
    !isEmpty(value) &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ) {
    return 'E-mail inválido';
  }
  return false;
}

export function required(value) {
  // WORKAROUND numbers and dates return true for isEmpty
  // https://github.com/lodash/lodash/issues/483
  if (isEmpty(value) && !isNumber(value) && !isDate(value)) {
    return 'Obrigatório';
  }
  return false;
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Deve ter no máximo ${max} digitos`;
    }
    return false;
  };
}

export function isStrong(oldPassword) {
  return value => {
    if (isEmpty(value)) return 'Password required';
    if (value === oldPassword)
      return 'New password must be different than the old one!';
    if (value.length < 8) return 'Password too short!';
    if (!/[\d\W_]/i.test(value))
      return 'Password must contain at least one number or symbol!';
    if (!/[A-Z]/.test(value))
      return 'Password must contain at least one uppercase leter!';
    if (!/[a-z]/.test(value))
      return 'Password must contain at least one lowercase leter!';
    return false;
  };
}

export function match(password) {
  return value => {
    if (value !== password) {
      return 'As senhas não conferem';
    }
    return false;
  };
}

export function matchPassword(value, data) {
  if (value !== data.password) {
    return 'As senhas não conferem';
  }

  return false;
}

export function minLengthPassword(value) {
  if (value && value.length < 6) {
    return 'Senha muito pequena, deverá ter 6 ou mais caracteres';
  }

  return false;
}

export function phone(value) {
  // Skip validation when empty.
  if (isEmpty(value)) {
    return false;
  }

  const numbers = value.replace(/[^\d]+/g, '');

  if (/[\d]{10,11}/.test(numbers)) {
    return false;
  }

  return 'Telefone inválido';
}

export const zip = value => {
  // Skip validation when empty.
  if (isEmpty(value)) {
    return false;
  }

  const numbers = value.replace(/[^\d]+/g, '');

  if (/[\d]{8}/.test(numbers)) {
    return false;
  }

  return 'CEP inválido';
};

export const cnpj = value => {
  // Skip validation when empty.
  if (isEmpty(value)) {
    return false;
  }

  const numbers = value.replace(/[^\d]+/g, '');

  if (
    numbers === '00000000000000' ||
    numbers === '11111111111111' ||
    numbers === '22222222222222' ||
    numbers === '33333333333333' ||
    numbers === '44444444444444' ||
    numbers === '55555555555555' ||
    numbers === '66666666666666' ||
    numbers === '77777777777777' ||
    numbers === '88888888888888' ||
    numbers === '99999999999999'
  ) {
    return 'CNPJ inválido';
  }

  if (numbers.length === 14 && !/[\d]{14}/.test(value)) {
    let size = numbers.length - 2;
    let digits = numbers.substring(0, size);
    const key = numbers.substring(size);
    let numberSum = 0;
    let pos = size - 7;

    for (let i = size; i >= 1; i -= 1) {
      numberSum += digits.charAt(size - i) * pos;
      pos -= 1;
      if (pos < 2) {
        pos = 9;
      }
    }

    let result = numberSum % 11 < 2 ? 0 : 11 - (numberSum % 11);
    if (result.toString() !== key.charAt(0)) {
      return 'CNPJ inválido';
    }

    size += 1;
    digits = numbers.substring(0, size);
    numberSum = 0;
    pos = size - 7;

    for (let i = size; i >= 1; i -= 1) {
      numberSum += digits.charAt(size - i) * pos;
      pos -= 1;
      if (pos < 2) {
        pos = 9;
      }
    }

    result = numberSum % 11 < 2 ? 0 : 11 - (numberSum % 11);

    if (result.toString() !== key.charAt(1)) {
      return 'CNPJ inválido';
    }
    return false;
  }

  return 'CNPJ inválido';
};

export const cpf = value => {
  // Skip validation when empty.
  if (isEmpty(value)) {
    return false;
  }

  const numbers = value.replace(/[^\d]+/g, '');

  if (
    numbers === '00000000000' ||
    numbers === '11111111111' ||
    numbers === '22222222222' ||
    numbers === '33333333333' ||
    numbers === '44444444444' ||
    numbers === '55555555555' ||
    numbers === '66666666666' ||
    numbers === '77777777777' ||
    numbers === '88888888888' ||
    numbers === '99999999999'
  ) {
    return 'CPF inválido';
  }

  if (numbers.length === 11 && !/[\d]{11}/.test(value)) {
    let digits = 0;

    for (let i = 0; i < 9; i += 1) {
      digits += parseInt(numbers.charAt(i)) * (10 - i);
    }

    let key = 11 - (digits % 11);

    if (key === 10 || key === 11) {
      key = 0;
    }

    if (key !== parseInt(numbers.charAt(9))) {
      return 'CPF inválido';
    }

    digits = 0;

    for (let i = 0; i < 10; i += 1) {
      digits += parseInt(numbers.charAt(i)) * (11 - i);
    }

    key = 11 - (digits % 11);

    if (key === 10 || key === 11) {
      key = 0;
    }

    if (key !== parseInt(numbers.charAt(10))) {
      return 'CPF inválido';
    }

    return false;
  }

  return 'CPF inválido';
};

export const cnpjCpf = (value, data) => {
  if (isEmpty(value)) {
    return false;
  }

  const numbers = value.replace(/[^\d]+/g, '');

  if (data && data.type) {
    if (data.type === 'individual') {
      return cpf(value);
    }
    return cnpj(value);
  }

  if (numbers.length <= 11) {
    return cpf(value);
  }

  if (numbers.length <= 14) {
    return cnpj(value);
  }
  return false;
};

export function createValidator(rules) {
  return immutableObj => {
    const data = immutableObj;
    const errors = {};
    Object.keys(rules).forEach(key => {
      const rule = join([].concat(rules[key]));
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });

    return errors;
  };
}

export function checked(value) {
  if (value) {
    return false;
  }
  return 'Obrigatório';
}

export function listContactRequerid(key, value) {
  if (value) {
    if (!value.contactList || !value.contactList.length) {
      return { _error: 'Infome ao menos um contato.' };
    }
    const contactsArrayErrors = [];
    value.contactList.forEach((contact, index) => {
      const contactErrors = {};
      if (!contact || !contact.firstName) {
        contactErrors.firstName = 'Obrigatório';
        contactsArrayErrors[index] = contactErrors;
      }
      if (!contact || !contact.lastName) {
        contactErrors.lastName = 'Obrigatório';
        contactsArrayErrors[index] = contactErrors;
      }
      if (!contact || !contact.level) {
        contactErrors.level = 'Obrigatório';
        contactsArrayErrors[index] = contactErrors;
      }
      if (!contact || !contact.email) {
        contactErrors.email = 'Obrigatório';
        contactsArrayErrors[index] = contactErrors;
      } else {
        const duplicate = value.contactList.filter(
          (e, i) =>
            index !== i &&
            contact.email &&
            e.email &&
            contact.email.toLowerCase() === e.email.toLowerCase()
        );
        if (duplicate && duplicate.length > 0) {
          contactErrors.email = 'E-mail duplicado.';
          contactsArrayErrors[index] = contactErrors;
        }
      }
      return contactErrors;
    });
    if (contactsArrayErrors.length) {
      return contactsArrayErrors;
    }
    return false;
  }
  return true;
}

export function oneOf(enumeration) {
  return value => {
    if (!enumeration.indexOf(value)) {
      return `Deverá ser um entre: ${enumeration.join(', ')}`;
    }
    return false;
  };
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return 'Deverá ser número';
  }
  return false;
}

export function checkMeasure(key, value) {
  if (value.measures && value.measures.length > 0) {
    if (!value.measures || !value.measures.length) {
      return { _error: 'Informe ao menos uma unidade de medida secundária.' };
    }
    const measuresArrayErrors = [];
    value.measures.forEach((measure, index) => {
      const measureErrors = {};
      if (!measure || !measure.measure) {
        measureErrors.measure = 'Obrigatório';
        measuresArrayErrors[index] = measureErrors;
      } else {
        const duplicate = value.measures.filter(
          (e, i) =>
            index !== i &&
            measure.measure &&
            e.measure &&
            measure.measure === e.measure
        );
        if (duplicate && duplicate.length > 0) {
          measureErrors.measure = 'Unidade de medida secindária duplicada.';
          measuresArrayErrors[index] = measureErrors;
        }

        if (value.measureMain === measure.measure) {
          measureErrors.measure =
            'Unidade de medida idêntica à unidade de medida principal. Favor selecionar outra.';
          measuresArrayErrors[index] = measureErrors;
        }
      }
      if (!measure || !measure.measure) {
        measureErrors.measure = 'Obrigatório';
        measuresArrayErrors[index] = measureErrors;
      }
      if (!measure || !measure.measurementUnitFactor) {
        measureErrors.measurementUnitFactor = 'Obrigatório';
        measuresArrayErrors[index] = measureErrors;
      }
      if (!measure || !measure.measurementUnitOperator) {
        measureErrors.measurementUnitOperator = 'Obrigatório';
        measuresArrayErrors[index] = measureErrors;
      }
      if (
        !isEmpty(measure.measurementUnitFactor) &&
        !isNumber(parseFloat(measure.measurementUnitFactor))
      ) {
        measureErrors.measurementUnitFactor = 'Deverá ser número.';
        measuresArrayErrors[index] = measureErrors;
      }
      return measureErrors;
    });
    if (measuresArrayErrors.length) {
      return measuresArrayErrors;
    }
    return false;
  }
  return true;
}
