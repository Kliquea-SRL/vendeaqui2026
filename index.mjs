import { readFileSync } from "fs";
import { join } from "path";

export const handler = async (event) => {
  const route = event.rawPath || "/";
  console.log("ROUTE:", route);

  const basePath = join(process.cwd(), "publish");

  let fileName = "index.html";

const routesMap = {
    "/vendeaqui": "home.html",
    "/facturacion": "facturacion.html", 
    "/crecimiento": "crecimiento.html",
    "/integraciones": "integraciones.html",
    "/logistica": "logistica.html",
    "/requisitos": "requisitos.html",
    "/servicios": "servicios.html",
    "/alianzas": "alianzas.html",
    "/form": "form.html"
};


  if (routesMap[route]) {
    fileName = routesMap[route];
  }

  const fullPath = join(basePath, fileName);
  console.log("FILE:", fullPath);

  try {
    const html = readFileSync(fullPath, "utf8");
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
      body: html,
    };
  } catch (error) {
    const notFound = readFileSync(join(basePath, "404.html"), "utf8");
    return {
      statusCode: 404,
      headers: { "Content-Type": "text/html; charset=utf-8" },
      body: notFound,
    };
  }
};





//export const handler = async (event) => {
//   // TODO implement
//   console.log('event', event);
//   console.log('event.rawpath', event.rawPath);
//   const response = {
//     statusCode: 200,
//     body: JSON.stringify('Hello from Lambda!'),
//   };
//   return response;
// };