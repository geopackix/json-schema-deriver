const Schema = require('./../../build/app');

(async () => {
  let jsonSchema = await Schema.deriveSchema({
    Name: "HelloWorld",
    Age: 30,
    Properties:{
      Size: {test:123},
      OptionId : "66askdhu816273"
    },
    Array: [1,2,3]
  },'my test schema');

  console.log(JSON.stringify(jsonSchema))
})();