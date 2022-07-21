import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {catchError, Observable, Subject, throwError} from "rxjs";

const BACKEND_URL = environment.backend_URL;

@Injectable
(
  {
    providedIn: 'root'
  }
)
export class CellService
{
  public cellsInfo: any[] = [];
  public cellsInfoChange: Subject<any[]> = new Subject<any>();

  constructor(private http: HttpClient)
  {

  }

  getCells()
  {
    this.http.get
    (
      BACKEND_URL + '/cells/fetchCells'
    )
      .pipe
      (
        catchError
        (
          (error: any) =>
          {
            console.log(error);

            this.cellsInfoChange.next([]);

            return throwError('Error occurred');
          }
        )
      )
      .subscribe
      (
        // tslint:disable-next-line:no-shadowed-variable
        (response: any) =>
        {
          this.cellsInfo = response.data;

          this.cellsInfoChange.next(this.cellsInfo);
        }
      );
  }

  getCellDetails(cell_id: any): Observable<any>
  {
    return this.http.get
    (
      BACKEND_URL + '/cells/fetchCellDetails/' + cell_id
    );
  }
}
