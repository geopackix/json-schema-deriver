"use strict";
//const schemaBuilder = ()=>{return deriveSchema};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveSchema = void 0;
/**
 * This function creats a new schema body
 */
function getNewSchema(name = "JSON File") {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let newSchema = {
                description: "Auto-Generated JSON Schema for " + name + " using json-schema-deriver (https://github.com/geopackix/json-schema-deriver)",
                title: name,
                additionalProperties: false,
                $schema: "http://json-schema.org/draft-04/schema#",
            };
            resolve(newSchema);
        });
    });
}
/**
 * This exported function creats a new schema body
 */
function deriveSchema(inObj, name = 'JSON File') {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let schemaHeader = yield getNewSchema(name);
                let schemaDefinitions = { definitions: {} };
                let schemaProperties = getObjectSchema(inObj, schemaDefinitions.definitions);
                //Concat Schema Header and Properties
                var schema = Object.assign({}, schemaHeader, schemaProperties, schemaDefinitions);
                resolve(schema);
            }
            catch (error) {
                reject(error);
            }
        }));
    });
}
exports.deriveSchema = deriveSchema;
/**
 * This function creats property schema for the given inObject
 */
function getObjectSchema(inObject, schemaDefinitions, parent) {
    let objectSchema = {};
    //Check Type of Object
    objectSchema.type = typeof inObject;
    if (parent) {
        objectSchema.description = 'Description of ' + parent;
    }
    if (objectSchema.type == 'object') {
        //Check if inObject is an array.
        if (Array.isArray(inObject)) {
            objectSchema.type = 'array';
        }
    }
    //In case of 'string' or 'number' extract example values.
    if (objectSchema.type == 'string' || objectSchema.type == 'number') {
        objectSchema.examples = [inObject];
    }
    //If type is 'object' or 'array' recusive call of function.
    if (objectSchema.type == 'array') {
        let reference = '#/definitions/' + parent + '-element';
        objectSchema.items = {
            $ref: reference
        };
        for (let item of inObject) {
            let definition = getObjectSchema(item, schemaDefinitions);
            let availableDefinitions = getDefinitionByName(reference, schemaDefinitions);
            if (availableDefinitions) {
                //Compare Schema
                let compDefinitions = getDefinitionByItem(item, schemaDefinitions);
                if (!compDefinitions) {
                    console.log('Found different kind of array elements in array ' + reference);
                    //schemaDefinitions[parent+'-element-1'] = definition;
                }
                else {
                    console.log('schema is already available');
                }
            }
            else {
                schemaDefinitions[parent + '-element'] = definition;
                schemaDefinitions[parent + '-element']["additionalProperties"] = false;
                console.log('Found new schema definition.');
            }
        }
        //Generic check all array elements
        /*for (let propertyName in inObject){
          objectSchema.items[propertyName] = getObjectSchema(inObject[propertyName], schemaDefinitions, propertyName);
        }*/
    }
    else if (objectSchema.type == 'object') {
        objectSchema.properties = {};
        for (let propertyName in inObject) {
            objectSchema.properties[propertyName] = getObjectSchema(inObject[propertyName], schemaDefinitions, propertyName);
        }
    }
    return objectSchema;
}
/**
 * Check if schema definition by name is already available
 */
function getDefinitionByName(name, schemaDefinitions) {
    //"name": "#/definitions/ObjectArray-element"
    let splitedDefinitionPath = name.split('#/definitions')[1].split('/');
    let definitionpath = "";
    for (let path of splitedDefinitionPath) {
        definitionpath += path;
    }
    return schemaDefinitions[definitionpath];
}
;
/**
 * Check if schema definition by name is already available
 */
function getDefinitionByItem(item, schemaDefinitions) {
    //extract child elements of object
    let itemChildTypes = getChildItemTypes(item);
    let itemChildNames = getChildItemNames(item);
    for (let def in schemaDefinitions) {
        let defItems = getChildItemTypesByDefinition(schemaDefinitions[def].properties);
        let defNames = getChildItemNames(schemaDefinitions[def].properties);
        let comp = compareArrays(itemChildTypes, defItems);
        let comp2 = compareArrays(itemChildNames, defNames);
        if (comp && comp2) {
            return def;
        }
    }
    return false;
}
;
function getChildItemTypes(item) {
    //extract child elements of object
    let items = [];
    for (let c in item) {
        items.push(typeof item[c]);
    }
    return items;
}
;
function getChildItemTypesByDefinition(item) {
    //extract child elements of object
    let items = [];
    for (let c in item) {
        items.push(item[c].type);
    }
    return items;
}
;
function getChildItemNames(item) {
    //extract child elements of object
    let itemNames = [];
    for (let c in item) {
        itemNames.push(c);
    }
    return itemNames;
}
;
/**
 * Compares two Arrays and returns true if they are equal.
 */
function compareArrays(A, B) {
    if (A.length == B.length) {
        for (let i = 0; i < A.length; i++) {
            if (A[i] != B[i]) {
                return false;
            }
        }
    }
    else {
        return false;
    }
    return true;
}
//# sourceMappingURL=app.js.map