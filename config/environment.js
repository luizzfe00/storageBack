const environment = {
  development: {
    API: {
      HOST: process.env.API_URL || 'localhost',
      PORT: process.env.API_PORT || 3002,
    },
    JWT_KEY: process.env.JWT_KEY || '',
  }
};

module.exports = environment[process.env.NODE_ENV || 'development'];