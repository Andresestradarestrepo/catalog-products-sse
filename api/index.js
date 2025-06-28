export default function handler(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  const payload = {
    name: "Buscar Productos",
    description: "Conecta con Google Sheets y devuelve productos para mostrar en el bot.",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Lo que el usuario está buscando, como 'pijamas' o 'camisetas'."
        }
      },
      required: ["query"]
    }
  };

  res.write(`event: tool\ndata: ${JSON.stringify(payload)}\n\n`);
  res.end();
}
