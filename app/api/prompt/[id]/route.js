import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(
      params.id
    ).populate('creator');
    if (!prompt)
      return new Response('Prompt not found', {
        status: 404
      });
    return new Response(JSON.stringify(prompt), {
      status: 200
    });
  } catch (error) {
    return new Response(
      `Failed to get prompt ${params.id}`,
      {
        status: 500
      }
    );
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!prompt)
      return new Response('Prompt not found', {
        status: 404
      });
    //Update it with what we passed through params
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), {
      status: 200
    });
  } catch (error) {
    return new Response(
      `Failed to update prompt ${params.id}`,
      {
        status: 500
      }
    );
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);
    return new Response('Prompt deleted successfully', {
      status: 200
    });
  } catch (error) {
    return new Response(
      `Failed to delete prompt ${params.id}`,
      {
        status: 500
      }
    );
  }
};
