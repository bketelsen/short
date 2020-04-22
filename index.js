addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url);
  uri = url.pathname.replace(/^\/|\/$/g, '');
  const value = await SHORT_KV.get(uri)
  if (value === null) {
    pages/not-found
    return new Response('', {
      status: Number(301),
      headers: {
          'Location': 'https://brianketelsen.com/pages/not-found?slug=' + uri
      }
  });
  }

  return new Response('', {
    status: Number(301),
    headers: {
        'Location': value
    }
});
}