export const isDev = !['production', 'test'].includes(
  process.env.NODE_ENV || 'development'
);

export const isProd = process.env.NODE_ENV === 'production';
