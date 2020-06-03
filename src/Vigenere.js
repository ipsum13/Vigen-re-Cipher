import Caeser from "./Caeser";

const standardFrequency = {
  A: 0.082,
  B: 0.015,
  C: 0.028,
  D: 0.043,
  E: 0.127,
  F: 0.022,
  G: 0.02,
  H: 0.061,
  I: 0.07,
  J: 0.002,
  K: 0.008,
  L: 0.04,
  M: 0.024,
  N: 0.067,
  O: 0.075,
  P: 0.019,
  Q: 0.001,
  R: 0.06,
  S: 0.063,
  T: 0.091,
  U: 0.028,
  V: 0.01,
  W: 0.023,
  X: 0.001,
  Y: 0.02,
  Z: 0.001,
};

/* const strip = (str) => {
  return str.replace(/\s+/g, "");
}; */

const ascii = (char) => {
  return char.charCodeAt(0);
};

const chr = (ascii) => {
  return String.fromCharCode(ascii);
};

const circularShiftLeft = (array) => {
  array.push(array.shift());
};

const getFrequencyTable = (str) => {
  var i, charCount, charFrequency;
  charCount = {};
  for (i = 0; i < 26; ++i) {
    charCount[chr(i + ascii("A"))] = 0;
  }
  for (i = 0; i < str.length; ++i) {
    ++charCount[str[i]];
  }
  charFrequency = {};
  for (i = 0; i < 26; ++i) {
    charFrequency[chr(i + ascii("A"))] =
      charCount[chr(i + ascii("A"))] / str.length;
  }

  return charFrequency;
};

const indexOfCoincidence = (frequencyTable) => {
  var i, c, idx;
  idx = 0;
  for (i = 0; i < 26; ++i) {
    c = chr(i + ascii("A"));
    idx += frequencyTable[c] * standardFrequency[c];
  }

  return idx;
};

const divide = (str, numGroups) => {
  var i, groups;

  groups = [];
  for (i = 0; i < numGroups; ++i) {
    groups.push([]);
  }
  for (i = 0; i < str.length; ++i) {
    groups[i % numGroups].push(str[i]);
  }
  for (i = 0; i < numGroups; ++i) {
    groups[i] = groups[i].join("");
  }

  return groups;
};

function bestCaeserShift(ciphertext) {
  var plaintext,
    shiftAmount,
    bestShiftAmount,
    index,
    difference,
    bestDifference;

  bestShiftAmount = 0;
  bestDifference = Number.MAX_VALUE;
  for (shiftAmount = 0; shiftAmount < 26; ++shiftAmount) {
    plaintext = Caeser.decrypt(ciphertext, shiftAmount);
    index = indexOfCoincidence(getFrequencyTable(plaintext));
    difference = Math.abs(index - 0.065);
    if (difference < bestDifference) {
      bestDifference = difference;
      bestShiftAmount = shiftAmount;
    }
  }

  return [bestShiftAmount, bestDifference];
}

const Vigenere = {
  encrypt: (plaintext, key) => {
    var i, plainChar, shiftAmount, cipherChars;

    plaintext = plaintext.toUpperCase();
    console.log(plaintext);
    key = key.toUpperCase().split("");
    cipherChars = [];
    for (i = 0; (plainChar = plaintext[i]); ++i) {
      if (ascii(plainChar) === 32) {
        cipherChars.push(" ");
      } else {
        shiftAmount = ascii(key[0]) - ascii("A");
        cipherChars.push(Caeser.encrypt(plainChar, shiftAmount));
      }
      circularShiftLeft(key);
    }
    return cipherChars.join("");
  },

  decrypt: (ciphertext, key) => {
    var i, cipherChar, shiftAmount, plainChars;

    ciphertext = ciphertext.toUpperCase();
    key = key.toUpperCase().split("");

    plainChars = [];
    for (i = 0; (cipherChar = ciphertext[i]); ++i) {
      if (ascii(cipherChar) === 32) {
        plainChars.push(" ");
      } else {
        shiftAmount = ascii(key[0]) - ascii("A");
        plainChars.push(Caeser.decrypt(cipherChar, shiftAmount));
      }
      circularShiftLeft(key);
    }

    return plainChars.join("");
  },

  crack: (ciphertext, maxKeyLength) => {
    var i,
      keyLen,
      groups,
      groupIndex,
      group,
      info,
      plaintexts,
      shiftAmount,
      difference,
      totalDifference,
      overall;
    overall = [];

    for (keyLen = 1; keyLen <= maxKeyLength; ++keyLen) {
      groups = divide(ciphertext, keyLen);

      totalDifference = 0;
      plaintexts = [];
      for (groupIndex = 0; groupIndex < groups.length; ++groupIndex) {
        group = groups[groupIndex];
        info = bestCaeserShift(group);
        shiftAmount = info[0];
        difference = info[1];

        totalDifference += difference;
        plaintexts.push(Caeser.decrypt(group, shiftAmount));
      }

      let plaintext = [];
      for (i = 0; i < ciphertext.length; ++i) {
        plaintext.push(plaintexts[i % keyLen].charAt(i / keyLen));
      }
      plaintext = plaintext.join("");

      overall.push([totalDifference, plaintext]);
    }

    overall.sort(function (a, b) {
      return a[0] < b[0];
    });

    return overall;
  },
};

export default Vigenere;
