import { ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { ModelBase } from 'src/general/model-base';
import { FirestoreObjectService } from 'src/general/firestore-object.service';


export abstract class BasicGridComponent<T extends ModelBase> {
  @ViewChild('agGrid', {static: true}) agGrid: AgGridAngular;
  objectCol$: Observable<T[]>
  objectCol: T[] = []

  constructor(protected columnDefs = [], protected router: Router, protected objectSvc: FirestoreObjectService<T>, protected editRoute: string) {

  }

  getData() {
    this.objectCol$ = this.objectSvc.getAll$()
    this.objectCol$.subscribe(products => {
      this.objectCol = products
    })
  }

  editSelectedRow() {
    let rows = this.agGrid.api.getSelectedRows()
    console.log(rows)
    if (rows.length > 0) {
      let id = rows[0].id

      this.router.navigate([`${this.editRoute}/${id}`])
    }
  }
}
