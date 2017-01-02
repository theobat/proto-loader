var protobuf = require('protobufjs')

var protoDefinition = require('./proto/test.proto') //require .proto entry point

console.log('ProtoDefinition\n')
console.log(protoDefinition)
console.log('\n\nProtoDefinition for Person\n')
console.log(protoDefinition.nested.Person);
console.log('\n\nProtoDefinition for js package\n')
console.log(protoDefinition.nested.js.nested);

var root = protobuf.Root.fromJSON(protoDefinition);

var protoValue = root.lookup("js.Value");
var protoPerson = root.lookup("Person");

var person = protoPerson.create({lastName: "V2",  firstName: "C2" });

console.log('\n\Constructed Person\n')

console.log(person)

var buffer = protoPerson.encode(person).finish();

console.log('\n\Encoded Person\n')
console.log(buffer)

console.log('\n\Decoded Person\n')
var decodedMess = protoPerson.decode(buffer);
console.log(decodedMess)


// Create a new message
var message = protoValue.create(person);

//alternatively use: 
//var valueAsBuffer = protoValue.encode({person: {lastName: "V2",  firstName: "C2" }}).finish();
var valueAsBuffer = protoValue.encode({person: person}).finish();

console.log('\n\Encoded Value\n')

console.log(valueAsBuffer)

var value = protoValue.decode(valueAsBuffer);

console.log('\n\Decoded Value\n')

console.log(value)

console.log('\n\Print First Name from decoded Value\n')
console.log(value.person.firstName)