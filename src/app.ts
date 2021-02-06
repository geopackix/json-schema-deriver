
//const schemaBuilder = ()=>{return deriveSchema};

/**
 * This function creats a new schema body
 */
async function getNewSchema(name:string = "JSON File"){
  return new Promise((resolve, reject) => {
    let newSchema = {
      description: "Auto-Generated JSON Schema for "+ name + " using json-schema-deriver (https://github.com/geopackix/json-schema-deriver)",
      title: name,
      additionalProperties: false,
      $schema: "http://json-schema.org/draft-04/schema#",
    }
    resolve(newSchema);
  });
}


/**
 * This exported function creats a new schema body 
 */
export async function deriveSchema(inObj, name:string = 'JSON File'){
  return new Promise(async (resolve, reject) => {

    let schemaHeader = await getNewSchema(name);

    let schemaProperties = getObjectSchema(inObj);

    var schema = Object.assign({}, schemaHeader, schemaProperties);
    
    resolve(schema);
  });
}

/**
 * This function creats property schema for the given inObject
 */
function getObjectSchema(inObject){
 
  let objectSchema:any = {}

  //Check Type of Object
  objectSchema.type =  typeof inObject;

  if(Array.isArray(inObject)){
    objectSchema.type = 'array';
  }

  if(objectSchema.type == 'string' || objectSchema.type == 'number'){
    objectSchema.examples = [inObject]
  }
  
  //Check if Object Type is Array
  if(objectSchema.type == 'array'){
    objectSchema.items = {};
    for (let propertyName in inObject){
      objectSchema.items[propertyName] = getObjectSchema(inObject[propertyName]);
    }
  }else if(objectSchema.type == 'object'){
    objectSchema.properties = {};
    for (let propertyName in inObject){
      objectSchema.properties[propertyName] = getObjectSchema(inObject[propertyName]);
    }
  }

  return objectSchema
}