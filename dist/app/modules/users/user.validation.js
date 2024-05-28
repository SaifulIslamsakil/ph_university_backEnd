"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    password: zod_1.z.string({
        invalid_type_error: "password must be string"
    }).max(20, { message: "password can be more then 20 chatetars" }).optional(),
});
exports.default = userValidationSchema;
