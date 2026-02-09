module.exports = (err, req, res, next) => {
  const time = new Date().toISOString();
  console.error(`[${time}] ${req.method} ${req.originalUrl}`);
  console.error(err.stack || err.message);
  next(err);
};
