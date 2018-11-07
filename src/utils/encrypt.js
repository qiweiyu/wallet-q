import crypto from 'crypto';
//import Buffer from 'buffer';

const CIPHER_ALGORITHM = 'aes-256-ctr';

const aes256 = {
  encrypt: (key, plaintext) => {
    if (typeof key !== 'string' || !key) {
      throw 'Provided "key" must be a non-empty string';
    }
    if (typeof plaintext !== 'string' || !plaintext) {
      throw 'Provided "plaintext" must be a non-empty string';
    }

    const sha256 = crypto.createHash('sha256');
    sha256.update(key);

    // Initialization Vector
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(CIPHER_ALGORITHM, sha256.digest(), iv);

    const ciphertext = cipher.update(new Buffer(plaintext));
    const encrypted = Buffer.concat([iv, ciphertext, cipher.final()]).toString('base64');

    return encrypted;
  },
  decrypt: function (key, encrypted) {
    if (typeof key !== 'string' || !key) {
      throw new TypeError('Provided "key" must be a non-empty string');
    }
    if (typeof encrypted !== 'string' || !encrypted) {
      throw new TypeError('Provided "encrypted" must be a non-empty string');
    }

    var sha256 = crypto.createHash('sha256');
    sha256.update(key);

    var input = new Buffer(encrypted, 'base64');

    if (input.length < 17) {
      throw new TypeError('Provided "encrypted" must decrypt to a non-empty string');
    }

    // Initialization Vector
    var iv = input.slice(0, 16);
    var decipher = crypto.createDecipheriv(CIPHER_ALGORITHM, sha256.digest(), iv);

    var ciphertext = input.slice(16);
    var plaintext = decipher.update(ciphertext) + decipher.final();

    return plaintext;
  },
};

export default aes256;