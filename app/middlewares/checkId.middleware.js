// Middleware to validate and sanitize the 'id' parameter in routes
export function checkId(req, res, next) {
  // Retrieve the id and convert it to an integer (base 10)
  const id = parseInt(req.params.id, 10);
  // The id must be a positive integer
  if (isNaN(id) || id <= 0) {
    res.status(400).json({error: "invalid ID (must be a positive integer)"});
    return; // Stop further processing if invalid
  }
  // Parse and assign the id back to req.params for controller use
  req.params.id = id;
  next(); // Continue to the next middleware
}