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
exports.initServerGraphql = void 0;
const http_1 = require("graphql-http/lib/use/http");
const koa_1 = __importDefault(require("koa"));
const config_1 = require("./config");
const schema_1 = require("./graphql/schema");
function initServerGraphql() {
    const app = new koa_1.default();
    const handler = (0, http_1.createHandler)({ schema: schema_1.schema });
    app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
        if (ctx.method === 'POST' && ctx.path === '/graphql') {
            ctx.respond = false;
            console.log('chega aqui');
            yield handler(ctx.req, ctx.res);
        }
        else {
            yield next();
        }
    }));
    app.listen(config_1.PORT, () => {
        console.log(`Server on ${config_1.PORT}`);
    });
}
exports.initServerGraphql = initServerGraphql;
