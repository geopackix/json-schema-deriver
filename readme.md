# JSON-Schema-Deriver
Derives JSON-Schema from a given JSON Sample

## Motivation
This tool allows to derive a JSON schema from any given JSON object.
It allows you to quickly specify JSON schemas using sample data.

## Installation
```
npm install json-schema-deriver
```

## Usage

Using a given JS Object
```js
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
```
Synchronous
```js
const Schema = require('json-schema-deriver');

[...] 

let jsonSchema = await Schema.deriveSchema(jsObj,'My Schema Name');
console.log(jsonSchema)




```

Asynchronous
```js
let jsonSchema = Schema.deriveSchema(jsObj,'My Schema Name')
.then(schema=>{
  console.log(schema)
});
```


## Derive JSON Schema from sample JSON
run the following command to derive JSON schema from input JSON file.
```
node .\build\example\createSchemaFromJSON.js .\sampleFiles\sampleBattery.json
```

## Sample Data

### JSON
```JSON
{
  "$schema":"./sample.schema.json",
  "name":"SchemaDeriverName",
  "numberProp" : 18.5,
  "NumberArray": [1,2,3,4],
  "ObjectArray":[
    {
      "ObjectId":"7B3",
      "InnerObjectArray":[
        {
          "name":"TestName",
          "property1" : "18.5"
          
        }
      ],
      "InnerStringArray":["1","2","3"]
    },
    {
      "ObjectId":"7B3"
    }
  ]
}
```

### Derived JSON-Schema
```JSON
{
  "description": "Auto-Generated JSON Schema for JSON File using json-schema-deriver (https://github.com/geopackix/json-schema-deriver)",
  "title": "JSON File",
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "$schema": {
      "type": "string",
      "description": "Description of $schema",
      "examples": [
        "./sample.schema.json"
      ]
    },
    "name": {
      "type": "string",
      "description": "Description of name",
      "examples": [
        "SchemaDeriverName"
      ]
    },
    "numberProp": {
      "type": "number",
      "description": "Description of numberProp",
      "examples": [
        18.5
      ]
    },
    "NumberArray": {
      "type": "array",
      "description": "Description of NumberArray",
      "items": {
        "type": "number"
      }
    },
    "ObjectArray": {
      "type": "array",
      "description": "Description of ObjectArray",
      "items": {
        "$ref": "#/definitions/ObjectArray-element"
      }
    }
  },
  "definitions": {
    "InnerObjectArray-element": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "Description of name",
          "examples": [
            "TestName"
          ]
        },
        "property1": {
          "type": "string",
          "description": "Description of property1",
          "examples": [
            "18.5"
          ]
        }
      },
      "additionalProperties": false
    },
    "ObjectArray-element": {
      "type": "object",
      "properties": {
        "ObjectId": {
          "type": "string",
          "description": "Description of ObjectId",
          "examples": [
            "7B3"
          ]
        },
        "InnerObjectArray": {
          "type": "array",
          "description": "Description of InnerObjectArray",
          "items": {
            "$ref": "#/definitions/InnerObjectArray-element"
          }
        },
        "InnerStringArray": {
          "type": "array",
          "description": "Description of InnerStringArray",
          "items": {
            "type": "string"
          }
        }
      },
      "additionalProperties": false
    }
  }
}
```

