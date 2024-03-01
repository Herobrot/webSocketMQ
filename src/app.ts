import express from 'express';
import WebSocket from 'ws';
import http from 'http';
import 'dotenv/config';
import cors from 'cors';
import signale from 'signale';

const port = process.env.PORT
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
wss.on('connection', (ws) => {
  signale.success('Cliente conectado');

  ws.on('message', (message: any) => {
    const messageAsString = message.toString();
    signale.success('Recibido:', messageAsString);
      
    wss.clients.forEach((client: any) => {
      client.send(messageAsString);
    })
  })
});

server.listen(port, () => signale.log(`Servidor escuchando en el puerto ${port}`));
