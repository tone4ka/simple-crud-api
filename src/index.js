require('dotenv').config();
const { appendFile } = require('fs');
const http = require('http');
const { v4: uuidv4 } = require('uuid');

const persons = [];

const server = http.createServer((req,res) => {
  res.setHeader('Content-Type', 'application/json');
  if(req.url === '/person' && req.method === 'GET'){
  res.statusCode =200;
  res.write(JSON.stringify(persons));
  } else if(req.url === '/person/{personId}' && req.method === 'GET') {

  } else if(req.url === '/person' && req.method === 'POST') {
    let data = '';
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on('end', async () => {
      console.log(data);
      const newPerson = {
      id: uuidv4(),
      ...JSON.parse(data)
    };
    console.log(JSON.stringify(newPerson));
    persons.push(newPerson);
    res.statusCode =201;
    res.write(JSON.stringify(newPerson));
    });

  } else if(req.url === '/person/{personId}' && req.method === 'PUT') {

  } else if(req.url === '/person/{personId}' && req.method === 'DELETE ') {

  }

  res.end();
console.log('123');
});


const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
