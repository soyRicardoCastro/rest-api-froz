import { DocumentType } from "@typegoose/typegoose";
import { omit } from "lodash";
import SessionModel from "../model/session.model";
import { privateFields, User } from "../model/user.model";
import { signJwt } from "../utils/jwt";

export const createSession = async ({ userId }: { userId: string }) =>
  SessionModel.create({ user: userId });

export const findSessionById = async (id: string) => SessionModel.findById(id);

export const signRefreshToken = async ({ userId }: { userId: string }) => {
  const session = await createSession({ userId });

  const refreshToken = signJwt(
    {
      session: session._id,
    },
    "refreshTokenPrivateKey",
    {
      expiresIn: "1y",
    }
  );

  return refreshToken;
};

export const signAccessToken = async (user: DocumentType<User>) => {
  try {
    const payload = omit(user.toJSON(), privateFields);
    console.log(payload);

    const accessToken = signJwt(payload, "accessTokenPrivateKey", {
      expiresIn: "15m",
    });

    return accessToken;
  } catch (error) {
    console.error;
  }
};
