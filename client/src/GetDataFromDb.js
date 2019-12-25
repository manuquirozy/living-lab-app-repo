const GetDataFromDbClass = require('./GetDataFromDb.class');
let GetDataFromDb;

module.exports = function() {
    GetDataFromDb = GetDataFromDb || new GetDataFromDbClass();
    return GetDataFromDb;
};