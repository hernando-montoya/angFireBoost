import { Observable } from 'rxjs';
import { ModelBase } from './model-base';

/** Very basic storage interface for objects */
export interface IObjectDbService<T extends ModelBase> {

    getAll$(): Observable<T[]>

    getById$(id: string): Observable<T>

    delete(id: string): Promise<void>

    save(typedObj: ModelBase): Promise<any>

}