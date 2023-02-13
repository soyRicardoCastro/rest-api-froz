import { Request, Response } from "express";
import { get } from "lodash";
import { CreateSessionInput } from "../schema/auth.schema";
import {
  findSessionById,
  signAccessToken,
  signRefreshToken,
} from "../service/auth.service";
import { findUserByEmail, findUserById } from "../service/user.service";
import { verifyJwt } from "../utils/jwt";

export async function createSessionHandler(
  req: Request<{}, {}, CreateSessionInput>,
  res: Response
) {
  const message = "Invalid email or password";
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) return res.status(400).send(message);

  const isValid = await user.validatePassword(password, user.password);
  if (!isValid) return res.status(400).send(message);

  // * sign a access token
  console.log("accessToken");
  const accessToken = signAccessToken(user);

  // * sign a refresh token
  const refreshToken = await signRefreshToken({ userId: user._id });

  // * send the tokens
  return res.send({
    accessToken,
    refreshToken,
  });
}

export async function login(
  req: Request<{}, {}, CreateSessionInput>,
  res: Response
) {
  try {
    const message = "Invalid email or password";
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) return res.status(400).send(message);

    const isValid = await user.validatePassword(password, user.password);

    if (!isValid) return res.status(400).send(message);

    return res.status(200).send(user);
  } catch (e) {
    console.log(e);
    return res.status(500).send("internal server error");
  }
}

export async function refreshAccessTokenHandler(req: Request, res: Response) {
  const refreshToken = get(req, "headers.x-refresh");

  const decoded = verifyJwt<{ session: string }>(
    refreshToken,
    "refreshTokenPublicKey"
  );

  if (!decoded) return res.status(401).send("Could not refresh access token");

  const session = await findSessionById(decoded.session);

  if (!session || !session.valid)
    return res.status(401).send("Could not refresh access token");

  const user = await findUserById(String(session.user));

  if (!user) return res.status(401).send("Could not refresh access token");

  const accessToken = signAccessToken(user);

  return res.send({ accessToken });
}
