"use strict";
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
exports.schemaBuilder = void 0;
const schemaBuilder = function () {
    return deriveSchema;
};
exports.schemaBuilder = schemaBuilder;
module.exports = exports.schemaBuilder;
/**
 * This function creats a new schema body
 */
function getNewSchema(name = "JSON File") {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let newSchema = {
                description: "Auto-Generated JSON Schema for " + name + " using json-schema-deriver (https://github.com/geokoord/json-schema-deriver)",
                title: name,
                additionalProperties: false,
                $schema: "http://json-schema.org/draft-04/schema#",
            };
            resolve(newSchema);
        });
    });
}
/**
 * This function creats a new schema body
 */
function deriveSchema(inObj) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let schemaHeader = yield getNewSchema();
            let schemaProperties = getObjectSchema(inObj);
            var schema = Object.assign({}, schemaHeader, schemaProperties);
            resolve(schema);
        }));
    });
}
/**
 * This function creats property schema for the given inObject
 */
function getObjectSchema(inObject) {
    let objectSchema = {};
    //Check Type of Object
    objectSchema.type = typeof inObject;
    if (Array.isArray(inObject)) {
        objectSchema.type = 'array';
    }
    if (objectSchema.type == 'string' || objectSchema.type == 'number') {
        objectSchema.examples = [inObject];
    }
    //Check if Object Type is Array
    if (objectSchema.type == 'array') {
        objectSchema.items = {};
        for (let propertyName in inObject) {
            objectSchema.items[propertyName] = getObjectSchema(inObject[propertyName]);
        }
    }
    else if (objectSchema.type == 'object') {
        objectSchema.properties = {};
        for (let propertyName in inObject) {
            objectSchema.properties[propertyName] = getObjectSchema(inObject[propertyName]);
        }
    }
    return objectSchema;
}
//# sourceMappingURL=app.js.map