import express from "express";
import Authmiddlware from "../middleware.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const FetchTestimonials = express.Router();

FetchTestimonials.get("/", Authmiddlware, async (req, res) => {
  const { spacename } = req.query; // Extract spacename from query

  console.log("Request Body:", req.body);

  try {
    // Find space by name
    const spaceinfo = await prisma.space.findUnique({
      where: { space_name: spacename },
      include: {
        testimonials: true,
      },
    });

    if (!spaceinfo) {
      return res.status(404).json({ message: "Space not found" });
    }

    const testimonials = spaceinfo.testimonials;

    res.status(201).json({
      message: "testimonial has been fetched",
      testimonials,
    });
  } catch (err) {
    console.error("Error creating testimonial:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default FetchTestimonials;
