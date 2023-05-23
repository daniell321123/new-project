import { ADMIN_EMAIL } from '../config/admin.config.js'
import { Persona } from '../models/Persona.js'
import { personasRepository } from '../repositories/personas.repository.js'
import { enviadorDeMails } from './email.service.js'

class PersonasService {

  async registrar(datosPersona) {
    const persona = new Persona(datosPersona)
    const registrado = await personasRepository.create(persona)
    await enviadorDeMails.enviar(persona.email, 'registro exitoso', 'gracias por registrarse')
    await enviadorDeMails.enviar(ADMIN_EMAIL, 'nuevo registro', persona.email)
    return registrado
  }
}

export const personasService = new PersonasService()