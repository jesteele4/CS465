import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {
  public editForm!: FormGroup;
  trip!: Trip;
  submitted = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
  ) { }

  ngOnInit(): void {
    const tripCode = localStorage.getItem('tripCode');
    if (!tripCode) {
      alert("Something wrong, couldn't find where I stashed tripCode.");
      this.router.navigate(['']);
      return;
    }

    console.log('EditTripComponent::ngOnInit()');
    console.log('tripCode: ' + tripCode);

    this.tripDataService.getTrip(tripCode)
      .subscribe({
        next: (value: any) => {
          this.trip = value[0];
          // Convert the date to a format the date picker can understand
          const formattedStartDate = this.formatDate(this.trip.start);
          this.editForm.patchValue({
            _id: this.trip._id,
            code: this.trip.code,
            name: this.trip.name,
            length: this.trip.length,
            start: formattedStartDate,
            resort: this.trip.resort,
            perPerson: this.trip.perPerson,
            image: this.trip.image,
            description: this.trip.description
          });
          console.log('Trip: ' + tripCode + ' retrieved');
        },
        error: (error: any) => {
          this.message = 'Error: ' + error;
          console.log(this.message);
        }
      });

    this.editForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  private formatDate(date: string): string {
    const d = new Date(date);
    return d.toISOString().substring(0, 10);
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.editForm.valid) {
      this.tripDataService.updateTrip(this.editForm.value)
        .subscribe({
          next: (value: any) => {
            console.log(value);
            this.router.navigate(['']);
          },
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        });
    }
  }

  get f() { return this.editForm.controls; }
}