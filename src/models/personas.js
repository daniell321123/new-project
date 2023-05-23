import { randomUUID } from 'node:crypto'

export class Persona {

  constructor({ id = randomUUID(), nombre, email, edad }) {
    this.id = id
    this.nombre = nombre
    this.email = email
    this.edad = edad
  }

}