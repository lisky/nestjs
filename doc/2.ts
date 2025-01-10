const path = require('path');
const prefix = '/cats/';
const pathMetadata = '///create';

console.log(path.posix.join('/', prefix, pathMetadata));
