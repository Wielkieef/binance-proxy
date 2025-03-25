export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const target = url.searchParams.get("url");

    if (!target) {
      return new Response("Missing 'url' parameter", { status: 400 });
    }

    try {
      const response = await fetch(target);
      const data = await response.text(); // lub .json()

      return new Response(data, {
        headers: {
          "Access-Control-Allow-Origin": "*", // CORS
          "Content-Type": response.headers.get("Content-Type") || "text/plain"
        }
      });
    } catch (err) {
      return new Response(`Error: ${err.message}`, { status: 500 });
    }
  },
};
