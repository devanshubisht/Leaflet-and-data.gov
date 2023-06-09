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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getRealTimeWeather = void 0;
var axios_1 = require("axios");
var TEMP = "air-temperature";
var RAINFALL = "rainfall";
var HUMIDITY = "relative-humidity";
var WINDDIR = "wind-direction";
var WINDSPEED = "wind-speed";
function getRealTimeWeather(type, datetime) {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, url, response, data_1, stationValues, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = "https://api.data.gov.sg/v1/environment/" + type;
                    url = "".concat(apiUrl, "?");
                    if (datetime) {
                        if (datetime.includes("T")) {
                            // Input is in the format YYYY-MM-DDTHH:mm:ss
                            url += "date_time=".concat(datetime);
                        }
                        else {
                            // Input is in the format YYYY-MM-DD
                            url += "date=".concat(datetime);
                        }
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1["default"].get(url)];
                case 2:
                    response = _a.sent();
                    data_1 = response.data;
                    stationValues = data_1.items.map(function (item) {
                        var timestamp = item.timestamp;
                        var readings = item.readings.map(function (reading) {
                            var station = data_1.metadata.stations.find(function (station) { return station.id === reading.station_id; });
                            return {
                                stationId: station.id,
                                stationName: station.name,
                                stationValue: reading.value,
                                stationLat: station.location.latitude,
                                stationLong: station.location.longitude
                            };
                        });
                        return { timestamp: timestamp, readings: readings };
                    });
                    // Printing the results
                    stationValues.forEach(function (entry) {
                        console.log("Timestamp: ".concat(entry.timestamp));
                        entry.readings.forEach(function (reading) {
                            console.log("StationID: ".concat(reading.stationId, ", Station: ").concat(reading.stationName, ", ").concat(type, ": ").concat(reading.stationValue, ", ").concat(reading.stationLat, ", ").concat(reading.stationLong));
                        });
                        console.log("------------------");
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    throw new Error(error_1.response && error_1.response.data
                        ? error_1.response.data.message
                        : error_1.message);
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getRealTimeWeather = getRealTimeWeather;
module.exports;
{
    getRealTimeWeather;
}
;
// const datetime1 = "2023-06-05T13:00:00";
// getRealTimeWeather(TEMP).catch((error) => {
//   console.error(error);
// });
