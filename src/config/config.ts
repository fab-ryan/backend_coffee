export default () => ({
  port: parseInt(process.env.PORT) || 4000,
  prefix: process.env.PREFIX || 'api',
});
