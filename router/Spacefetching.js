import express from "express";
import Authmiddlware from "../middleware.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SpacefetchingRouter = express.Router();

SpacefetchingRouter.get("/", Authmiddlware, async (req, res) => {
  try {
    const FindUserspaces = await prisma.user.findUnique({
      where: {
        email: req.email, // Assuming `req.email` is set by Authmiddlware
      },
      include: {
        spaces: true, // Include related 'spaces' in the response
      },
    });
    if (FindUserspaces) {
      console.log(FindUserspaces);
      res.status(200).json({
        spaces: FindUserspaces,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default SpacefetchingRouter;
