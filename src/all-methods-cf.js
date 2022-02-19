const PROTOCOL = "https";
const HOST = "github.com";

addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

async function handleRequest(event) {
  const request = event.request;

  const reqUrl = request.url;
  const cacheKey = new Request(reqUrl, request);

  const cache = caches.default;
  let response = await cache.match(cacheKey);

  if (!response) {
    const originUrl = new URL(reqUrl);
    originUrl.protocol = PROTOCOL;
    originUrl.host = HOST;

    const newReq = new Request(originUrl.toString(), request);
    newReq.headers.set("Host", HOST);

    response = await fetch(newReq);

    response = new Response(response.body, response);
    event.waitUntil(cache.put(cacheKey, response.clone()));
  }
  return response;
}
