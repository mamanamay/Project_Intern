export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      // Send a dummy comment just to keep connection open or let it close
      // SvelteKit's EventSource will just reconnect or ignore.
      controller.enqueue(':\n\n');
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  });
}
