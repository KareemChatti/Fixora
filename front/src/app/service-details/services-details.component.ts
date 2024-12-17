import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-service-details',
    templateUrl: './service-details.component.html',
    styleUrls: ['./service-details.component.css'],
    standalone: false
})
export class ServiceDetailsComponent implements OnInit {
  serviceName: string = '';
  allWorkers: any[] = [];
  filteredWorkers: any[] = [];
  selectedWorker: any;
  showPopup: boolean = false;
  searchCity: string = '';  

  private apiUrl = 'http://localhost:8000/api/workers';

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.serviceName = this.route.snapshot.paramMap.get('serviceName')!;
    this.getAllWorkers().subscribe(workers => {
      this.allWorkers = workers;
      this.filterWorkersByService();
    });
  }

  getAllWorkers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  filterWorkersByService(): void {
    this.filteredWorkers = this.allWorkers.filter(worker =>
      worker.service === this.serviceName &&
      (!this.searchCity || worker.city.toLowerCase().includes(this.searchCity.toLowerCase()))
    );
  }

  viewWorkerDetails(worker: any): void {
    this.selectedWorker = worker;
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }
  
}
