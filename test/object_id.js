const bson = require('../dist/lib/bson');

console.log(bson)


let id = null;
for(let i = 0; i < 10; i++) {
    id = new bson.ObjectID();
    console.log(id);
    console.log(id.toString());
    console.log('--------------');
}
