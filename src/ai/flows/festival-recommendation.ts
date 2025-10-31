// This is a server-side file
'use server';

/**
 * @fileOverview Provides AI-powered festival recommendations based on user interests.
 *
 * - `getFestivalRecommendations` -  Function to retrieve personalized festival recommendations.
 * - `FestivalRecommendationInput` - Input type for the `getFestivalRecommendations` function.
 * - `FestivalRecommendationOutput` - Output type for the `getFestivalRecommendations` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FestivalRecommendationInputSchema = z.object({
  interests: z
    .string()
    .describe(
      'A comma-separated list of the user\u2019s interests, such as music, dance, history, food, etc.'
    ),
  preferences: z
    .string()
    .describe(
      'A description of the user\u2019s preferences, such as dates of travel, budget, and any specific requirements.'
    ),
});
export type FestivalRecommendationInput = z.infer<
  typeof FestivalRecommendationInputSchema
>;

const FestivalRecommendationOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'A list of festivals recommended for the user, based on their interests and preferences.'
    ),
});
export type FestivalRecommendationOutput = z.infer<
  typeof FestivalRecommendationOutputSchema
>;

export async function getFestivalRecommendations(
  input: FestivalRecommendationInput
): Promise<FestivalRecommendationOutput> {
  return festivalRecommendationFlow(input);
}

const festivalRecommendationPrompt = ai.definePrompt({
  name: 'festivalRecommendationPrompt',
  input: {schema: FestivalRecommendationInputSchema},
  output: {schema: FestivalRecommendationOutputSchema},
  prompt: `You are a festival recommendation expert for Cusco, Peru.

Based on the user's stated interests and preferences, recommend festivals they might enjoy.

Interests: {{{interests}}}
Preferences: {{{preferences}}}

Recommendations:`,
});

const festivalRecommendationFlow = ai.defineFlow(
  {
    name: 'festivalRecommendationFlow',
    inputSchema: FestivalRecommendationInputSchema,
    outputSchema: FestivalRecommendationOutputSchema,
  },
  async input => {
    const {output} = await festivalRecommendationPrompt(input);
    return output!;
  }
);
