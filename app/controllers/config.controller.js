const { ConfigService } = require("../services/config.service");
const { RedisService } = require("../services/redis.service");

class ConfigController {
  constructor() {
    this.configService = new ConfigService();
    this.redisService = new RedisService();
  }

  getFat = async (req, res, next) => {
    // Read from cache
    const cacheConfig = await this.redisService.getJson("config");
    console.log("cacheConfig", cacheConfig);

    // Read from Mongo
    const data = await this.configService
      .getModel()
      .findById(process.env.CONFIG_FAT_ID);
    return res.status(200).json({
      success: true,
      data: data.value,
    });
  };

  postFat = async (req, res, next) => {
    // Insert to cache
    await this.redisService.setJson("config", {
      value: req.body.access_token,
    });

    // Insert to Mongo
    const data = await this.configService
      .getModel()
      .findById(process.env.CONFIG_FAT_ID)
      .updateOne({
        value: req.body.access_token,
      });
    return res.status(200).json({
      success: true,
      data: data.value,
    });
  };
}

module.exports = new ConfigController();
