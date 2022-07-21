class RedisService {
  async setJson(key, value) {
    await redis.set(`${process.env.APP_NAME}_${key}`, JSON.stringify(value));
  }

  async getJson(key) {
    const cacheValue = await redis.get(`${process.env.APP_NAME}_${key}`);
    if (cacheValue === null) {
      return null;
    }
    return JSON.parse(cacheValue);
  }
}

module.exports = { RedisService };
