module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: 'https://softdivisionasus.local',
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '08fa10a00f8bba4537ad2a5ac5ad362f'),
    },
  },
});
