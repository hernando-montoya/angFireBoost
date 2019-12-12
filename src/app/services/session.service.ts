import { Injectable } from '@angular/core';
import { ISessionService } from 'src/general/i-session.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService implements ISessionService {

  /** A full screen spinner will be shown when true */
  showSpinner: boolean = false

  /** Contains all the menu items of the app */
  menus = {
    main: []
  }

  constructor() { }

  setMenu(menuName: string, menu: any[]) {
    this.menus[menuName] = menu
  }

  menuItemSelected(menuName: string, item: any) {

    let menu = this.menus[menuName]

    menu.forEach(item => item.isActive = false)

    item.isActive = true
  }
}
