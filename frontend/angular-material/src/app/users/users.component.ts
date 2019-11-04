import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSnackBar } from '@angular/material';
import { AppService } from '../app.service';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnChanges {
  displayedColumns: string[] = [ 'firstName', 'lastName', 'email', 'age', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  search: FormControl = new FormControl('');
  @Input() users: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private _appService: AppService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        debounceTime(500)
      ).subscribe(search => {
        this._appService.users$.next({search});
      });
  }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource<any>(this.users || []);
    if (this.dataSource.data.length > 0) {
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      });
    }
  }

  viewEdit(user: any): void {
    this._appService.user$.next(user);
  }

  delete(id: string): void {
    this._appService.delete(id).subscribe(res => {
      this._snackBar.open(res.message, null, {duration: 5000});
      this._appService.users$.next();
    }, err => {
      console.log(err);
    });
  }

  sort(order: string): void {
    this._appService.users$.next({order});
  }
}
