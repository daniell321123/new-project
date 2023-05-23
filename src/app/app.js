import express from 'express'
import { personasRouter } from '../routers/personas.router.js'

export const app = express()

app.use(express.json())

app.use('/api/personas', personasRouter)