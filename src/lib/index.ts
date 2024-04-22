const crypto = require('crypto');

// Generate a random encryption key
const generateEncryptionKey = () => {
  return crypto.randomBytes(32); // 32 bytes for AES-256
};

// Use the generated key for encryption
const encryptionKey = generateEncryptionKey();
console.log('Encryption Key:', encryptionKey.toString('hex'));