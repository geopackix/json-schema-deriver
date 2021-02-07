
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
    try {
      let schemaHeader = await getNewSchema(name);

      let schemaDefinitions = {definitions:{}}

      let schemaProperties = getObjectSchema(inObj, schemaDefinitions.definitions);

      //Concat Schema Header and Properties
      var schema = Object.assign({}, schemaHeader, schemaProperties, schemaDefinitions);
      
      resolve(schema);
    } catch (error) {
      reject(error);
    }
    
  });
}

/**
 * This function creats property schema for the given inObject
 */
function getObjectSchema(inObject, schemaDefinitions?:any, parent?:string){
 
  let objectSchema:any = {}

  //Check Type of Object
  objectSchema.type =  typeof inObject;

  if(parent){
    objectSchema.description = 'Description of ' + parent;
  }
  
  if(objectSchema.type == 'object'){
    //Check if inObject is an array.
    if(Array.isArray(inObject)){
      objectSchema.type = 'array';
    }
  }
  
  //In case of 'string' or 'number' extract example values.
  if(objectSchema.type == 'string' || objectSchema.type == 'number'){
    objectSchema.examples = [inObject]
  }
  
  //If type is 'object' or 'array' recusive call of function.
  if(objectSchema.type == 'array'){
    
    let firstItem = inObject[0]

    if(typeof firstItem == 'object'){
      //Object Item
      let itemDefinition = getObjectSchema(firstItem, schemaDefinitions);

      

      let reference = null;

      let definitionName = getDefinitionByItem(itemDefinition.properties, schemaDefinitions);

      //Find matching definition for array items
      if(definitionName){
        //add reference
        reference = definitionName;
      }else{
        //create definition
        schemaDefinitions[parent+'-element'] = itemDefinition;
        schemaDefinitions[parent+'-element']["additionalProperties"] = false

        //add reference
        reference = '#/definitions/'+parent+'-element'
      }

      objectSchema.items = {
        $ref: reference
      };

    }else{
      //Simple Item
      objectSchema.items = {
        type: typeof firstItem
      };
    }



    
    
  }else if(objectSchema.type == 'object'){
    objectSchema.properties = {};
    for (let propertyName in inObject){
      objectSchema.properties[propertyName] = getObjectSchema(inObject[propertyName], schemaDefinitions, propertyName);
    }
  }

  return objectSchema
}

/**
 * Check if schema definition by name is already available
 */
function getDefinitionByItem(item:object, schemaDefinitions:object){

  //extract child elements of object
  let itemChildTypes = getChildItemTypesByDefinition(item);
  let itemChildNames = getChildItemNames(item);

  for(let def in schemaDefinitions){
    let defItems = getChildItemTypesByDefinition(schemaDefinitions[def].properties);
    let defNames = getChildItemNames(schemaDefinitions[def].properties);

    let comp = compareArrays(itemChildTypes, defItems);
    let comp2 = compareArrays(itemChildNames, defNames);
    
    if(comp && comp2){
      return '#/definitions/'+def;
    }
  }
  return false;
};


function getChildItemTypesByDefinition(item:object){
  //extract child elements of object
  let items = [];
  for(let c in item){
    items.push(item[c].type);
  }
  return items
};

function getChildItemNames(item:object){
  //extract child elements of object
  let itemNames = [];
  for(let c in item){
    itemNames.push(c);
  }
  return itemNames
};

/**
 * Compares two Arrays and returns true if they are equal.
 */
function compareArrays(A, B){
  if(A.length == B.length){
    for(let i = 0; i < A.length; i++){
      if(A[i] != B[i]){
        return false;
      }
    }
  }else{
    return false;
  }
  
  return true;
}


