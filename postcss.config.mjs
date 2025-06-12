const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-import': {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  }
};

export default config;
