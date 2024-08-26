import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent {

  @Input() trip: Trip;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService // Inject AuthenticationService
  ) { }

  // Method to check if the user is logged in
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  // Method to navigate to the edit trip page
  public editTrip(): void {
    this.router.navigate(['/edit-trip', this.trip.tripCode]);
  }
}