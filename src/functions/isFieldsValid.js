function isFieldsValid(personData) {
  if (
    !personData.name ||
    typeof personData.name !== "string" ||
    !personData.age ||
    typeof personData.age !== "number" ||
    !personData.hobbies ||
    !Array.isArray(personData.hobbies)
  ) {
    return false;
  };
  return true;
};

module.exports = isFieldsValid;

