export default function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const catalogo = {
    "enterizo": {pack5: 127000, pack10: 224000, unitario: 25400},
    "pantalon": {pack5: 182000, pack10: 334000, unitario: 26400},
    "shorts": {pack6: 105000, pack12: 179900, unitario: 17500},
    "kimono": {pack5: 207000, pack10: 384000, unitario: 41400}
  };

  // Endpoint para listar herramientas MCP
  if (req.method === 'POST' && req.url?.includes('/tools/list')) {
    return res.json({
      tools: [
        {
          name: "buscar_producto",
          description: "Busca productos en el catálogo",
          inputSchema: {
            type: "object",
            properties: {
              nombre: {type: "string", description: "Nombre del producto"}
            },
            required: ["nombre"]
          }
        }
      ]
    });
  }

  // Endpoint para ejecutar herramientas MCP
  if (req.method === 'POST' && req.url?.includes('/tools/call')) {
    const {name, arguments: args} = req.body;
    
    if (name === "buscar_producto") {
      const producto = Object.entries(catalogo).find(([key, value]) => 
        key.includes(args.nombre.toLowerCase())
      );
      
      return res.json({
        content: [{
          type: "text",
          text: producto ? JSON.stringify(producto[1]) : "Producto no encontrado"
        }]
      });
    }
  }

  // Endpoint raíz
  return res.json({
    name: "Catálogo Pijamas MCP",
    version: "1.0.0"
  });
}
