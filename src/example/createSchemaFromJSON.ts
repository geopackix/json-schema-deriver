import fs from 'fs'

import {schemaBuilder} from './../app'

(async () => {
  try {
    
    //Read arguments
    const inFile = process.argv[2]

    const outFile = inFile.split('.json')[0] + '.schema.json'

    console.log("Derive Schema from file " + inFile +'');

    //Read inFile
    let inJsObj = await readInFile(inFile);

    //Derive schema from inJSON
    let Schema = await schemaBuilder.deriveSchema(inJsObj);

    await writeSchemaFile(outFile,Schema);

    console.log('Successfully created JSON Schema.')
   
  } catch (e) {
      //Error output
      console.log(e);
  }
})();

/**
 * This function reads the inFile 
 */
async function readInFile(inFilePath:string){
  return new Promise((resolve, reject) => {
    fs.readFile(inFilePath, 'utf8' , (err, data) => {
        if (err) {
          reject(err);
        }
        
        let resultJsonObj:object = JSON.parse(data);
        resolve(resultJsonObj);
    })
  });
}

/**
 * This function writes the schema to a file
 */
async function writeSchemaFile(fileName:string,schemaObj:any){
  return new Promise((resolve, reject) => {
    
    let schemaJSON = JSON.stringify(schemaObj);
    
    fs.writeFile(fileName, schemaJSON, function (err) {
      if (err) return console.log(err);
      resolve(true);
    });
  });
}
