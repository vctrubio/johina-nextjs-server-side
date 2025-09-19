import { createClient } from 'contentful';

// Create Contentful client instance
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.APP_ACESS_TOKEN, // Using the access token from .env
});

export default client;