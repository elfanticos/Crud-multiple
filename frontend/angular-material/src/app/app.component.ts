import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  users: any[] = [];
  constructor(
    private _appService: AppService
  ) {
  }

  ngOnInit(): void {
    this.listUser();
    this._appService.users$.subscribe((filter: any) => {
      this.listUser(filter);
    });
  }

  listUser(filter?: any): void {
    this._appService.list(filter).subscribe(res => {
      this.users = res.users || [];
    });
  }
}
