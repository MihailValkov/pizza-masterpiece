function createErrorMessage(error) {
  return error.message.includes('Path')
    ? 'Please fullfil all fields!'
    : Object.values(error.errors)[0]?.properties?.message;
}

function errorHandler(error, res, req) {
  let message = 'Something went wrong!';
  if (error instanceof TypeError || error.name == 'MongoError') {
    res.status(500).json({ message });
  } else if (error.name === 'CastError') {
    message = error.message;
    res.status(500).json({ message });
  } else if (error.http_code === 400 && error.name === 'Error') {
    message = error.message;
    res.status(400).json({ message });
  } else {
    message = createErrorMessage(error);
    res.status(400).json({ message });
  }
  console.log(`${req.method} >> ${req.baseUrl}: ${message}`);
}

module.exports = {
  errorHandler,
};
