import { Component } from '@angular/core';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = true
  title = 'Angular Form Guide';


  constructor(public sessionSvc: SessionService) {

    let mainMenu = [
      { id: 'productNew', title: 'New product', path: '/product/new', isActive: true },
      { id: 'productGrid', title: 'Product grid', path: '/product-grid' }
    ]

    this.sessionSvc.setMenu('main', mainMenu)

  }

  

}
