import 'dotenv/config'
import fastify from "fastify";
import { memoriesRoutes } from "./routes/memories";
import cors from '@fastify/cors'
import { authRoutes } from './routes/auth';
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { uploadRoutes } from './routes/upload';
import fastifyStatic from '@fastify/static';
import { resolve } from 'path';

const app = fastify();
app.register(cors, {
  origin: true, // Todas URL de front liberado assim para prod > ['','']
})
app.register(fastifyStatic, {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads'
})
app.register(memoriesRoutes)
app.register(authRoutes)

app.register(jwt, {
  secret: 'algo_bem_secreto'
})
app.register(multipart)
app.register(uploadRoutes)

app.listen({
  port: 3333,    
}).then(() => {
  console.log('HTTP server running on http://localhost:3333');
    
});