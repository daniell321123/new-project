import { Router } from 'express'

import * as personasController from '../controllers/personas.controller.js'

export const personasRouter = Router()

personasRouter.get('/:id?', personasController.handleGet)
personasRouter.post('/', personasController.handlePost)
personasRouter.put('/:id', personasController.handlePut)
personasRouter.delete('/:id', personasController.handleDelete)