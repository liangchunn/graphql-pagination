import http from 'http'
import { app } from './server'

http.createServer(app).listen(8080)
