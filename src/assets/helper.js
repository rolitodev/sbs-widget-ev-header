export const sortAlphabeticaly = (index, titulo) => {
  if (!index.title || !titulo.title) {
    return 0;
  }
  const dataIndex = index.title.toUpperCase();
  const dataTitle = titulo.title.toUpperCase();
  if (dataIndex === dataTitle) {
    return 0;
  } return (dataIndex < dataTitle) ? -1 : 1;
};

export const sortAlphabeticalyProducts = (index, titulo) => {
  if (!index.nombreAplicacion || !titulo.nombreAplicacion) {
    return 0;
  }
  const dataIndex = index.nombreAplicacion.toUpperCase();
  const dataTitle = titulo.nombreAplicacion.toUpperCase();
  if (dataIndex === dataTitle) {
    return 0;
  } return (dataIndex < dataTitle) ? -1 : 1;
};

export const sortByApplicationCode = (x, y) => {
  const a = x.applicationCode;
  const b = y.applicationCode;
  // eslint-disable-next-line no-nested-ternary
  return a === b ? 0 : a > b ? 1 : -1;
};

export default { sortAlphabeticaly, sortAlphabeticalyProducts, sortByApplicationCode };
