const namespace = 'sl';

export const getClassName = (...names) => {
  names.unshift(namespace);

  return names.reduce((className, name) => {
    return `${className}-${name}`;
  });
};
