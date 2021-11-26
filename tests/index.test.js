const request = require("supertest");
const server = require('../src/index');

describe("GET /person => POST /person => GET /person/newPersonId => PUT /person/newPersonId => DELETE /person/newPersonId => GET /person/newPersonId", () => {
  let personId;
  test("It should respond with an empty array of persons and statusCode 200", async () => {
    const response = await request(server).get("/person");
    expect(response.body).toEqual([]);
    expect(response.statusCode).toBe(200);
  });
  test("It should respond with add an new person and statusCode 201", async () => {
    const newPerson = await request(server)
    .post("/person")
    .send({
      "name": "Vasia",
      "age" : 27,
      "hobbies" : ["duck hunt"]
    });
    expect(newPerson.body).toHaveProperty("id");
    expect(newPerson.body.name).toEqual("Vasia");
    expect(newPerson.statusCode).toBe(201);
    personId = newPerson.body.id;
  });
  test("It should respond with the previously created person and statusCode 200", async () => {
    const previouslyCreatedPerson = await request(server)
    .get(`/person/${personId}`)
    .set('Accept', 'application/json');
    expect(previouslyCreatedPerson.body.name).toEqual("Vasia");
    expect(previouslyCreatedPerson.statusCode).toBe(200);
  });
  test("It should respond with the previously created person and statusCode 200", async () => {
    const previouslyCreatedPerson = await request(server)
    .put(`/person/${personId}`)
    .send({
      "name": "Vasily Ivanovich",
      "age" : 120,
      "hobbies" : ["duck hunt"]
    });;
    expect(previouslyCreatedPerson.body.name).toEqual("Vasily Ivanovich");
    expect(previouslyCreatedPerson.statusCode).toBe(200);
  });
  test("It should respond with the deleted person and statusCode 400", async () => {
    const previouslyCreatedPerson = await request(server).delete(`/person/${personId}`);
    expect(previouslyCreatedPerson.error.text).toEqual(`Person ${personId} deleted`);
    expect(previouslyCreatedPerson.statusCode).toBe(400);
  });
  test("It should respond the message 'The person with the given id was not found' and statusCode 404", async () => {
    const previouslyCreatedPerson = await request(server).delete(`/person/${personId}`);
    expect(previouslyCreatedPerson.error.text).toEqual('The person with the given id was not found');
    expect(previouslyCreatedPerson.statusCode).toBe(404);
  });
});
