const { openai } = require("../../configs/openai");
const { generateStoryEmail } = require("../../data/emails.js");
const Story = require("../../models/story/model");
const { sendMail } = require("../../utils/send-mail.js");

const createStory = async (req, res) => {
  const userId = req.decoded?.id;
  const { story } = req.body;

  try {
    const newStory = await Story.create({
      userId,
      user_story: story,
    });

    const prompt = `
      You are a professional story enhancer. A user just shared their personal or emotional story:
      "${story}"
      Please generate 10 deep and thoughtful follow-up questions that would help you better understand their story and emotions to enhance it meaningfully.
      Return questions only, numbered 1 to 10.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const gptResponse = completion.choices[0]?.message?.content;
    if (!gptResponse) {
      return res.status(500).json({
        message: "Failed to generate questions from GPT",
        response: null,
        error: "Failed to generate questions from GPT",
      });
    }

    const questionLines = gptResponse
      .split("\n")
      .filter((line) => line.trim().match(/^\d+\.\s+/))
      .map((line) => line.replace(/^\d+\.\s*/, "").trim());

    return res.status(201).json({
      message: "Story and questions created successfully",
      response: {
        storyId: newStory._id,
        questions: questionLines,
      },
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      response: null,
      error: error.message,
    });
  }
};

const generateStory = async (req, res) => {
  const { email } = req.decoded;
  const { story_id } = req.query;
  const { qa } = req.body;

  try {
    const storyDoc = await Story.findById(story_id);
    if (!storyDoc) {
      return res.status(404).json({
        message: "Story not found",
        response: null,
        error: "Story not found",
      });
    }

    if (Array.isArray(qa)) {
      storyDoc.qa = qa.map((item) => ({
        question: item.question,
        answer: item.answer || "",
      }));
    }
    await storyDoc.save();

    const answeredQAs = storyDoc.qa
      .filter((item) => item.answer && item.answer.trim().length > 0)
      .map(
        (item, index) =>
          `${index + 1}. Q: ${item.question}\n   A: ${item.answer}`
      )
      .join("\n");

    const enhancementPrompt = `
      You are a masterful storyteller AI.
      A user has shared a personal story with you, and you have their answers to reflective questions to help you understand their context and emotions better.
      A user submitted the following original story:
      "${storyDoc.user_story}"
      Here are their answers to some reflective questions to help you understand their context and emotions better:
      ${answeredQAs}
      Based on this story and the user's insights, rewrite and enhance this story with more emotional depth, clarity, and flow. Keep it authentic and touching, as it may be nominated for a prize. Return only the enhanced story.
    `.trim();

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: enhancementPrompt }],
      temperature: 0.8,
    });

    const enhancedStory = completion.choices?.[0]?.message?.content;
    if (!enhancedStory) {
      return res.status(500).json({
        message: "GPT failed to return enhanced story",
        response: null,
        error: "GPT returned no content",
      });
    }

    storyDoc.enhanced_story = enhancedStory;
    await storyDoc.save();

    const generatedStory = enhancedStory
      .replace(/\n\n/g, "<br /><br />")
      .replace(/\n/g, "<br />");
    const dynamicData = {
      subject: "Story generated successfully",
      to_email: email,
    };
    const emailTemplate = await generateStoryEmail(generatedStory);
    await sendMail(emailTemplate, dynamicData);

    return res.status(200).json({
      message: "Story generated successfully",
      response: null,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      response: null,
      error: error.message,
    });
  }
};

module.exports = {
  createStory,
  generateStory,
};
