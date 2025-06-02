import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export interface CustomerData {
  id: number;
  name: string;
  age: number;
  address: string;
  email: string;
}

@Component({
  selector: 'app-customerform',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './customerform.component.html',
  styleUrls: ['./customerform.component.scss']
})
export class CustomerformComponent implements OnInit {
  form: FormGroup;
  editId: number | null = null;
  isEditMode = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      age: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(120)
      ]),
      address: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.editId = Number(id);
        this.loadCustomerData(this.editId);
      }
    });
  }

  loadCustomerData(id: number) {
    const stored = localStorage.getItem('Customer');
    if (stored) {
      const customers: CustomerData[] = JSON.parse(stored);
      const customer = customers.find(e => e.id === id);
      if (customer) {
        this.form.patchValue(customer);
      }
    }
  }

  get email() {
    return this.form.get('email');
  }

  errorMessage() {
    if (this.email?.hasError('required')) return 'You must enter an email';
    if (this.email?.hasError('email')) return 'Not a valid email';
    return '';
  }

  onSubmit() {
    if (this.form.invalid) return;

    const stored = localStorage.getItem('Customer');
    let customers: CustomerData[] = stored ? JSON.parse(stored) : [];

    if (this.isEditMode && this.editId !== null) {
      const index = customers.findIndex(e => e.id === this.editId);
      if (index !== -1) {
        customers[index] = { id: this.editId, ...this.form.value };
      }
    } else {
      const maxId = customers.length > 0 ? Math.max(...customers.map(e => e.id)) : 0;
      const newId = maxId + 1;
      customers.push({ id: newId, ...this.form.value });
    }

    localStorage.setItem('Customer', JSON.stringify(customers));
    this.form.reset();
    this.router.navigate(['/Customer']);
  }
}
