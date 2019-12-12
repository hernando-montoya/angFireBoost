import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreObjectService } from './firestore-object.service';
import { ModelBase } from './model-base';
import { ISessionService } from './i-session.service';
import { IObjectDbService } from './i-object-db.service';
import { first, take } from 'rxjs/operators';

export enum AngularFormMode {
  Reactive,
  TemplateDriven
}

export abstract class BasicFormComponent<T extends ModelBase> {

  /** supported form modes: Reactive & Template driven */
  formMode: AngularFormMode = AngularFormMode.Reactive

  /** the object we're editing, but we're never directly editing this object. Reactive forms: via formGroup. Template driven: via objectUi */
  object: T

  /** Used by reactive forms */
  formGroup: FormGroup

  /** Used by template driven forms: this is copy of this.object (but with necessary changes for UI-binding purposes) */
  objectUi: any

  /** Only pass FormBuilder in case of reactive forms */
  constructor(formMode: AngularFormMode, protected type: { new(): T; }, protected objectSvc: IObjectDbService<T>, protected sessionSvc: ISessionService,
    protected router: Router, protected route: ActivatedRoute, protected fb: FormBuilder = null) {

    this.formMode = formMode

    if (this.formMode == AngularFormMode.Reactive)
      this.createFormGroup()
  }

  new() {
    this.object = new this.type()

    this.load(this.object)
  }

  /** override this method in case of reactive forms to initialise formGroup */
  createFormGroup() {

  }

  convertDbToUi(objDb: any): any {

    return objDb
  }

  convertUiToDb(objUi: any): any {

    return objUi
  }

  /* Makes object available for binding: reactive forms = copy data into formgroup / template forms = copy data to object 'objectUi' */
  load(object: T) {

    switch (this.formMode) {
      case AngularFormMode.Reactive:
        this.loadFormGroup(object)
        break
      case AngularFormMode.TemplateDriven:
        this.objectUi = this.convertDbToUi(object)
        break
    }

  }

  /** Reactive forms only: copies the data from the supplied object (parameter) into the form group */
  loadFormGroup(obj: T) {
    let objUi = this.convertDbToUi(obj)
    this.formGroup.patchValue(objUi)
  }

  /** Reactive forms only: copies the data from the form group into the supplied object */
  unloadFormGroup(obj: T) {

    let objUi = {}
    Object.assign(objUi, this.formGroup.value)

    let objDb = this.convertUiToDb(objUi)

    Object.assign(obj, objDb)
  }


  processParameters() {

    this.route.params.subscribe(params => {

      let id = params['id']

      console.log(id)

      if (id == 'new')
        this.new()
      else {
        this.objectSvc.getById$(id).subscribe(object => {

          if (object.id == 'object-not-found') {

            let editPage = this.route.snapshot.url[0].path
            this.router.navigate([`/${editPage}/new`])

          } else {
            this.object = object
            this.load(object)
          }

        })
      }
    })
  }


  save() {

    switch (this.formMode) {
      case AngularFormMode.Reactive:
        this.unloadFormGroup(this.object)
        break
      case AngularFormMode.TemplateDriven:
        this.object = this.convertUiToDb(this.objectUi)
        break
    }

    console.log(this.object)

    this.sessionSvc.showSpinner = true

    this.objectSvc.save(this.object).then(res => {
      console.log('Saved!')

      this.sessionSvc.showSpinner = false
    }, err => {
      this.sessionSvc.showSpinner = false
    })
  }

  delete() {

    let id = this.object.id

    this.sessionSvc.showSpinner = true

    this.objectSvc.delete(id).then(res => {

      console.log(res)

      //  let currentRoute = this.route.toString()

      this.sessionSvc.showSpinner = false

      let editPage = this.route.snapshot.url[0].path
      let gridPage = `/${editPage}-grid`

      this.router.navigate([gridPage])
    }, err => {
      this.sessionSvc.showSpinner = false
    })
  }

  /** was developed for reactive forms */
  isFormOk(formGroup): boolean {

    if (!formGroup)  // in case of template driven forms
      return true

    return (formGroup.status == 'VALID')
  }

}
