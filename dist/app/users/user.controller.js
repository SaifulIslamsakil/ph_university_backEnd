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
exports.userController = void 0;
const user_service_1 = require("./user.service");
const studentCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentData = req.body;
        const { password } = studentData;
        console.log(password);
        const result = yield user_service_1.userSevice.creatStudenIntoDB(password, studentData);
        res.status(200).json({
            success: true,
            messege: "student post done",
            data: result
        });
    }
    catch (error) {
        console.log(error);
        // res.status(500).json({
        //     success : false,
        //     messege : "student post wrong",
        //     data : error
        // })
    }
});
exports.userController = {
    studentCreate
};
