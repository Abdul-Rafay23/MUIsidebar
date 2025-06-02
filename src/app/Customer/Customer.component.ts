import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, Router } from '@angular/router';

export interface CustomerData {
  id: number;
  name: string;
  age: number;
  address: string;
  email: string;
}

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  displayedColumns: string[] = ['name', 'age', 'address', 'email', 'actions'];
  dataSource: CustomerData[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadCustomerData();
  }

  loadCustomerData(): void {
    const data = localStorage.getItem('Customer');
    if (data) {
      try {
        this.dataSource = JSON.parse(data);
      } catch (err) {
        console.error('Invalid local storage data:', err);
      }
    }
  }

  editCustomer(id: number): void {
    this.router.navigate([`/Customerform/${id}`]);
  }

  deleteCustomer(Customer: CustomerData): void {
    this.dataSource = this.dataSource.filter(e => e !== Customer);
    localStorage.setItem('Customer', JSON.stringify(this.dataSource));
  }
}
