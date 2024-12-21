import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  // Log detailed request information for debugging
  console.group('Astro Request Middleware Debug');
  console.log('Request URL:', context.url);
  console.log('Request Method:', context.request.method);
  
  // Log headers
  const headers = Object.fromEntries(context.request.headers.entries());
  console.log('Request Headers:', headers);

  // Try to read request body for debugging
  try {
    // Clone the request to avoid consuming the body
    const requestClone = context.request.clone();
    
    // Attempt to read body as text
    const rawBody = await requestClone.text();
    console.log('Raw Request Body:', rawBody);
    console.log('Raw Body Length:', rawBody.length);
    console.log('Raw Body Type:', typeof rawBody);

    // Attempt to parse as JSON
    try {
      const parsedBody = JSON.parse(rawBody);
      console.log('Parsed Request Body:', parsedBody);
      console.log('Parsed Body Keys:', Object.keys(parsedBody));
      console.log('Parsed Body Values:', Object.values(parsedBody));
      console.log('Parsed Body Entries:', Object.entries(parsedBody));
    } catch (parseError) {
      console.error('JSON Parsing Error:', parseError);
    }
  } catch (error) {
    console.error('Error reading request body:', error);
  }

  console.groupEnd();

  // Continue with the request
  return next();
};

// Debugging middleware for API routes
export const onRequestPost: MiddlewareHandler = async (context, next) => {
  console.group('API Route Middleware Debug');
  console.log('API Route:', context.url.pathname);
  console.log('Request Method:', context.request.method);
  
  try {
    // Clone the request to avoid consuming the body
    const requestClone = context.request.clone();
    
    // Log raw body
    const rawBody = await requestClone.text();
    console.log('Raw Request Body:', rawBody);
    console.log('Raw Body Length:', rawBody.length);

    // Attempt to parse as JSON
    try {
      const parsedBody = JSON.parse(rawBody);
      console.log('Parsed Request Body:', parsedBody);
      console.log('Parsed Body Keys:', Object.keys(parsedBody));
      console.log('Parsed Body Values:', Object.values(parsedBody));
      console.log('Parsed Body Entries:', Object.entries(parsedBody));
    } catch (parseError) {
      console.error('JSON Parsing Error:', parseError);
    }
  } catch (error) {
    console.error('Body Reading Error:', error);
  }

  console.groupEnd();

  return next();
};
