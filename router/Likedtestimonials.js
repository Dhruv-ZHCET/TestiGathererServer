import express from "express";
import Authmiddlware from "../middleware.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const LikedTestimonialsRouter = express.Router();

LikedTestimonialsRouter.post("/liked", Authmiddlware, async (req, res) => {
  console.log("Received testimonial request");

  const { testimonialid, isLiked } = req.body; // Extract spacename from query
  console.log(isLiked);
  try {
    const updateTestimonial = await prisma.testimonial.update({
      where: {
        id: testimonialid,
      },
      data: {
        liked: isLiked,
      },
    });

    res.status(201).json({
      message: `make the testimonial ${
        isLiked
          ? "liked and added in the wall of love "
          : "not liked and removed from the wall of love"
      }`,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default LikedTestimonialsRouter;
