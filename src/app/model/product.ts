import { ModelBase } from "../../general/model-base";
export class Product extends ModelBase {
    name: string = ''
    description: string = ''
    stock: number = 0
    isAvailable: boolean = true
    password: string = ''
    fromDate: any
}