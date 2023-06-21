const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

const stringUtils = {
    removeAccents
}
export default stringUtils;