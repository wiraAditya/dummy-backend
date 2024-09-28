import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    res.status(401).json({ error: "Token tidak valid" });
  } else {
    verify(token, "$3mp4KM4mbu", (err, user) => {
      if (err) {
        res.status(401).json({ error: "Token tidak valid" });
      } else {
        next();
      }
    });
  }
}
