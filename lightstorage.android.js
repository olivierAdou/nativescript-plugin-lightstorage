"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lightstorage_common_1 = require("./lightstorage.common");
var fs = require("tns-core-modules/file-system");
var Lightstorage = (function (_super) {
    __extends(Lightstorage, _super);
    function Lightstorage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Lightstorage.prototype.get = function (reference) {
        return new Promise(function (resolve, reject) {
            createJson.getItem(reference).then(function (res) {
                resolve(res);
            }).catch(function (e) {
                reject(e);
            });
        });
    };
    Lightstorage.prototype.mergeItem = function (object1, object, overwrite) {
        for (var p in object) {
            if (!overwrite) {
                if (object1.hasOwnProperty(p) && typeof object1[p] !== "undefined") {
                    this.mergeItem(object1[p], object[p]);
                }
                else {
                    object1[p] = object[p];
                }
            }
            else {
                object1[p] = object[p];
            }
        }
        return object1;
    };
    Lightstorage.prototype.set = function (reference, data, overwrite) {
        return new Promise(function (resolve, reject) {
            if (reference.split('/').length > 2) {
                throw new Error("Depth of field accepted maximum is 2");
            }
            ;
            if (reference.split('/').length <= 1) {
                throw new Error("No key detect for this table");
            }
            ;
            var ref = Reference.split(reference);
            var file = Reference.getFile(reference);
            if (InitJsonDb.fileInit(ref._racine + Lightstorage.extension)) {
                var setTable = Array.isArray(data) ? data : [data];
                var value = createJson.imbricated(reference, setTable);
                file.writeText(JSON.stringify(value))
                    .then(function (result) {
                    file.readText()
                        .then(function (res) {
                        resolve(JSON.parse(res));
                    });
                });
            }
        });
    };
    Lightstorage.prototype.update = function (reference, data) {
        return new Promise(function (resolve, reject) {
            var ref = Reference.split(reference);
            if (InitJsonDb.fileInit(ref._racine + Lightstorage.extension)) {
                var file_1 = Reference.getFile(reference);
                file_1.readText()
                    .then(function (res) {
                    var value = {};
                    value = JSON.parse(res);
                    var split = reference.split('/');
                    var content;
                    var content2 = value;
                    var d = data;
                    var ln = split.length - 1;
                    var error = 0;
                    if (ln == 0) {
                        error++;
                        '';
                    }
                    if (ln == 2) {
                        content = content2[split[1]][split[2]];
                        if (Object.keys(data).length >= 1) {
                            for (var y = 0; y < Object.keys(data).length; y++) {
                                if (content.hasOwnProperty(Object.keys(data)[y]) && typeof content[Object.keys(data)[y]] !== "undefined") {
                                    content2[split[1]][split[2]][Object.keys(data)[y]] = d[Object.keys(data)[y]];
                                }
                                else {
                                    error++;
                                }
                            }
                        }
                    }
                    var result = (error > 0 && error <= Object.keys(data).length ? 'Table was not updated, no match found with the update list' : 'table successfully updated');
                    (error > 0 && error <= Object.keys(data).length ?
                        null :
                        file_1.writeText(JSON.stringify(content2)).then(function (result) { file_1.readText().then(function (res) { }); }));
                    resolve({ result: result });
                });
            }
            else {
                reject({ message: 'Table does not exit.' });
            }
        });
    };
    Lightstorage.prototype.delete = function (reference) {
        return new Promise(function (resolve, reject) {
            var ref = Reference.split(reference);
            if (InitJsonDb.fileInit(ref._racine + Lightstorage.extension)) {
                var file_2 = Reference.getFile(reference);
                var split_1 = reference.split('/');
                var ln_1 = split_1.length - 1;
                if (ln_1 == 0) {
                    file_2.remove().then(function (res) {
                        resolve({ result: 'File deleted successfully' });
                    });
                }
                else {
                    file_2.readText()
                        .then(function (res) {
                        var value = {};
                        value = JSON.parse(res);
                        var error = 0;
                        var objectObject = value;
                        var content2 = {};
                        for (var i = 1; i < split_1.length; i++) {
                            var content = objectObject[split_1[i - 1]];
                            content2 = content;
                        }
                        var rs = Array.isArray(content2);
                        if (ln_1 == 1) {
                            delete value[split_1[1]];
                        }
                        if (ln_1 == 2) {
                            if (rs == true) {
                                for (var i = 0; i < content2.length; i++) {
                                    if (i == parseInt(split_1[2])) {
                                        value[split_1[1]].splice(i, 1);
                                    }
                                }
                            }
                            else {
                                value[split_1[0]] = {};
                            }
                        }
                        file_2.writeText(JSON.stringify(value)).then(function (result) { file_2.readText().then(function (res) { }); });
                        resolve({ result: value });
                    });
                }
            }
            else {
                reject({ message: 'Table does not exit.' });
            }
        });
    };
    Lightstorage.prototype.push = function (reference, object) {
        return new Promise(function (resolve, reject) {
            var ref = Reference.split(reference);
            if (InitJsonDb.fileInit(ref._racine + Lightstorage.extension)) {
                var file_3 = Reference.getFile(reference);
                file_3.readText()
                    .then(function (res) {
                    var value = {};
                    value = JSON.parse(res);
                    var split = reference.split('/');
                    var ln = split.length - 1;
                    var rs = Array.isArray(value[split[1]]);
                    if (ln == 1) {
                        if (value.hasOwnProperty(split[1]) && typeof value[split[1]] !== "undefined") {
                            if (rs == true) {
                                value[split[1]][value[split[1]].length] = object;
                            }
                        }
                    }
                    file_3.writeText(JSON.stringify(value)).then(function (result) { file_3.readText().then(function (res) { resolve({ result: value }); }); });
                });
            }
            else {
                reject({ message: 'Table does not exit.' });
            }
        });
    };
    Lightstorage.extension = '.json';
    Lightstorage.folder = '/lightstorage';
    Lightstorage.folderInit = 'lightstorage';
    return Lightstorage;
}(lightstorage_common_1.Common));
exports.Lightstorage = Lightstorage;
var Reference = (function () {
    function Reference() {
    }
    Reference.split = function (reference) {
        var split = reference.split('/');
        var ln = split.length;
        return {
            '_racine': split[0],
            '_suffixe': ln > 1 ? split[ln - 1] : null,
            '_size': ln
        };
    };
    Reference.getFile = function (reference) {
        var ref = Reference.split(reference);
        var documentsFolder = fs.knownFolders.currentApp();
        var path = fs.path.join(documentsFolder.path + Lightstorage.folder, ref._racine + Lightstorage.extension);
        var file = fs.File.fromPath(path);
        return file;
    };
    return Reference;
}());
exports.Reference = Reference;
var InitJsonDb = (function () {
    function InitJsonDb() {
        this.folderInit();
    }
    InitJsonDb.prototype.folderInit = function () {
        var currentAppFolder = fs.knownFolders.currentApp();
        var path = fs.path.join(currentAppFolder.path, Lightstorage.folderInit);
        if (!fs.Folder.exists(path)) {
            currentAppFolder.getFolder(Lightstorage.folderInit);
        }
    };
    InitJsonDb.fileInit = function (filename) {
        var currentAppFolder = fs.knownFolders.currentApp();
        var path = fs.path.normalize((fs.path.join(currentAppFolder.path + Lightstorage.folder, filename)));
        return fs.File.exists(path);
    };
    return InitJsonDb;
}());
exports.InitJsonDb = InitJsonDb;
var createJson = (function () {
    function createJson() {
    }
    createJson.indexing = function (reference, element, value) {
        var splity = reference.split('/');
        var content;
        if ((splity.length - 1) == 1) {
            element[splity[0]];
        }
        if ((splity.length - 1) == 2) {
            element[splity[0]][splity[1]];
        }
        if ((splity.length - 1) == 3) {
            element[splity[0]][splity[1]][splity[2]];
        }
        if ((splity.length - 1) == 4) {
            element[splity[0]][splity[1]][splity[2]][splity[3]];
        }
    };
    createJson.imbricated = function (a, objects, AutoIncrementID) {
        if (AutoIncrementID === void 0) { AutoIncrementID = true; }
        if (a) {
            var splity_1 = a.split('/');
            splity_1[0] = splity_1[0] ? '' : splity_1[0];
            splity_1 = splity_1.filter(function (val) { if (val == '' || val == 'NaN' || val == undefined || val == null) {
                return false;
            } return true; });
            var stringi_1;
            if (splity_1.length > 0) {
                stringi_1 = '{';
            }
            var ar_1 = 0;
            if (splity_1 && objects) {
                if (AutoIncrementID == true) {
                    var tableau = [];
                    tableau = [objects];
                    tableau.forEach(function (element, keys) {
                        var id = keys;
                        Object.assign(element, { id: id + 1 });
                    });
                }
                splity_1.forEach(function (element, i) {
                    ar_1++;
                    var y = i;
                    if (i == 0 && element) {
                        if (splity_1[y] && splity_1[y] != '' && splity_1[y] != undefined) {
                            var strinftObject = JSON.stringify(objects);
                            var okaha = '":' + strinftObject;
                            var app = splity_1.length > 1 ? ('":{"' + splity_1[y + 1] + '"') : '' + okaha;
                            stringi_1 += '"' + element + app;
                            if (i == splity_1.length) {
                                var strinftObject_1 = JSON.stringify(objects);
                                stringi_1 += ':' + strinftObject_1;
                            }
                        }
                        else {
                            return;
                        }
                    }
                    else {
                        if (splity_1[y + 1] && splity_1[y + 1] != undefined) {
                            stringi_1 += ':{"' + splity_1[y + 1] + '"';
                        }
                        else {
                            var strinftObject = JSON.stringify(objects);
                            stringi_1 += ':' + strinftObject;
                        }
                    }
                });
            }
            else {
                throw new Error("parameter incorrect");
            }
            if (splity_1.length > 0) {
                for (var o = 0; o < ar_1; o++) {
                    stringi_1 += '}';
                }
            }
            else {
                throw new Error("parameter incorrect");
            }
            var obj = JSON.parse(stringi_1);
            return obj;
        }
        else {
            throw new Error("Format incorrect, please use this format john/alber");
        }
    };
    createJson.getItem = function (reference) {
        return new Promise(function (resolve, reject) {
            var splity;
            var filter = createJson.filter(reference);
            if (filter.length >= 1) {
                splity = reference.split('{')[0].split('/');
            }
            else {
                splity = reference.split('/');
            }
            if (InitJsonDb.fileInit(splity[0] + Lightstorage.extension)) {
                var documentsFolder = fs.knownFolders.currentApp();
                var path = fs.path.join(documentsFolder.path + Lightstorage.folder, splity[0] + Lightstorage.extension);
                var file = fs.File.fromPath(path);
                var value_1;
                file.readText().then(function (res) {
                    value_1 = JSON.parse(res);
                    splity = splity.filter(function (val) {
                        if (val == ' ' || val == '' || val == 'NaN' || val == undefined || val == null) {
                            return false;
                        }
                        return true;
                    });
                    if (splity.length > 1) {
                        var dir = splity[0];
                        var objectObject = value_1;
                        var content2 = {};
                        for (var i = 1; i < splity.length; i++) {
                            var content = objectObject[splity[i]];
                            objectObject = content;
                            content2 = content;
                            var operate = '';
                            if (i == splity.length - 2) {
                                operate = splity[i];
                                content2 = content;
                            }
                        }
                        if (filter.length >= 1) {
                            var rs = Array.isArray(content2);
                            var array = {};
                            if (rs == false) {
                                for (var i = 0; i < filter.length; i++) {
                                    var rp = filter[i].replace(' ', '');
                                    for (var y = 0; y < Object.keys(content2).length; y++) {
                                        if (rp == Object.keys(content2)[y]) {
                                            array[rp] = content2[rp];
                                        }
                                    }
                                }
                            }
                            else {
                                array = [];
                                for (var c = 0; c < content2.length; c++) {
                                    for (var i = 0; i < filter.length; i++) {
                                        var rp = filter[i].replace(' ', '');
                                        if (content2[c].hasOwnProperty(rp)) {
                                            var str = '{"' + rp + '" : "' + content2[c][rp] + '"}';
                                            if (i == 0) {
                                                array[c] = JSON.parse(str);
                                            }
                                            if (i > 0) {
                                                array[c][rp] = content2[c][rp];
                                            }
                                        }
                                    }
                                }
                            }
                            resolve(array);
                        }
                        else {
                            resolve(content2);
                        }
                    }
                    else {
                        resolve(value_1);
                    }
                });
            }
            else {
                resolve({ message: 'Table does not exit.' });
            }
        });
    };
    createJson.filter = function (reference) {
        var filter = reference.split('{');
        if (filter.length > 1) {
            var fl = filter[1].replace('}', '').split(':');
            if (fl[0].toLowerCase() != "filter") {
                throw new Error('Syntaxe error for filter detected, did you mean `filter`');
            }
            var rp = fl[1];
            var select = rp.split(',');
            return select;
        }
        else {
            return [];
        }
    };
    createJson.orderBy = function (order) {
        var sort = Object.keys(order);
        var cl = {};
        for (var i in order) {
            cl[i] = order[i];
            delete order[i];
        }
        sort.sort();
        for (var i_1 = 0; i_1 < sort.length; i_1++) {
            order[sort[i_1]] = cl[sort[i_1]];
        }
        for (var x in order) {
            console.log(x);
        }
    };
    return createJson;
}());
exports.createJson = createJson;
//# sourceMappingURL=lightstorage.android.js.map