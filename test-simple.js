export default {
  async fetch(request, env, ctx) {
    return new Response('Hello World - Simple Test', {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
    });
  },
};