function sendMessage(res, statusCode, message) {
  res.statusCode = statusCode;
  res.write(message);
  res.end();
};

module.exports = sendMessage;
