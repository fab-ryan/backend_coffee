export default () => ({
  port: parseInt(process.env.PORT) || 4000,
  prefix: process.env.PREFIX || 'api',
  FALLBACK_LANGUAGE: process.env.FALLBACK_LANGUAGE || 'en',
  jwt_salt_round: parseInt(process.env.JWT_SALT_ROUND) || 10,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expires_in: process.env.JWT_EXPIRES_IN,
  type_schema: process.env.TYPE_SCHEMA || 'http',
  jwt_encoding: process.env.JWT_ENCODING || 'none',
});
