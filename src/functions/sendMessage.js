function sendMessage(res, statusCode, msg) {
  res.statusCode = statusCode;
  res.write(msg);
  res.end();
};

module.exports = sendMessage;
