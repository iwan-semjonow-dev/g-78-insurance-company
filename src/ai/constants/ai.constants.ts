export const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? '';

export const GEMINI_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL ?? 'gemini-3.8-flash'}:generateContent`;

export const GEMINI_EMBEDDING_MODEL = 'models/gemini-embedding-001';

export const GEMINI_BATCH_EMBEDDINGS_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:batchEmbedContents';
