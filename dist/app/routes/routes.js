"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../../app"));
const allRoute = [
    {
        path: "/",
        fileName: "any"
    }
];
allRoute.forEach(route => app_1.default.use(route.path, route.fileName));
