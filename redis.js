const Redis = require("ioredis");

const redis = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWORD,
  tls: {}, // Sử dụng TLS nếu cần
  maxRetriesPerRequest: null, // Vô hiệu hóa giới hạn retry (có thể xem xét lại tùy nhu cầu)
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000); // Chiến lược retry với thời gian chờ tăng dần
    return delay;
  },
});

redis.on('connect', () => {
  console.log('Redis connected');
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
  // Bạn có thể thêm logic xử lý lỗi ở đây, ví dụ gửi cảnh báo hoặc cố gắng kết nối lại sau một thời gian
});

module.exports = redis;
