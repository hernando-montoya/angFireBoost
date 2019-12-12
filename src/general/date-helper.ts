
export class DateObject {
    year: number
    month: number
    day: number

    static fromObject(obj: any): DateObject {

        const dateObj = new DateObject()

        dateObj.year = obj.year
        dateObj.month = obj.month
        dateObj.day = obj.day

        return dateObj;
    }


    static fromNumber(numDate: number): DateObject {

        if (!numDate)
            return null

        const str = numDate.toString()

        if (str.length !== 8)
            return null

        const objDate = DateObject.create(
            +str.substring(0, 4),
            +str.substring(4, 6),
            +str.substring(6, 8))

        return objDate
    }


    static create(year: number, month: number, day: number): DateObject {
        const date = new DateObject()

        date.year = year
        date.month = month
        date.day = day

        return date
    }

    toString() {
        return `${this.day}/${this.month}/${this.year.toString().slice(-2)}`
    }

    toNumber() {
        const str = this.year.toString() + ("0" + this.month).slice(-2) + ("0" + this.day).slice(-2)
        return +str;
    }

    toDate() {
        const date = new Date(this.year, this.month - 1, this.day)
        return date
    }
}


export class DateConverter {

    static intToObject(intDate: number): DateObject {
        return DateObject.fromNumber(intDate)
    }

    static objectToInt(obj: any): number {
        let objDate = DateObject.fromObject(obj)
        return objDate.toNumber()
    }

}