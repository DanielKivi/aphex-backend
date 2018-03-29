module.exports = () => {
  return async context => {
    const {data, result} = context;
    delete result.uri;
    return context;
  };
};
