import { Persona } from '../models/Persona.js'
import { personasRepository } from '../repositories/personas.repository.js'
import { personasService } from '../services/personas.service.js'

export async function handleGet(req, res, next) {
  try {
    if (req.params.id) {
      const buscado = await personasRepository.readOne({ id: req.params.id })
      res.json(buscado)
    } else {
      const xs = await personasRepository.readMany(req.query)
      res.json(xs)
    }
  } catch (error) {
    next(error)
  }
}

export async function handlePost(req, res, next) {
  try {
    const creado = await personasService.registrar(req.body)
    res.status(201).json(creado)
  } catch (error) {
    next(error)
  }
}

export async function handlePut(req, res, next) {
  try {
    const actualizado = await personasRepository.updateOne(req.params.id, req.body)
    res.json(actualizado)
  } catch (error) {
    next(error)
  }
}

export async function handleDelete(req, res, next) {
  try {
    const borrado = await personasRepository.deleteOne(req.params.id)
    res.json(borrado)
  } catch (error) {
    next(error)
  }
}