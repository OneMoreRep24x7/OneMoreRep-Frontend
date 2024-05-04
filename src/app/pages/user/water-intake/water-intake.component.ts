import { Component, OnInit } from '@angular/core';
import { TrackingDetails, User } from '../../../model/User.model';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-water-intake',
  templateUrl: './water-intake.component.html',
  styleUrls: ['./water-intake.component.scss']
})
export class WaterIntakeComponent implements OnInit {
  user: User | null;
  userId: string | null;
  trackingDetails: TrackingDetails | null;
  totalGlassOfWater: number | null;
  consumedGlassOfWater: number | null;
  oneGlass: number | null;
  showCongratulations: boolean = false; // Flag to control the visibility of congratulations popup

  constructor(
    private userService: UserService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.userId = this.user.id;
    this.getTrackingDetails();
  }

  getTrackingDetails() {
    this.userService.getTrackingDetails(this.userId).subscribe(
      (response) => {
        if (response.statusCode === 200) {
          this.trackingDetails = response.details;
          this.totalGlassOfWater = response.details.waterIntake;
          this.consumedGlassOfWater = response.details.waterConsumed;

          // Check if the goal is achieved
          if (this.consumedGlassOfWater === this.totalGlassOfWater) {
            this.showCongratulationsPopup(); // Show congratulations popup if goal achieved
          }
        }
      }
    );
  }

  addWater() {
    if (this.consumedGlassOfWater < this.totalGlassOfWater) {
      this.oneGlass = 1;
      const data = {
        userId: this.userId,
        waterConsumed: this.oneGlass
      };
      this.userService.updateWaterIntake(data).subscribe(
        (response) => {
          this.trackingDetails = response.details;
          this.totalGlassOfWater = response.details.waterIntake;
          this.consumedGlassOfWater = response.details.waterConsumed;

          // Check if the goal is achieved
          if (this.consumedGlassOfWater === this.totalGlassOfWater) {
            this.showCongratulationsPopup(); // Show congratulations popup if goal achieved
          }
        }
      );
    } else {
      this.toaster.success('Successfully achieved your goal');
    }
  }

  removeWater() {
    if (this.consumedGlassOfWater > 0) {
      this.oneGlass = -1;
      const data = {
        userId: this.userId,
        waterConsumed: this.oneGlass
      };
      this.userService.updateWaterIntake(data).subscribe(
        (response) => {
          this.trackingDetails = response.details;
          this.totalGlassOfWater = response.details.waterIntake;
          this.consumedGlassOfWater = response.details.waterConsumed;
        }
      );
    }
  }

  // Method to calculate progress percentage, outer stroke width, and inner stroke width
  calculateProgressPercentage(consumedGlassOfWater: number | null, totalGlassOfWater: number | null): number {
    if (consumedGlassOfWater === null || totalGlassOfWater === null || totalGlassOfWater === 0) {
      return 0;
    }
    return (consumedGlassOfWater / totalGlassOfWater) * 100;
  }

  calculateOuterStrokeWidth(consumedGlassOfWater: number | null, totalGlassOfWater: number | null): number {
    const radius = 100; // Adjust as needed
    return radius / 10; // Adjust as needed
  }

  calculateInnerStrokeWidth(consumedGlassOfWater: number | null, totalGlassOfWater: number | null): number {
    const radius = 100; // Adjust as needed
    return radius / 12; // Adjust as needed
  }

  // Method to show the congratulations popup
  showCongratulationsPopup() {
    this.showCongratulations = true;
    setTimeout(() => {
      this.showCongratulations = false;
    }, 2000); // Hide popup after 5 seconds
  }
}
