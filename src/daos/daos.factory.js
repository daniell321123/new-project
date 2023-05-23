import { TIPO_PERSISTENCIA } from '../config/persistencia.config.js'

let personasDao
if (TIPO_PERSISTENCIA === 'mongoose') {
  const { personasDaoMongoose } = await import('./personas.dao.mongoose.js')
  personasDao = personasDaoMongoose
} else {
  const { personasDaoMemoria } = await import('./personas.dao.memoria.js')
  personasDao = personasDaoMemoria
}

export { personasDao }