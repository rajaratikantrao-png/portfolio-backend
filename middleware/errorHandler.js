// Lets us write async routes without try/catch everywhere
export const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

export function notFound(req, res) {
  res.status(404).json({ ok: false, message: "Route not found" });
}

export function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  if (err.type === "entity.parse.failed") return res.status(400).json({ ok: false, message: "Invalid JSON in request body" });
  if (err.type === "entity.too.large") return res.status(413).json({ ok: false, message: "Request is too large" });
  if (err.name === "ValidationError" || err.name === "CastError") return res.status(400).json({ ok: false, message: "Invalid data" });

  console.error(err);
  res.status(500).json({ ok: false, message: "Something went wrong on the server" });
}
