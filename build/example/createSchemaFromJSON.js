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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const app_1 = require("./../app");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Read arguments
        const inFile = process.argv[2];
        const outFile = inFile.split('.json')[0] + '.schema.json';
        console.log("Derive Schema from file " + inFile + '');
        //Read inFile
        let inJsObj = yield readInFile(inFile);
        //Derive schema from inJSON
        let Schema = yield app_1.schemaBuilder.deriveSchema(inJsObj);
        yield writeSchemaFile(outFile, Schema);
        console.log('Successfully created JSON Schema.');
    }
    catch (e) {
        //Error output
        console.log(e);
    }
}))();
/**
 * This function reads the inFile
 */
function readInFile(inFilePath) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile(inFilePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                }
                let resultJsonObj = JSON.parse(data);
                resolve(resultJsonObj);
            });
        });
    });
}
/**
 * This function writes the schema to a file
 */
function writeSchemaFile(fileName, schemaObj) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let schemaJSON = JSON.stringify(schemaObj);
            fs_1.default.writeFile(fileName, schemaJSON, function (err) {
                if (err)
                    return console.log(err);
                resolve(true);
            });
        });
    });
}
//# sourceMappingURL=createSchemaFromJSON.js.map