const fs = require('fs');
const { faker } = require('@faker-js/faker');

fs.appendFileSync('data.json', '[');

function createUser(numb: Number) {
    return {
        id: numb,
        name: faker.person.firstName(),
        surname: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number('+380 ## ### ## ##'),
        date: faker.date.birthdate()
    }
}

for (let i = 1; i <= 45; i++) {
    fs.appendFileSync('data.json', JSON.stringify(createUser(i), null, "\t"));
    fs.appendFileSync('data.json', ',');
}

fs.appendFileSync('data.json', ']');