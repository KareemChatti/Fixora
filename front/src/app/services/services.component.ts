import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Worker } from '../models/worker.model';
import { Service } from '../models/service.model';



@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.css'],
    standalone: false
})
export class ServicesComponent implements OnInit {
  services: Service[] = [
    { id: 1, name: 'Plumbing', description: 'Expert plumbing services for all your needs.', imageUrl:'https://trusteyman.com/wp-content/uploads/2019/02/how-does-plumbing-work-e1548696261445.jpeg'},
    { id: 2, name: 'Electrical', description: 'Professional electrical services for safety and efficiency.', imageUrl: 'https://erieit.edu/wp-content/uploads/volt-watt-amp-electrical-metrics.jpg' },
    { id: 3, name: 'Gardening', description: 'Quality gardening services to beautify your outdoor space.', imageUrl: 'https://cdn.mos.cms.futurecdn.net/JvbeUXjvJAdLnMUAM9UtgQ-1200-80.jpg' },
    { id: 4, name: 'Painting', description: 'Professional painting services to refresh your home or office.', imageUrl: 'https://media.diy.com/is/image/KingfisherDigital/IdeasAdvice-paint-your-wall-like-a-pro~a491ba82409fb1379d31cf464e5c3bea6d020e62?wid=1200&hei=600' },
    { id: 5, name: 'Carpentry', description: 'Custom woodworking services for furniture and home improvements.', imageUrl: 'https://cdn.prod.website-files.com/647888ca92d03e3fca3f1ea0/647888ca92d03e3fca3f2389_carpentry.jpg' },
    { id: 6, name: 'Cleaning', description: 'Comprehensive cleaning services for residential and commercial spaces.' ,imageUrl: 'https://www.stephensplumbing.net/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Faly8i58a%2Fproduction%2F83aaa0696d1fb7b86310dc6300495e39eb91b641-2400x1296.jpg%3Ffm%3Dwebp&w=3840&q=75' },
    { id: 7, name: 'HVAC', description: 'Heating, ventilation, and air conditioning services for comfort and efficiency.', imageUrl: 'https://www.stephensplumbing.net/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Faly8i58a%2Fproduction%2F83aaa0696d1fb7b86310dc6300495e39eb91b641-2400x1296.jpg%3Ffm%3Dwebp&w=3840&q=75' },
    { id: 8, name: 'Masonry', description: 'Expert masonry services for brickwork, stonework, and concrete.' ,imageUrl: 'https://www.stephensplumbing.net/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Faly8i58a%2Fproduction%2F83aaa0696d1fb7b86310dc6300495e39eb91b641-2400x1296.jpg%3Ffm%3Dwebp&w=3840&q=75' },
    { id: 9, name: 'Roofing', description: 'Reliable roofing services for repairs, maintenance, and new installations.',imageUrl: 'https://www.stephensplumbing.net/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Faly8i58a%2Fproduction%2F83aaa0696d1fb7b86310dc6300495e39eb91b641-2400x1296.jpg%3Ffm%3Dwebp&w=3840&q=75' },
    { id: 10, name: 'Window Repair', description: 'Efficient window repair and replacement services for all types of windows.' ,imageUrl: 'https://www.stephensplumbing.net/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Faly8i58a%2Fproduction%2F83aaa0696d1fb7b86310dc6300495e39eb91b641-2400x1296.jpg%3Ffm%3Dwebp&w=3840&q=75' },
    { id: 11, name: 'Pest Control', description: 'Effective pest control services to keep your home safe from pests.',imageUrl: 'https://www.stephensplumbing.net/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Faly8i58a%2Fproduction%2F83aaa0696d1fb7b86310dc6300495e39eb91b641-2400x1296.jpg%3Ffm%3Dwebp&w=3840&q=75' },
    { id: 12, name: 'Flooring', description: 'Professional flooring installation and repair services for all types of floors.', imageUrl: 'https://www.stephensplumbing.net/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Faly8i58a%2Fproduction%2F83aaa0696d1fb7b86310dc6300495e39eb91b641-2400x1296.jpg%3Ffm%3Dwebp&w=3840&q=75' },
    { id: 13, name: 'Tiling', description: 'Expert tiling services for bathrooms, kitchens, and floors.', imageUrl: 'https://www.stephensplumbing.net/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Faly8i58a%2Fproduction%2F83aaa0696d1fb7b86310dc6300495e39eb91b641-2400x1296.jpg%3Ffm%3Dwebp&w=3840&q=75' },
    { id: 14, name: 'Landscaping', description: 'Beautiful landscaping services for residential and commercial properties.', imageUrl: 'https://www.stephensplumbing.net/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Faly8i58a%2Fproduction%2F83aaa0696d1fb7b86310dc6300495e39eb91b641-2400x1296.jpg%3Ffm%3Dwebp&w=3840&q=75' },
    { id: 15, name: 'Handyman', description: 'General handyman services for all types of home repairs and improvements.', imageUrl: 'https://www.stephensplumbing.net/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Faly8i58a%2Fproduction%2F83aaa0696d1fb7b86310dc6300495e39eb91b641-2400x1296.jpg%3Ffm%3Dwebp&w=3840&q=75' },
    { id: 16, name: 'Locksmith', description: 'Reliable locksmith services for home, office, and car lockouts.', imageUrl: 'https://www.stephensplumbing.net/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Faly8i58a%2Fproduction%2F83aaa0696d1fb7b86310dc6300495e39eb91b641-2400x1296.jpg%3Ffm%3Dwebp&w=3840&q=75' },
    { id: 17, name: 'Moving Services', description: 'Stress-free moving services for homes and offices.', imageUrl: 'https://www.stephensplumbing.net/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Faly8i58a%2Fproduction%2F83aaa0696d1fb7b86310dc6300495e39eb91b641-2400x1296.jpg%3Ffm%3Dwebp&w=3840&q=75' },
    { id: 18, name: 'Interior Design', description: 'Creative interior design services to enhance the look of your space.', imageUrl: 'https://www.stephensplumbing.net/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Faly8i58a%2Fproduction%2F83aaa0696d1fb7b86310dc6300495e39eb91b641-2400x1296.jpg%3Ffm%3Dwebp&w=3840&q=75' },
    { id: 19, name: 'Home Automation', description: 'Smart home automation services to control your home with ease.', imageUrl: 'https://www.stephensplumbing.net/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Faly8i58a%2Fproduction%2F83aaa0696d1fb7b86310dc6300495e39eb91b641-2400x1296.jpg%3Ffm%3Dwebp&w=3840&q=75' },
    { id: 20, name: 'Electric Gates', description: 'Installation and repair of electric gates for added security and convenience.', imageUrl: 'https://www.stephensplumbing.net/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Faly8i58a%2Fproduction%2F83aaa0696d1fb7b86310dc6300495e39eb91b641-2400x1296.jpg%3Ffm%3Dwebp&w=3840&q=75' },
    { id: 21, name: 'Car Detailing', description: 'Professional car detailing services to make your car look brand new.', imageUrl: 'https://www.stephensplumbing.net/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Faly8i58a%2Fproduction%2F83aaa0696d1fb7b86310dc6300495e39eb91b641-2400x1296.jpg%3Ffm%3Dwebp&w=3840&q=75' },
    { id: 22, name: 'Pressure Washing', description: 'High-pressure washing services for cleaning driveways, patios, and exteriors.', imageUrl: 'https://www.stephensplumbing.net/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Faly8i58a%2Fproduction%2F83aaa0696d1fb7b86310dc6300495e39eb91b641-2400x1296.jpg%3Ffm%3Dwebp&w=3840&q=75' },
    { id: 23, name: 'Pool Maintenance', description: 'Expert pool maintenance services to keep your pool clean and safe.', imageUrl: 'https://www.stephensplumbing.net/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Faly8i58a%2Fproduction%2F83aaa0696d1fb7b86310dc6300495e39eb91b641-2400x1296.jpg%3Ffm%3Dwebp&w=3840&q=75' },
    { id: 24, name: 'Event Planning', description: 'Comprehensive event planning services for all types of events and celebrations.', imageUrl: 'https://www.stephensplumbing.net/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Faly8i58a%2Fproduction%2F83aaa0696d1fb7b86310dc6300495e39eb91b641-2400x1296.jpg%3Ffm%3Dwebp&w=3840&q=75' },
    { id: 25, name: 'Personal Trainer', description: 'Certified personal trainers to help you achieve your fitness goals.', imageUrl: 'https://www.stephensplumbing.net/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Faly8i58a%2Fproduction%2F83aaa0696d1fb7b86310dc6300495e39eb91b641-2400x1296.jpg%3Ffm%3Dwebp&w=3840&q=75' },
    { id: 26, name: 'Pet Care', description: 'Professional pet care services, including grooming, walking, and sitting.', imageUrl: 'https://www.stephensplumbing.net/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Faly8i58a%2Fproduction%2F83aaa0696d1fb7b86310dc6300495e39eb91b641-2400x1296.jpg%3Ffm%3Dwebp&w=3840&q=75' },
    { id: 27, name: 'Photography', description: 'Expert photography services for events, portraits, and more.', imageUrl: 'https://www.stephensplumbing.net/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Faly8i58a%2Fproduction%2F83aaa0696d1fb7b86310dc6300495e39eb91b641-2400x1296.jpg%3Ffm%3Dwebp&w=3840&q=75' },
    { id: 28, name: 'Graphic Design', description: 'Creative graphic design services for branding, logos, and marketing materials.', imageUrl: 'https://www.stephensplumbing.net/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Faly8i58a%2Fproduction%2F83aaa0696d1fb7b86310dc6300495e39eb91b641-2400x1296.jpg%3Ffm%3Dwebp&w=3840&q=75' },
    { id: 29, name: 'Videography', description: 'Professional videography services for events, promotional videos, and more.', imageUrl: 'https://www.stephensplumbing.net/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Faly8i58a%2Fproduction%2F83aaa0696d1fb7b86310dc6300495e39eb91b641-2400x1296.jpg%3Ffm%3Dwebp&w=3840&q=75' },
    { id: 30, name: 'Tutoring', description: 'Personalized tutoring services for students of all ages and subjects.', imageUrl: 'https://www.stephensplumbing.net/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Faly8i58a%2Fproduction%2F83aaa0696d1fb7b86310dc6300495e39eb91b641-2400x1296.jpg%3Ffm%3Dwebp&w=3840&q=75' }
  ];


  filteredServices: Service[] = [];
  searchTerm: string = '';
  workers: Worker[] = [];
  private apiUrl = 'http://localhost:8000/api/workers';

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.filteredServices = this.services; 
  }

  getWorkers(serviceName: string): Observable<Worker[]> {
    return this.http.get<Worker[]>(`${this.apiUrl}?service=${serviceName}`);
  }

  viewWorkers(serviceName: string): void {
    this.getWorkers(serviceName).subscribe(
      (data) => {
        this.workers = data;
        this.router.navigate(['/services', serviceName]);
      },
      (error) => {
        console.error('Error fetching workers:', error);
      }
    );
  }

  filterServices(): void {
    const lowerCaseSearch = this.searchTerm.toLowerCase();
    this.filteredServices = this.services.filter(service =>
      service.name.toLowerCase().includes(lowerCaseSearch)
    );
  }
}
