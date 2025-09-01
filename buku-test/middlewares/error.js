export function notFound(req, res) {
  res.status(404),json({ status: 'error', message: 'endpoint not found'})
}

export function errorHandler(err, req, res, next) {
  console.log(err);
  const code = err.statusCode || 500;
  res.status(code).json({
    status: 'error',
    message: err.message || 'internal server error'
  })
}