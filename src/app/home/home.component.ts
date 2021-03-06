import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { userData } from '../interfaces/userData';
import { DataService } from '../data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  search: FormControl = new FormControl("")
  displayedColumns: string[] = ['id', 'name', 'email', 'position'];
  dataSource;
  names = ["Danny", "Test", "Yossi", "Blabla"]
  constructor(private router: Router,
    private ds: DataService) { }

  ngOnInit(): void {
    console.log("data reloaded.")
    let employ: userData[] = Array.from({ length: 20 })
      .map((res, index) => {
        return {
          id: index,
          name: this.names[Math.floor(Math.random() * this.names.length)],
          email: 'test@gmail.com',
          position: 'H',
          profile_image: "",
          username: "A" + index,
          full_username: "AAA" + index,
          manager_name: "Test" + index,
          phone_number: "" + index + '11'

        }
      })

    this.dataSource = new MatTableDataSource(employ);
    this.ds.setNewData(employ);
  }



  applyFilter() {
    if (!this.search.value) {
      this.search.markAsTouched();
      return;
    }
    const filterValue = this.search.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  userInfo(user: userData) {
    console.log(user);
    this.router.navigate(['/user', user.id])
  }

}
