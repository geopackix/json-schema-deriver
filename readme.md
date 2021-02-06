# JSON-Schema-Deriver
Derives JSON-Schema from a given JSON Sample

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
  "name":"TestName",
  "property1" : 18.5,
  "NumberArray": [1,2,3,4,"Element"],
  "ObjectArray":[
    {
      "ObjectId":"A123"
    },
    {
      "ObjectId":"A458"
    }
  ]
}
```

### Derived JSON-Schema
```JSON
{
  "description": "Auto-Generated JSON Schema for JSON File (geokoord/json-schema-deriver)",
  "title": "JSON File",
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "$schema": {
      "type": "string",
      "examples": [
        "./sample.schema.json"
      ]
    },
    "name": {
      "type": "string",
      "examples": [
        "TestName"
      ]
    },
    "property1": {
      "type": "number",
      "examples": [
        18.5
      ]
    },
    "NumberArray": {
      "type": "array",
      "items": {
        "0": {
          "type": "number",
          "examples": [
            1
          ]
        },
        "1": {
          "type": "number",
          "examples": [
            2
          ]
        },
        "2": {
          "type": "number",
          "examples": [
            3
          ]
        },
        "3": {
          "type": "number",
          "examples": [
            4
          ]
        },
        "4": {
          "type": "string",
          "examples": [
            "Element"
          ]
        }
      }
    },
    "ObjectArray": {
      "type": "array",
      "items": {
        "0": {
          "type": "object",
          "properties": {
            "ObjectId": {
              "type": "string",
              "examples": [
                "A123"
              ]
            }
          }
        },
        "1": {
          "type": "object",
          "properties": {
            "ObjectId": {
              "type": "string",
              "examples": [
                "A458"
              ]
            }
          }
        }
      }
    }
  }
}
```

