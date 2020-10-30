export const fromDocumentToObject = (doc, objClass) => {
  return Object.assign(new objClass(), doc);
};
