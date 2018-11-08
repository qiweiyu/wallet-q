export default {
  warning: (name, info) => {
    console.log('warning:', name, JSON.stringify(info));
  },
  fatal: (name, info) => {
    console.log('fatal:', name, JSON.stringify(info));
    throw `fatal: ${name}: ${JSON.stringify(info)}`;
  },
};