import express from "express"
import swaggerUi from "swagger-ui-express"
import fs from "fs"
import path from "path";
import { fileURLToPath } from "url";
import { type } from "os";
import { json } from "stream/consumers";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docsPath = path.join(__dirname, "docs");


function loadswaggerFile(file){
    try{
        const filePath = path.join(docsPath, file)
        const filecontent = fs.readFileSync(filePath, "utf-8")
        return JSON.parse(filecontent)
    }catch(err){
        console.error(`error loading ${file}`, err)
        return null;
    }
}


function setupSwagger(app) {
    const swaggerFiles = fs.readdirSync(docsPath).filter(file => file.endsWith(".json"));

    swaggerFiles.forEach(file => {
        const swaggerDocument = loadswaggerFile(file);
        if (swaggerDocument) {
            const routePath = `/api/docs/${file.replace(".json", "")}`;

            // Buat middleware sendiri untuk menangani Swagger
            app.use(routePath, swaggerUi.serve, async (req, res, next) => {
                try {
                    const latestSwaggerDoc = loadswaggerFile(file); // Pastikan selalu mengambil dokumen terbaru
                    const swaggerHTML = swaggerUi.generateHTML(latestSwaggerDoc);
                    res.send(swaggerHTML);
                } catch (error) {
                    console.error(`❌ Error generating Swagger UI: ${error.message}`);
                    res.status(500).send("Internal Server Error");
                }
            });

            console.log(`✅ Swagger Docs available at: http://localhost:5000${routePath}`);
        }
    });
}

export { setupSwagger }