import { Component, OnInit } from '@angular/core';
import * as Model from '../model';
import { Router } from '@angular/router';
import { BasicGridComponent } from 'src/general/basic-grid.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent extends BasicGridComponent<Model.Product> implements OnInit {

  constructor(router: Router, productSvc: ProductService) {

    let columnDefs = [
      { headerName: 'Name', field: 'name', sortable: true, filter: true },
      { headerName: 'Description', field: 'description', sortable: true, filter: true },
      { headerName: 'Stock', field: 'stock', sortable: true, filter: true }]

    super(columnDefs, router, productSvc, '/product')
  }

  ngOnInit() {
    this.getData()
  }

}
