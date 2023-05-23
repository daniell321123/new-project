import mongoose from 'mongoose'

import { MONGODB_CNX_STR } from '../config/mongoose.config.js'
await mongoose.connect(MONGODB_CNX_STR)
console.log(`conectado a ${MONGODB_CNX_STR}`)

export default mongoose