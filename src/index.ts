export default {
  async fetch(request, env): Promise<Response> {
    const { pathname } = new URL(request.url);

    const { success } = await env.MY_RATE_LIMITER.limit({ key: pathname }); // key can be any string of your choosing
    if (!success) {
      return new Response(`429 Failure – rate limit exceeded for ${pathname}`, {
        status: 429,
      });
    }

    return new Response(`Success!`);
  },
} satisfies ExportedHandler<Env>;
