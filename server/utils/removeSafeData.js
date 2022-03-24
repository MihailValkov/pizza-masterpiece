function removeObjectFields(obj) {
  const { __v, password, ...data } = obj;
  return data;
}

module.exports = {
  removeObjectFields,
};
