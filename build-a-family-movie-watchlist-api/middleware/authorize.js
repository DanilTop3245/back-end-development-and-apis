export function authorizeModification(req, res, next) {
  const { user, params = {} } = req;
  const requestedUserId = String(params.userId);
  const currentUserId = String(user?.id ?? "");

  if (
    user?.role !== "parent" &&
    !(user?.role === "child" && currentUserId === requestedUserId)
  ) {
    return res.status(403).json({ error: "Access denied" });
  }

  return next();
}
