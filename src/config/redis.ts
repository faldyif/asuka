export const port = Number(process.env.REDIS_PORT) || 6379;
export const host = process.env.REDIS_HOST || '127.0.0.1';
export const password = process.env.REDIS_PASSWORD || '';
export const prefix = process.env.MESSAGE_PREFIX || 'asuka';
