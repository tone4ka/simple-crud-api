require("dotenv").config();
const http = require("http");
const isFieldsValid = require("./functions/isFieldsValid");
const addNewPersonAndSendIt = require("./functions/addNewPersonAndSendIt");
const sendMessage = require("./functions/sendMessage");

const persons = [];

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Transfer-Encoding", "chunked");

  if (req.url === "/person" && req.method === "GET") {
    try {
      sendMessage(
        res,
        200,
        JSON.stringify(persons)
      );
    } catch (error) {
      res.setHeader("Content-Type", 'text/plain');
      sendMessage(res, 500, error.message)
    }
  } else if (req.url === "/person" && req.method === "POST") {
    try {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", async () => {
        const personData = JSON.parse(data);
        if (isFieldsValid(personData)) {
          addNewPersonAndSendIt(persons, personData, res);
        } else {
          res.setHeader("Content-Type", 'text/plain');
          sendMessage(
            res,
            400,
            "The request body does not contain required fields or some fields is incorrect"
          );
        }
      });
    } catch (error) {
      res.setHeader("Content-Type", 'text/plain');
      sendMessage(res, 500, error.message)
    }
  } else {
    URLarr = req.url.split("/");
    if(URLarr.length > 3 || URLarr[1] != 'person') {
      res.setHeader("Content-Type", 'text/plain');
      sendMessage(res, 404, "Incorrect URL");
    } else {
      const personId = URLarr.pop();
      const regexp =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      const requiredPerson = persons.find((person) => person.id === personId);
      if (!regexp.test(personId)) {
        res.setHeader("Content-Type", 'text/plain');
        sendMessage(res, 400, "Person Id format does not match  UUID");
      } else if (!requiredPerson) {
        res.setHeader("Content-Type", 'text/plain');
        sendMessage(res, 404, "The person with the given id was not found");
      } else {
        if (req.url === `/person/${personId}` && req.method === "GET") {
          sendMessage(
            res,
            200,
            JSON.stringify(requiredPerson)
          );
        } else if (req.url === `/person/${personId}` && req.method === "PUT") {
          let data = "";
          req.on("data", (chunk) => {
            data += chunk;
          });
          req.on("end", async () => {
            const newPersonData = JSON.parse(data);
            if (isFieldsValid(newPersonData)) {
              for (let key in newPersonData) {
                requiredPerson[key] = newPersonData[key];
              }
              sendMessage(
                res,
                200,
                JSON.stringify(requiredPerson)
              );
            } else {
              res.setHeader("Content-Type", 'text/plain');
              sendMessage(
                res,
                400,
                "The request body does not contain required fields or some fields is incorrect"
              );
            }
          });
        } else if (
          req.url === `/person/${personId}` &&
          req.method === "DELETE"
        ) {
          const index = persons.findIndex((person) => person.id === personId);
          persons.splice(index, 1);
          res.setHeader("Content-Type", 'text/plain');
          sendMessage(
            res,
            400,
            `Person ${personId} deleted`
          );
        } else {
          res.setHeader("Content-Type", 'text/plain');
          sendMessage(
            res,
            500,
            "Something went wrong"
          );
        }
      }
    }
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = server;
