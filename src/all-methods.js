const ORIGIN = "origin_0";
const PROTOCOL = "https";
const HOST = "github.com";

addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

async function handleRequest(event) {
  const request = event.request;

  const originUrl = new URL(request.url);
  originUrl.protocol = PROTOCOL;
  originUrl.host = HOST;

  const newReq = new Request(originUrl.toString(), request);
  newReq.headers.set("Host", HOST);

  response = await fetch(newReq, {
    backend: ORIGIN,
  });

  // response = new Response(response.body, response);
  return response;
}
