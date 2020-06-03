const ascii = (char) => {
  return char.charCodeAt(0);
};

const substitute = (text, sequence) => {
  var chars = [];

  text = strip(text).toUpperCase();
  for (let i = 0; i < text.length; ++i) {
    chars.push(sequence[text.charCodeAt(i) - ascii("A")]);
  }

  return chars.join("");
};

const strip = (str) => {
  return str.replace(/\s+/g, "");
};

const Caeser = {
  encrypt: (plaintext, shiftAmount) => {
    var sequence = [];
    for (let i = 0; i < 26; ++i) {
      sequence.push(String.fromCharCode(ascii("A") + ((shiftAmount + i) % 26)));
    }

    return substitute(plaintext, sequence);
  },

  decrypt: (ciphertext, shiftAmount) => {
    var sequence = new Array(26);
    for (let i = 0; i < 26; ++i) {
      sequence[(shiftAmount + i) % 26] = String.fromCharCode(ascii("A") + i);
    }

    return substitute(ciphertext, sequence);
  },
};

export default Caeser;
