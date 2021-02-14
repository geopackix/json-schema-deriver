const Schema = require('./../../build/app');

let obj = {
  name: "json-schema-deriver",
  version: "1.0.6",
  description: "",
  main: "build/app.js",
  directories: {
    build: "build"
  },
  repository: {
    type: "git",
    url: "https://github.com/geopackix/json-schema-deriver"
  },
  scripts: {
    build: "tsc --build",
    start: "tsc --build && node ./build/example/createSchemaFromJSON.js"
  },
  author: "Geopackix (https://github.com/geopackix)",
  license: "MIT",
  devDependencies: {
    typescript: "^4.1.3"
  },
  keywords: [
    "json",
    "json-schema",
    "schema",
    "deriver"
  ]
}

let main = async () => {
  let jsonSchema = await Schema.deriveSchema(obj,'My Schema Name');
  console.log(jsonSchema)
  console.log(JSON.stringify(jsonSchema))
}

main();