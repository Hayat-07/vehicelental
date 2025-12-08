const jwt = require('jsonwebtoken');
const secret = 'KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';
const token = jwt.sign({ id: 1, email: 'dev@local', role: 'admin' }, secret, { expiresIn: '1h' });
console.log(token);
