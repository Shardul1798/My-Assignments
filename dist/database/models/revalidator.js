"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaValidator = void 0;
const revalidator = __importStar(require("revalidator"));
const socialMedialLinks = { FB: "fb", GOOGLE: "google", INSTAGRAM: "instagram" };
const businessHours = {
    "fri": { "allDay": false, "dayOff": false, "endTime": "7:00 pm", "startTime": "8:00 am" },
    "mon": { "allDay": false, "dayOff": false, "endTime": "7:00 pm", "startTime": "8:00 am" },
    "sat": { "allDay": false, "dayOff": false, "endTime": "", "startTime": "" },
    "sun": { "allDay": false, "dayOff": false, "endTime": "", "startTime": "" },
    "thu": { "allDay": false, "dayOff": false, "endTime": "7:00 pm", "startTime": "8:00 am" },
    "tue": { "allDay": false, "dayOff": false, "endTime": "7:00 pm", "startTime": "8:00 am" },
    "wed": { "allDay": false, "dayOff": false, "endTime": "7:00 pm", "startTime": "8:00 am" }
};
const businessHrsMainKeys = { MONDAY: "mon", TUESDAY: "tue", WEDNESDAY: "wed", THURSDAY: "thu", FRIDAY: "fri", SATURDAY: "sat", SUNDAY: "sun" };
const businessHoursSubKeys = { ALL_DAY: "allDay", DAY_OFF: "dayOff", END_TIME: "endTime", START_TIME: "startTime" };
const businessHoursSubKeysJSONB = { allDay: { type: "boolean", required: true }, dayOff: { type: "boolean", required: true }, endTime: { type: "time", required: false }, startTime: { type: "time", required: false }, dayStartTime: { type: "number", required: false }, dayEndTime: { type: "number", required: false } };
const bsuinessPromotionJSONB = {
    fromDate: { type: "number", required: false },
    toDate: { type: "number", required: false },
    status: { type: "string", required: false },
    isPromoted: { type: "boolean", required: false },
    description: { type: "string", required: false },
    createdAt: { type: "date", required: false }
};
const returnJsonObjectForDatabaseValidation = (obj, type, secondLevelObj) => {
    let data = {};
    let defaultType;
    if (type)
        defaultType = type;
    else
        defaultType = 'string';
    if (secondLevelObj != undefined) {
        for (let item in obj) {
            data[obj[item]] = secondLevelObj;
        }
    }
    else {
        for (let item in obj) {
            data[obj[item]] = { type: defaultType, required: true };
        }
    }
    return data;
};
const schemaValidator = function (schema) {
    return function (value) {
        var results = revalidator.validate(value, schema);
        if (!results.valid)
            throw new Error(JSON.stringify(results.errors));
    };
};
exports.schemaValidator = schemaValidator;
