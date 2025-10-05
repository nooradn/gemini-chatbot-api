/**
 * Global error handling middleware
 */
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error response
  const error = {
    message: err.message || 'Internal server error',
    status: err.status || 500
  };

  // Don't leak error details in production
  if (process.env.NODE_ENV === 'production') {
    delete error.stack;
  }

  res.status(error.status).json({
    error: error.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};

/**
 * 404 handler for unmatched routes
 */
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
};