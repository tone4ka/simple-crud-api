const request = require("supertest");
const server = require('../src/index');

describe(`SUCCESS SCENARIO: GET /person => POST /person =>
GET /person/newPersonId => PUT /person/newPersonId => DELETE /person/newPersonId =>
GET /person/newPersonId`, () => {
  let personId;
  afterAll(() => {
    server.close();
  });
  test("It should respond with an empty array of persons and statusCode 200", async () => {
     await request(server).get("/person")
    .then((response) => {
      expect(response.body).toEqual([]);
      expect(response.statusCode).toBe(200);
    })
  });
  test("It should respond with add an new person and statusCode 201", async () => {
    await request(server)
    .post("/person")
    .send({
      "name": "Vasia",
      "age" : 27,
      "hobbies" : ["duck hunt"]
    })
    .then((newPerson) => {
      expect(newPerson.body).toHaveProperty("id");
      expect(newPerson.body.name).toEqual("Vasia");
      expect(newPerson.statusCode).toBe(201);
      personId = newPerson.body.id;
    })
  });
  test("It should respond with the previously created person and statusCode 200", async () => {
    await request(server)
    .get(`/person/${personId}`)
    .set('Accept', 'application/json')
    .then((previouslyCreatedPerson) => {
      expect(previouslyCreatedPerson.body.name).toEqual("Vasia");
      expect(previouslyCreatedPerson.statusCode).toBe(200);
    })
  });
  test("It should respond with the previously created person and statusCode 200", async () => {
    await request(server)
    .put(`/person/${personId}`)
    .send({
      "name": "Vasily Ivanovich",
      "age" : 120,
      "hobbies" : ["duck hunt"]
    }).then((previouslyCreatedPerson) => {
      expect(previouslyCreatedPerson.body.name).toEqual("Vasily Ivanovich");
      expect(previouslyCreatedPerson.statusCode).toBe(200);
    })

  });
  test("It should respond with the deleted person and statusCode 400", async () => {
    await request(server).delete(`/person/${personId}`)
    .then((previouslyDeletedPerson) => {
    expect(previouslyDeletedPerson.error.text).toEqual(`Person ${personId} deleted`);
    expect(previouslyDeletedPerson.statusCode).toBe(400);
  });
});
  test("It should respond the message 'The person with the given id was not found' and statusCode 404", async () => {
    await request(server).get(`/person/${personId}`)
    .then((previouslyCreatedPerson) => {
      expect(previouslyCreatedPerson.error.text).toEqual('The person with the given id was not found');
      expect(previouslyCreatedPerson.statusCode).toBe(404);
    })
  });
});

describe(`ERROR SCENARIO: GET /some/non/existing/resource `, () => {
  test("It should respond with the 'Incorrect URL' message and statusCode 404", async () => {
     await request(server).get("/some/non/existing/resource")
    .then((response) => {
      expect(response.error.text).toEqual("Incorrect URL");
      expect(response.statusCode).toBe(404);
    });
    server.close();
  });
});

describe(`ERROR SCENARIO: GET /person/1111 `, () => {
  test("It should respond with the 'Person Id format does not match  UUID' message and statusCode 400", async () => {
     await request(server).get("/person/1111")
    .then((response) => {
      expect(response.error.text).toEqual("Person Id format does not match  UUID");
      expect(response.statusCode).toBe(400);
    });
    server.close();
  });
});
