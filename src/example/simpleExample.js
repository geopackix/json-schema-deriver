const Schema = require('./../../build/app');

let jsObj = {
  UserId: "UUXX82620001",
  Name: "Benjamin",
  Properties:{
    Size: 1.85,
    Weight : 95,
    Age: 30
  },
  Skills: ["Cycling","Fishing","Skiing"]
}

let main = async () => {
  let jsonSchema = await Schema.deriveSchema(jsObj,'My Schema Name');
  console.log(jsonSchema)
}

main();