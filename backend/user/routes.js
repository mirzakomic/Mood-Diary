import { Router } from "express";
import multer from "multer";
import User from "../models/userModel.js";
import { authenticateToken, generateAccessToken } from "./authToken.js";
import { createResetToken, validateResetToken } from "./ResetTokenModel.js";

export const userRouter = Router();

const multerMiddleware = multer();

const hoursInMillisec = (hours) => {
  return 1000 * 60 * 60 * hours;
};

userRouter.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

userRouter.post("/resetPassword", async (req, res) => {
  const { email } = req.body;
  try {
    console.log("reset password for ", email);
    await createResetToken(email);
    return res.sendStatus(200);
  } catch (e) {
    if (e?.message === "No User with this email") {
      return res.status(404).send({ error: "User not found" });
    }

    return res.status(500).send({ error: "Unknown Error occurred" });
  }
});

userRouter.post("/resetPassword-confirm", async (req, res) => {
  const { id, token, password } = req.body;
  const isValidResetProcess = validateResetToken(id, token);
  try {
    if (!isValidResetProcess) {
      throw new Error("NonValidResetProcess");
    }

    const user = await User.findById(id);
    user.setPassword(password);

    await user.save();
    return res.send({
      data: { message: "New password confirmed" },
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Something went wrong" });
  }
});

userRouter.post("/signup", multerMiddleware.none(), async (req, res) => {
  // new user creation
  const { name, email } = req.body;
  const newUser = new User({ name, email });
  // set password
  newUser.setPassword(req.body.password);
  // save user
  try {
    await newUser.save();
    return res.send({
      data: {
        message: "New user created",
        user: { name, email },
      },
    });
  } catch (e) {
    console.log(e);
    if (e.name === "ValidationError") {
      return res.status(400).send({ error: e });
    }

    // Duplication Error email exists as user
    if (e.name === "MongoServerError" && e.code === 11000) {
      console.log("Account exists already");
      return res.status(400).send({
        error: { message: "Username and Password combination not valid" },
      });
    }

    return res.status(500).send({ error: { message: "Unknown Server error" } });
  }
});

userRouter.post("/login", multerMiddleware.none(), async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt with email:', email);
  const user = await User.findOne({ email }).select("+hash").select("+salt").select("+name");
  
  // Check if user exists and password is valid
  if (!user || !user.verifyPassword(password)) {
    console.log('Login failed: Invalid credentials');
    return res.status(404).send({
      message: "Failed to login",
      error: {
        message: "Wrong username and password combo.",
      },
    });
  }

  // If user exists and password is valid, generate access token
  const token = generateAccessToken({ email, name: user.name, id:user.id });
  console.log(token);

  // Set the token in the response cookie
  // res.cookie("auth", token, { httpOnly: true, maxAge: hoursInMillisec(4), secure: true});

  //* new approach for cookie
  res.cookie("auth", token, {
    // can only be accessed by server requests
    httpOnly: true,
    // path = where the cookie is valid
    path: "/",
    // secure = only send cookie over https
    secure: true,
    // sameSite = only send cookie if the request is coming from the same origin
    sameSite: "none", // "strict" | "lax" | "none" (secure must be true)
    // maxAge = how long the cookie is valid for in milliseconds
    maxAge: hoursInMillisec(4), // 4 hours
  });


  // Send the user data back to the client, including the name and id
  res.send({ message: "Success", data: { ...user.toObject(), name: user.name, id: user.id } });
});

userRouter.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.send("OK");
  console.log("logout backend");
});

userRouter.get("/secure", authenticateToken, async (req, res) => {
  try {
    const { email, name, id, idEntry, token } = req.user; 
    console.log("secure trying", email, name, id, idEntry);
    if (!email || !name) {
      return res.status(400).send({ error: "Invalid token payload" });
    }
    res.send({ email, name, id, idEntry, token });
  } catch (error) {
    console.error("secure throws an error",error);
    console.log(email, id);
    res.status(500).send({ error: "Internal server error" });
  }
});
