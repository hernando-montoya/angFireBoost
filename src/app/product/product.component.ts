import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as Model from '../model';
import { SessionService } from '../services/session.service';
import { BasicFormComponent, AngularFormMode } from '../../general/basic-form.component';
import { NgbDateStruct, NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DateConverter } from 'src/general/date-helper';
import { NgbDateCustomParserFormatter } from '../../general/ngb-date-format'


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ]
})

export class ProductComponent extends BasicFormComponent<Model.Product> implements OnInit {

  constructor(productSvc: ProductService, sessionSvc: SessionService, router: Router, route: ActivatedRoute, fb: FormBuilder) {
    super(AngularFormMode.Reactive, Model.Product, productSvc, sessionSvc, router, route, fb)
  }

  ngOnInit() {
    this.processParameters()
  }

  /** will be called automatically if formMode AngularFormMode.Reactive (see above super(AngularFormMode.___) */
  createFormGroup() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      stock: ['']
    })
  }
}