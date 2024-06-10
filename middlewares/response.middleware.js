const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  const errorData = (message) => ({ error: true, message });

  if (res.err) {
    const message = Array.isArray(res.err)
      ? res.err.join(", ")
      : res.err.message;
    return res.status(400).json(errorData(message));
  }
  res.status(200).json(res.data);
  next();
};

export { responseMiddleware };
