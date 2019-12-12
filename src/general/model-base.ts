import { classToPlain } from "class-transformer";

export abstract class ModelBase {
    id: string

    toObject() : object {
      let obj : any =  classToPlain(this)
      delete obj.id
      return obj
    }
}