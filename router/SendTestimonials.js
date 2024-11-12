import express from "express";
import Authmiddlware from "../middleware.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const SendtestimonialsRouter = express.Router();

SendtestimonialsRouter.post("/", Authmiddlware, async (req, res) => {
  console.log("Received testimonial request");

  const { spacename } = req.query; // Extract spacename from query
  const { username, email, isTextContent, content, imageURL, UserImageURL } =
    req.body.testimonial;
  const Rating = req.body.rating;

  console.log("Request Body:", req.body);

  try {
    // Find space by name
    const spaceinfo = await prisma.space.findUnique({
      where: { space_name: spacename },
    });

    if (!spaceinfo) {
      return res.status(404).json({ message: "Space not found" });
    }

    // Create a new testimonial
    const createTestimonial = await prisma.testimonial.create({
      data: {
        username,
        email,
        isTextContent,
        Content: content,
        imageURL,
        UserImageURL,
        Rating,
        spaceId: spaceinfo.id,
      },
    });

    console.log("Testimonial Created:", createTestimonial);
    res.status(201).json({
      message: "testimonial has been send",
    });
  } catch (err) {
    console.error("Error creating testimonial:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default SendtestimonialsRouter;
