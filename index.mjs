import { readFileSync } from "fs";
import { join } from "path";

export const handler = async (event) => {
  const route = event.rawPath.replace("/default", "") || "/";
  console.log("ROUTE:", route);
  console.log("EVENT:", event);

  const basePath = "./publish";

  let fileName = "index.html";

  const routesMap = {
    "/": "home.html",
    "/facturacion": "facturacion.html",
    "/crecimiento": "crecimiento.html",
    "/integraciones": "integraciones.html",
    "/logistica": "logistica.html",
    "/requisitos": "requisitos.html",
    "/servicios": "servicios.html",
    "/alianzas": "alianzas.html",
    "/form": "form.html",
    "/bmc-ondemand": "politicas-de-privacidad.html",
    "politicasOndemand.pdf": "politicasOndemand.pdf"
  };


  if (routesMap[route]) {
    fileName = routesMap[route];
  } else if (route && route !== "/") {
    fileName = route.startsWith("/") ? route.slice(1) : route;
  }

  const fullPath = join(basePath, fileName);
  console.log("FILE:", fullPath);

  try {
    const extension = fileName.split('.').pop().toLowerCase();
    const isPdf = extension === 'pdf';
    const headers = {
      "Content-Type": isPdf ? "application/pdf" : "text/html; charset=utf-8",
    };

    if (isPdf) {
      const pdf = readFileSync(fullPath);
      return {
        statusCode: 200,
        headers,
        body: pdf.toString('base64'),
        isBase64Encoded: true,
      };
    }

    const html = readFileSync(fullPath, "utf8");
    return {
      statusCode: 200,
      headers,
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