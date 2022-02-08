// will loop over an objects' properties and replace value with defaultValue if property value evals to falsy
// mutates the original object does not return  new object/array
const defaultObjectProperties = (obj, defaultValue) => {
  Object.keys(obj).forEach((key) => {
    if (!obj[key]) return (obj[key] = defaultValue);
  });
};

export default defaultObjectProperties;
