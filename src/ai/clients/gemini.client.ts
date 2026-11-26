import { Injectable } from '@nestjs/common';
import { GeminiRequest } from '../types/gemini-request.js';
import axios, { AxiosResponse } from 'axios';
import { GeminiResponse } from '../types/gemini-response.js';
import {
  GEMINI_API_KEY,
  GEMINI_BATCH_EMBEDDINGS_URL,
  GEMINI_EMBEDDING_MODEL,
  GEMINI_URL,
} from '../constants/ai.constants.js';
import { GeminiEmbeddingRequest } from '../types/embedding-request.js';
import { GeminiEmbeddingResponse } from '../types/embedding-response.js';

@Injectable()
export class GeminiClient {
  async generateContent(request: GeminiRequest): Promise<string> {
    const response: AxiosResponse<GeminiResponse> =
      await axios.post<GeminiResponse>(GEMINI_URL, request, { params: { key: GEMINI_API_KEY } });

    return response.data.candidates[0].content.parts[0].text;
  }

  async embedTexts(texts: string[]): Promise<number[][]> {
    const requests: GeminiEmbeddingRequest[] = texts.map((text) => ({
      model: GEMINI_EMBEDDING_MODEL,
      content: { parts: [{ text }] },
      embedContentConfig: {
        outputDimensionality: 1536,
      }
    }));

    const response = await axios.post<GeminiEmbeddingResponse>(
      GEMINI_BATCH_EMBEDDINGS_URL,
      { requests },
      {
        params: { key: GEMINI_API_KEY },
        timeout: 30_000,
      },
    );
    return response.data.embeddings.map((embedding) => embedding.values);
  }
}
