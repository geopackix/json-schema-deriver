var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Schema = require('./../app');
(() => __awaiter(this, void 0, void 0, function* () {
    let jsonSchema = yield Schema.deriveSchema({
        Name: "HelloWorld",
        Age: 30,
        Properties: {
            Size: { test: 123 },
            OptionId: "66askdhu816273"
        },
        Array: [1, 2, 3]
    }, 'my test schema');
    console.log(JSON.stringify(jsonSchema));
}))();
//# sourceMappingURL=simpleExample.js.map