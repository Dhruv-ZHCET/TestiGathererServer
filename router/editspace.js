import express from "express";
import z from "zod";
import jwt from "jsonwebtoken";
import JWT_SECRET from "../config.js";
import Authmiddlware from "../middleware.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const editRouter = express.Router();

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

editRouter.put("/", Authmiddlware, async (req, res) => {
  try {
    console.log("tmkc");
    console.log(req.query);
    console.log(req.body);
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

    const { spaceName } = req.query; // Extract spacename from query

    const validationResult = SpaceSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({ error: validationResult.error });
    }

    const SpaceResponse = await prisma.space.update({
      where: {
        spaceName: spaceName,
      },
      data: {
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
    console.log(SpaceResponse);

    if (SpaceResponse) {
      const updatedQuestions = await Promise.all(
        questions.map(async (question) => {
          const existingQuestion = await prisma.question.findFirst({
            where: {
              spaceId: SpaceResponse.id,
              question: question,
            },
          });

          if (existingQuestion) {
            return prisma.question.update({
              where: {
                id: existingQuestion.id,
              },
              data: {
                question: question,
              },
            });
          } else {
            return prisma.question.create({
              data: {
                spaceId: SpaceResponse.id,
                question: question,
              },
            });
          }
        })
      );

      if (updatedQuestions) {
        res.status(200).json({ message: "Space updated successfully" });
      }
    } else {
      res.status(500).json({ error: "There was an error updating the space" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default editRouter;
