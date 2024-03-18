const devHost = 'http://localhost:3000';
const prodHost = 'https://jax-ninja-course.onrender.com';
console.log('執行 myconfig.js ');

let apiUrl = process.env.NODE_ENV === 'production' ? prodHost : devHost;
// apiUrl = devHost;

export {apiUrl};
