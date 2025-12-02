// swagger.js
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
dotenv.config();
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Project Management API",
      version: "1.0.0",
      description: "API documentation for Project & User system",
    },
    servers: [
      { url: process.env.API_URL }
    ],

    components: {
      schemas: {
        User: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            _id: { type: "string" },
            name: { type: "string", example: "Nguyen Van A" },
            email: { type: "string", example: "test@gmail.com" },
            password: { type: "string", example: "123456" },
            role: { type: "string", example: "user" }
          },
        },

        Project: {
          type: "object",
          required: ["name", "owner"],
          properties: {
            _id: { type: "string" },
            name: { type: "string", example: "Website ABC" },
            description: { type: "string", example: "Project mô tả…" },
            status: {
              type: "string",
              enum: ["pending", "in-progress", "completed"],
              example: "pending"
            },
            startDate: { type: "string", format: "date-time" },
            owner: { type: "string", example: "6799bd..." }
          },
        },

        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string" },
            errorCode: { type: "string" },
          },
        },
      },
    },
  },

  // quét mọi route để lấy JSDoc
  apis: ["./src/routes/userRoutes.js", "./src/routes/projectRoutes.js"],
};

export const swaggerSpec = swaggerJsDoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📘 Swagger Docs: http://localhost:3001/api-docs");
};
