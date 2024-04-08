import connectDB from "../../db/db";
import { SignJWT } from "jose";
import { NextRequest } from "next/server";
import { UserModel } from "../../lib/db/model/users";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const SECRET_KEY = process.env.JWT_SECRET_KEY;
  await connectDB;
  try {
    if (email && password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({ email, password: hashedPassword });
      const user = await newUser.save();

      console.log(user);

      const token = await new SignJWT({ id: user._id })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1h")
        .sign(new TextEncoder().encode(SECRET_KEY));

      return Response.json(
        {
          message: "user registered",
          token: token,
        },
        {
          headers: {
            "set-cookie": `token=${token}; HttpOnly; Path=/; Max-Age=${
              4 * 60 * 60
            }; SameSite=Lax`,
          },
        }
      );
    } else {
      throw new Error("invalid creds");
    }
  } catch (error: any) {
    console.log(error);
    return Response.json({
      message: error.message,
    });
  }
}
