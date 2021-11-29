const { v4: uuidv4 } = require("uuid");
const sendMessage = require('./sendMessage')

function addNewPersonAndSendIt(persons, personData, res) {
  const newPerson = {
    id: uuidv4(),
    ...personData,
  };
  persons.push(newPerson);
  sendMessage(
    res,
    201,
    JSON.stringify(newPerson)
  );
};
 module.exports = addNewPersonAndSendIt;
