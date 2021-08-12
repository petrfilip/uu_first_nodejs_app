const {UuBinaryDao} = require("uu_appg01_binarystore");

class JokeImageMongo extends UuBinaryDao {
  async createSchema() {
    await super.createIndex({awid: 1, _id: 1}, {unique: true});
    await super.createIndex({awid: 1, code: 1}, {unique: true});
  }

  async create(uuBinary, data) {
    return await super.insertFromStream(uuBinary, data);
  }

  async updateByCode(awid, code, data, revisionStrategy) {
    let filter = {
      awid: awid,
      code: code,
    };
    return await super.updateFromStream(filter, {awid}, data, false, revisionStrategy);
  }

  async deleteByCode(awid, code) {
    return await super.deleteOne({awid, code});
  }

  async getDataByCode(awid, code) {
    return await super.openDownloadStream({
      awid: awid,
      code: code,
    });
  }
}

module.exports = JokeImageMongo;
