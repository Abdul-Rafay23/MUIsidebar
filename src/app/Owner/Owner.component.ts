import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Router } from '@angular/router';

export interface OwnerData {
  id: number;
  name: string;
  age: number;
  company: string;
  address: string;
}

@Component({
  selector: 'app-Owner',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './Owner.component.html',
  styleUrls: ['./Owner.component.scss']
})
export class OwnerComponent implements OnInit {
  displayedColumns: string[] = ['name', 'age', 'company', 'address', 'Actions'];
  dataSource: OwnerData[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadOwnerData();
  }

  loadOwnerData() {
    const storedData = localStorage.getItem('Owner');
    if (storedData) {
      this.dataSource = JSON.parse(storedData);
    }
  }

  editOwner(id: number) {
    this.router.navigate([`/Ownerform/${id}`]);
  }

  deleteOwner(owner: OwnerData) {
    this.dataSource = this.dataSource.filter((o) => o !== owner);
    localStorage.setItem('Owner', JSON.stringify(this.dataSource));
  }
}
