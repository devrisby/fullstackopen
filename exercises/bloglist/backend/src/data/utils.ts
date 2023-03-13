import mongoose, { Schema } from 'mongoose'

const modelFactory = <T>(name: string, paths: any, props?: string[]) => {
    const transformer = {
      transform: (
        _doc: mongoose.Document,
        result: any
      ) => {
        result.id = result._id.toString()
        delete result._id
        delete result.__v

        if(props){
          props.forEach(p => delete result[p])
        }
      },
    }
  
    const schema = new Schema<T>(paths)
  
    schema.set('toJSON', transformer)
    schema.set('toObject', transformer)
  
    return mongoose.model<T>(name, schema)
  }
  
  const objectIdValidator = (id: string | number) =>
    mongoose.Types.ObjectId.isValid(id)

export { modelFactory, objectIdValidator }