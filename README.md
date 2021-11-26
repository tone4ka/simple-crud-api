# simple-crud-api

#### Enter the ***npm i*** command in the command line

#### To run the application on the development mode, enter the ***npm run start:dev*** command in the command line

#### To run the application on the production mode, enter the ***npm run start:prod*** command in the command line. After that you also can see ***app.js*** file in a folder named ***build***.

#### To send requests (JSON) to this server use Postman with url ***http://localhost:5000***

##### API path /person:

GET /person or /person/${personId} should return all persons or person with corresponding personId
POST /person is used to create record about new person and store it in database
PUT /person/${personId} is used to update record about existing person
DELETE /person/${personId} is used to delete record about existing person from database

#### Persons are stored as objects that have following properties:

id — unique identifier (string, uuid) generated on server side
name — person's name (string, required)
age — person's age (number, required)
hobbies — person's hobbies (array of strings or empty array, required)

#### To run tests, enter the ***npm run test*** command in the command line

#### To see coverage, enter the ***npm run coverage*** command in the command line

#### The implementation of the scenarios can be viewed in the file index.test.js in the test folder
