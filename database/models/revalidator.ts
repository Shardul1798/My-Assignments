import * as revalidator from 'revalidator';

const socialMedialLinks = { FB: "fb", GOOGLE: "google", INSTAGRAM: "instagram" };
const businessHours = {
    "fri": { "allDay": false, "dayOff": false, "endTime": "7:00 pm", "startTime": "8:00 am" },
    "mon": { "allDay": false, "dayOff": false, "endTime": "7:00 pm", "startTime": "8:00 am" },
    "sat": { "allDay": false, "dayOff": false, "endTime": "", "startTime": "" },
    "sun": { "allDay": false, "dayOff": false, "endTime": "", "startTime": "" },
    "thu": { "allDay": false, "dayOff": false, "endTime": "7:00 pm", "startTime": "8:00 am" },
    "tue": { "allDay": false, "dayOff": false, "endTime": "7:00 pm", "startTime": "8:00 am" },
    "wed": { "allDay": false, "dayOff": false, "endTime": "7:00 pm", "startTime": "8:00 am" }
}
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

const returnJsonObjectForDatabaseValidation = (obj: object, type?: string, secondLevelObj?: object) => {
    let data: object = {};
    let defaultType: string;

    if (type) defaultType = type;
    else defaultType = 'string';

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
}

export const schemaValidator = function (schema) {
    return function (value) {
        var results = revalidator.validate(value, schema);
        if (!results.valid) throw new Error(JSON.stringify(results.errors));
    };
};