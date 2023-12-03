export default () => ({
  port: parseInt(process.env.PORT) || 4000,
  prefix: process.env.PREFIX || 'api',
  FALLBACK_LANGUAGE: process.env.FALLBACK_LANGUAGE || 'en',
  jwt_salt_round: parseInt(process.env.JWT_SALT_ROUND) || 10,
});
