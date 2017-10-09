// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/q2rental_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/q2rental_test'
  },

  production: {
    "client": "pg",
    "connection": process.env.DATABASE_URL
  }

};
