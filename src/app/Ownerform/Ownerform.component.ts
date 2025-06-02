import { NgIf } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';

export interface OwnerData {
  id: number;
  name: string;
  age: number;
  company: string;
  address: string;

}

@Component({
  imports : [    ReactiveFormsModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule ],
  selector: 'app-Ownerform',
  templateUrl: './Ownerform.component.html',
  styleUrls: ['./Ownerform.component.scss'],

})
export class OwnerformComponent implements OnInit {
  form: FormGroup;
  editId: number | null = null;
  isEditMode: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      age: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(120),
      ]),
      company: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),

    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.editId = Number(id);
        this.loadOwnerData(this.editId);
      } else {
        this.isEditMode = false;
      }
    });
  }

  loadOwnerData(id: number): void {
    const storedData = localStorage.getItem('Owner');
    if (storedData) {
      const Owners: OwnerData[] = JSON.parse(storedData);
      const Owner = Owners.find((e) => e.id === id);
      if (Owner) {
        this.form.patchValue(Owner);
      }
    }
  }



  onSubmit(): void {
    if (this.form.valid) {
      let Owners: OwnerData[] = [];
      const storedData = localStorage.getItem('Owner');
      if (storedData) {
        Owners = JSON.parse(storedData);
      }

      if (this.isEditMode && this.editId !== null) {
        const index = Owners.findIndex((e) => e.id === this.editId);
        if (index !== -1) {
          Owners[index] = { id: this.editId, ...this.form.value };
        }
      } else {
        const newId = Owners.length > 0 ? Math.max(...Owners.map((e) => e.id)) + 1 : 1;
        Owners.push({ id: newId, ...this.form.value });
      }

      localStorage.setItem('Owner', JSON.stringify(Owners));
      this.form.reset();
      this.router.navigate(['/Owner']);
    }
  }
}
