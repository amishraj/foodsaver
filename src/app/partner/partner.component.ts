import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Meal } from '../interfaces/meal';
import { RestaurantService } from '../restaurants/restaurant.service';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})
export class PartnerComponent implements OnInit{
  constructor(private restaurantService: RestaurantService){}

  @ViewChild('foodSafetyCertificateInput') foodSafetyCertificateInput!: ElementRef;

  registered:boolean=false;

  ngOnInit(): void {
    this.registered=false;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      const formData = new FormData();
      // Add your restaurant data to the FormData object
      formData.append('title', form.value.restaurantName);
      formData.append('address', form.value.address);
      formData.append('phone', form.value.phone);
      formData.append('email', form.value.email);
      formData.append('rating', '3.0');
      formData.append('meals', '[]');
      
      // Add other fields as needed

      // Add your PDF file to the FormData object
      //const pdfFile: File = form.value.foodSafetyCertificate;
      const fileInput = this.foodSafetyCertificateInput.nativeElement;
      const pdfFile = fileInput.files[0];
      formData.append('pdfFile', pdfFile, pdfFile.name);

      // Call the service function
      this.restaurantService.postRestaurant(formData)
        .subscribe(response => {
          this.registered=true;
        });
    }
  }
}
