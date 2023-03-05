import { Component, OnInit } from '@angular/core';
import { CommonService } from '../home/service/common.service';
import { Users } from '../Models/User';
import notify from "devextreme/ui/notify"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataSource: Users[];
  formData: Users;

  constructor(private service: CommonService) {
    this.dataSource = [];
    this.formData = new Users();
  }

  ngOnInit(): void {
    this.getUsser(); 
  }
  getUsser() {
    this.service._getUsers().subscribe(response => {
      if (response == null) notify(response);
      this.dataSource = response;
    })
  };
  onEditingStart(event :any) {
    this.formData = event.data;
  };
  onCreatedStart(event :any) {
    this.formData = event.data;
    this.service._postUser(this.formData).subscribe(response => {
      if (response == null) notify(response);
      notify(response);
    })
  };
}
