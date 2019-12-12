import { firestore } from 'firebase';

export class WhereFilter {

  constructor(public fieldPath: string = null, public operator: firestore.WhereFilterOp = '==', public value: any = true) {
    // Firestore doesn't work with Date objects => use Timestamp instead !!
    if (value instanceof Date)
      value = firestore.Timestamp.fromDate(value)
  }
}
