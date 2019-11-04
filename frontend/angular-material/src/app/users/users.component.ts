import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [ 'firstName', 'lastName', 'email', 'age'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngAfterViewInit(): void {
    if (this.dataSource.data.length > 0) {
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      });
    }
  }
}