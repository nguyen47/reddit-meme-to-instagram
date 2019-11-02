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
        while (_) try {
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
var reddit_1 = require("./reddit");
var instagram_1 = require("./instagram");
var fs = require("fs");
var download = require("download");
var path = require("path");
var Jimp = require("jimp");
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var today, date, time, dateTime, randomReddit, url, name, description, downloadImage, readJpg, downloadImage, readPng;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    today = new Date();
                    date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
                    time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    dateTime = date + " " + time;
                    return [4 /*yield*/, reddit_1.getRandomPostFromSubredditMeme()];
                case 1:
                    randomReddit = _a.sent();
                    url = randomReddit.url;
                    name = randomReddit.name;
                    description = randomReddit.title + " \nAuthor: " + randomReddit.author.name;
                    if (!(url.split(".").pop() == "jpg")) return [3 /*break*/, 7];
                    return [4 /*yield*/, download(url)];
                case 2:
                    downloadImage = _a.sent();
                    return [4 /*yield*/, fs.writeFileSync("./images/" + name + ".jpg", downloadImage)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, Jimp.read("./images/" + name + ".jpg")];
                case 4:
                    readJpg = _a.sent();
                    // The Instagram Private APi aspect the ratio
                    return [4 /*yield*/, readJpg.resize(500, 500, Jimp.RESIZE_BEZIER)];
                case 5:
                    // The Instagram Private APi aspect the ratio
                    _a.sent();
                    return [4 /*yield*/, instagram_1.postImageToInstagram("./images/" + name + ".jpg", description)];
                case 6:
                    _a.sent();
                    // Delete the image after upload
                    fs.unlinkSync(path.join("images/" + name + ".jpg"));
                    console.log("Posted status at " + dateTime);
                    return [3 /*break*/, 13];
                case 7: return [4 /*yield*/, download(url)];
                case 8:
                    downloadImage = _a.sent();
                    return [4 /*yield*/, fs.writeFileSync("./images/" + name + ".png", downloadImage)];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, Jimp.read("./images/" + name + ".png")];
                case 10:
                    readPng = _a.sent();
                    return [4 /*yield*/, readPng
                            .resize(500, 500, Jimp.RESIZE_BEZIER)
                            .writeAsync("./images/" + name + ".jpg")];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, instagram_1.postImageToInstagram("./images/" + name + ".jpg", description)];
                case 12:
                    _a.sent();
                    // Delete all files
                    fs.unlinkSync(path.join("images/" + name + ".jpg"));
                    fs.unlinkSync(path.join("images/" + name + ".png"));
                    console.log("Posted status at " + dateTime);
                    _a.label = 13;
                case 13: return [2 /*return*/];
            }
        });
    });
})();
