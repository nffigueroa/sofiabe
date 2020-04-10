export const ResponseBodyBuilder = (status = 0, error = true, body = {}) => {
  return {
    status,
    error,
    body
  };
};