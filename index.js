addEventListener('fetch', event => {
  if (event.request.method == 'POST') {
    event.respondWith(handlePost(event.request))
  } else {
    event.respondWith(handleRequest(event.request))
  }
})

async function handlePost(request) {
  const json = await request.json();

/*
    return new Response(JSON.stringify(json), {
      status: Number(201)
    });
*/
  if (json.model === 'redirect') {
    await SHORT_KV.put(json.entry.short, json.entry.to)

    return new Response('created' + JSON.stringify(json), {
      status: Number(201)
    });

  }
  return new Response('Failed', {
    status: Number(400)
  });

}

async function handleRequest(request) {
  const url = new URL(request.url);
  uri = url.pathname.replace(/^\/|\/$/g, '');
  const value = await SHORT_KV.get(uri)
  if (value === null) {
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