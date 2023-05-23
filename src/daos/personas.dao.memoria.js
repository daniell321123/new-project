function matcher(query) {
    return function (obj) {
      const conditions = Object.entries(query)
      for (const [key, value] of conditions) {
        if (!obj[key] || obj[key] != value) return false
      }
      return true
    }
  }
  
  function toPojo(object) {
    return JSON.parse(
      JSON.stringify(
        object
      )
    )
  }
  
  class PersonasDaoMemoria {
    #personas
    constructor() {
      this.#personas = []
    }
  
    create(element) {
      const pojo = toPojo(element)
      this.#personas.push(pojo)
      return Promise.resolve(pojo)
    }
  
    readOne(criteria) {
      const result = this.#personas.find(matcher(criteria))
      if (!result) throw new Error('NOT FOUND')
      return Promise.resolve(result)
    }
  
    readMany(criteria) {
      return Promise.resolve(this.#personas.filter(matcher(criteria)))
    }
  
    updateOne(criteria, newData) {
      const index = this.#personas.findIndex(matcher(criteria))
      if (index === -1) throw new Error('NOT FOUND')
      this.#personas[index] = toPojo({
        ...this.#personas[index],
        ...newData
      })
      return Promise.resolve(this.#personas[index])
    }
  
    updateMany(criteria, newData) {
      let modifiedCount = 0
      for (let index = 0; index < this.#personas.length; index++) {
        if (matcher(criteria)(this.#personas[index])) {
          this.#personas[index] = toPojo({
            ...this.#personas[index],
            ...newData
          })
          modifiedCount++
        }
      }
      return Promise.resolve({ modifiedCount })
    }
  
    deleteOne(criteria) {
      const index = this.#personas.findIndex(matcher(criteria))
      if (index === -1) throw new Error('NOT FOUND')
      const deleted = this.#personas[index]
      this.#personas.splice(index, 1)
      return Promise.resolve(deleted)
    }
  
    deleteMany(criteria) {
      let initialCount = this.#personas.length
      this.#personas = this.#personas.filter(e => !matcher(criteria)(e))
      return Promise.resolve({ deletedCount: initialCount - this.#personas.length })
    }
  }
  
  export const personasDaoMemoria = new PersonasDaoMemoria()