export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const data = JSON.stringify([
    {"Categoría":"Enterizos","Producto":"Enterizo","Cantidad":5,"Precio Total":127000,"Precio por Unidad":25400},
    {"Categoría":"Batolas","Producto":"Kimono","Cantidad":10,"Precio Total":384000,"Precio por Unidad":38400}
  ]);

  res.write(`data: ${data}\n\n`);
  res.end();
}