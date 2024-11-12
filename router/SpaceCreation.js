import express from "express";
import z from "zod";
import jwt from "jsonwebtoken";
import JWT_SECRET from "../config.js";
import Authmiddlware from "../middleware.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SpaceCreationRouter = express.Router();

const SpaceSchema = z.object({
  spacename: z.string(),
  imageUrl: z.string().optional(),
  header: z.string(),
  customMessage: z.string(),
  questions: z.array(z.string()),
  hideImage: z.boolean(),
  redirect_url: z.string(),
  imagePreview: z.string().optional(),
  thankyouTitle: z.string(),
  thankyouMessage: z.string(),
});
SpaceCreationRouter.post("/", Authmiddlware, async (req, res) => {
  try {
    console.log("helo");
    const {
      spacename,
      imageUrl,
      header,
      customMessage,
      questions,
      hideImage,
      redirect_url,
      imagePreview,
      thankyouTitle,
      thankyouMessage,
    } = req.body;

    console.log(req.body);

    const validationResult = SpaceSchema.safeParse(req.body);
    console.log(validationResult);
    if (!validationResult.success) {
      console.log("hi");
      return res.status(400).json({ error: validationResult.error });
    }

    const FindUserdetail = await prisma.user.findUnique({
      where: {
        email: req.email,
        firstName: req.firstname,
      },
    });
    if (FindUserdetail) {
      const SpaceResponse = await prisma.space.create({
        data: {
          userId: FindUserdetail.id,
          space_name: spacename,
          logo: imageUrl,
          header: header,
          customMessage: customMessage,
          hide_gif: hideImage,
          redirectPageUrl: redirect_url,
          thankyou_img_url: imagePreview,
          thankyou_title: thankyouTitle,
          thankyou_msg: thankyouMessage,
        },
      });

      if (SpaceResponse) {
        console.log(SpaceResponse);
        let QuestionResponse;
        for (const question of questions) {
          QuestionResponse = await prisma.question.create({
            data: {
              spaceId: SpaceResponse.id,
              question: question,
            },
          });
        }
        if (QuestionResponse) {
          res.status(200).json({
            message: "space created successfully",
          });
        }
      } else {
        res.status(500).json({ error: "there is some error" });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default SpaceCreationRouter;
