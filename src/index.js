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
      const personData = JSON.parse(data);
      if (!personData.name || typeof personData.name !== 'string'
       || !personData.age || typeof personData.age !== 'number'
       || !personData.hobbies || !Array.isArray(personData.hobbies)) {
        res.statusCode = 400;
        res.write('The request body does not contain required fields or some fields is incorrect');
      } else {
        const newPerson = {
          id: uuidv4(),
          ...personData,
        };
        persons.push(newPerson);
        res.statusCode = 201;
        res.write(JSON.stringify(newPerson));
      }
      res.end();
    });
  } else {
    const personId = req.url.split("/").pop();
    if (req.url === `/person/${personId}` && req.method === "GET") {
      const requiredPerson = persons.find((person) => person.id === personId);
      res.statusCode = 200;
      res.write(JSON.stringify(requiredPerson));
      res.end();
      /*
      Сервер возвращает статус код 400 и соответствующее сообщение,
      если personId невалиден (не uuid) плюс 6 баллов
      Сервер возвращает статус код 404 и соответствующее сообщение,
      если запись с id === personId не найдена плюс 6 баллов
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
