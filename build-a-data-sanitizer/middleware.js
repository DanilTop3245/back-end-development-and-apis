function inputCleaner(req, res, next) {
  if (req.body && typeof req.body.username === "string") {
    req.body.username = req.body.username.toLowerCase();
  }

  if (req.body && typeof req.body.comment === "string") {
    req.body.comment = req.body.comment.replace(/<[^>]*>/g, "");
  }

  next();
}

function inputValidator(req, res, next) {
  const username = req.body && typeof req.body.username === "string"
    ? req.body.username
    : "";

  if (username.length >= 3) {
    next();
    return;
  }

  res.redirect("/form?error=Username%20must%20be%20at%20least%203%20characters.");
}

module.exports = {
  inputCleaner,
  inputValidator,
};