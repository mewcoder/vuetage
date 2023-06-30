const ensureEndSlash = path => {
  return path.replace(/([^/])$/, '$1/');
};

console.log(ensureEndSlash('/'));
