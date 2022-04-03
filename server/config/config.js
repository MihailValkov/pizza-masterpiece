module.exports = {
  port: process.env.PORT || 3005,
  dbConnection: `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@db.exhqa.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  cookie_name: process.env.AUTH_COOKIE,
  jwt_secret: process.env.SECRET,
  rounds: Number(process.env.ROUNDS),
};
