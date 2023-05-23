import mongoose from './mongoose.js'

function toPojo(object) {
  return JSON.parse(
    JSON.stringify(
      object
    )
  )
}

class PersonasDaoMongoose {
  #personasModel
  constructor(mongooseModel) {
    this.#personasModel = mongooseModel
  }

  async create(element) {
    return toPojo(await this.#personasModel.create(element))
  }

  async readOne(criteria) {
    const result = await this.#personasModel.findOne(criteria).lean()
    if (!result) throw new Error('NOT FOUND')
    return result
  }

  async readMany(criteria) {
    return await this.#personasModel.find(criteria).lean()
  }

  async updateOne(criteria, newData) {
    const modifiedUser = await this.#personasModel.findOneAndUpdate(criteria, newData, { new: true }).lean()
    if (!modifiedUser) throw new Error('NOT FOUND')
    return toPojo(modifiedUser)
  }

  async updateMany(criteria, newData) {
    await this.#personasModel.updateMany(criteria, newData)
  }

  async deleteOne(criteria) {
    const deletedUser = await this.#personasModel.findOneAndDelete(criteria).lean()
    if (!deletedUser) throw new Error('NOT FOUND')
    return toPojo(deletedUser)
  }

  async deleteMany(criteria) {
    await this.#personasModel.deleteMany(criteria)
  }
}

const personasSchema = new mongoose.Schema({
  id: { type: String, index: true },
  nombre: String,
  email: String,
  edad: Number
}, { versionKey: false })
const personasModel = mongoose.model('personas', personasSchema)

export const personasDaoMongoose = new PersonasDaoMongoose(personasModel)