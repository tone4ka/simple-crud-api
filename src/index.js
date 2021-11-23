require("dotenv").config();
const http = require("http");
const { v4: uuidv4 } = require("uuid");

const persons = [];

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Transfer-Encoding", "chunked");

  if (req.url === "/person" && req.method === "GET") {
    res.statusCode = 200;
    res.write(JSON.stringify(persons));
    res.end();
  } else if (req.url === "/person" && req.method === "POST") {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", async () => {
      const newPerson = {
        id: uuidv4(),
        ...JSON.parse(data),
      };
      persons.push(newPerson);
      res.statusCode = 201;
      res.write(JSON.stringify(newPerson));
      console.log(JSON.stringify(newPerson));
      res.end();
    });
    /*
    Сервер возвращает статус код 400 и соответствующее сообщение, если тело запроса не содержит обязательных полей плюс 6 баллов
    */
  } else {
    const personId = req.url.split("/").pop();
    if (req.url === `/person/${personId}` && req.method === "GET") {
      const requiredPerson = persons.find((person) => person.id === personId);
      res.statusCode = 200;
      res.write(JSON.stringify(requiredPerson));
      res.end();
      /*
      Сервер возвращает статус код 400 и соответствующее сообщение, если personId невалиден (не uuid) плюс 6 баллов
      Сервер возвращает статус код 404 и соответствующее сообщение, если запись с id === personId не найдена плюс 6 баллов
      */
    } else if (req.url === `/person/${personId}` && req.method === "PUT") {
      /*
      Сервер возвращает статус код 200 и обновленную запись плюс 10 баллов
      Сервер возвращает статус код 400 и соответствующее сообщение, если personId невалиден (не uuid) плюс 6 баллов
      Сервер возвращает статус код 404 и соответствующее сообщение, если запись с id === personId не найдена плюс 6 баллов
      */
    } else if (req.url === `/person/${personId}` && req.method === "DELETE ") {
      /*
      Сервер возвращает статус код 204 если запись найдена и удалена плюс 10 баллов
      Сервер возвращает статус код 400 и соответствующее сообщение, если personId невалиден (не uuid) плюс 6 баллов
      Сервер возвращает статус код 404 и соответствующее сообщение, если запись с id === personId не найдена плюс 6 баллов
      */
    }
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
