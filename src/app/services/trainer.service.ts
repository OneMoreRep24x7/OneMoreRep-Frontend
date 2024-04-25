import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Certificate, Trainer, TrainerProfileRequest, TrainerProfileResponse } from '../model/trainer.model';
import { CommonResponse } from '../model/auth.model';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
 

  private baseUrl = 'api/v1/trainer'; 
  

  constructor(private http: HttpClient) { }

  uploadCertificate(file: File, trainerId: string): Observable<any> {
    const formData = new FormData();
    formData.append('trainerId', trainerId);
    formData.append('files', file);

    return this.http.post<any>(`${this.baseUrl}/addCertificates`, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 413) {
          return throwError("File size is too large. Please upload a smaller file.");
        }
        return throwError("An error occurred while uploading the certificate.");
      })
    );
  }
  getTrainerCertificates(trainerId: string):Observable<Certificate[]> {
    const url = `${this.baseUrl}/getTrainerCertificates?trainerId=${trainerId}`;
   return this.http.get<Certificate[]>(url);
  }

  addTrainerProfile(profileRequest: TrainerProfileRequest, file:File):Observable<TrainerProfileResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('profileRequest', JSON.stringify(profileRequest));
    
    return this.http.post<TrainerProfileResponse>(`${this.baseUrl}/addProfile`,formData)
  }
  getTrainerById(trainerId: string) :Observable<TrainerProfileResponse> {
   const url = `${this.baseUrl}/getTrainerById?trainerId=${trainerId}`;
   return this.http.get<TrainerProfileResponse>(url);
  }

  getAllTrainers():Observable<Trainer[]> {
   return this.http.get<Trainer[]>(`${this.baseUrl}/getAllTrainers`)
  }
  editTrainerProfile(data: TrainerProfileRequest):Observable<TrainerProfileResponse> {
    return this.http.post<TrainerProfileResponse>(`${this.baseUrl}/editTrainerProfile`,data);
  }
  unblockTrainer(trainerId: string):Observable<CommonResponse> {
    const url = `${this.baseUrl}/unBlockTrainer?trainerId=${trainerId}`;
    return this.http.get<CommonResponse>(url);
  }
  blockTrainer(trainerId: string):Observable<CommonResponse>{
    const url = `${this.baseUrl}/blockTrainer?trainerId=${trainerId}`;
    return this.http.get<CommonResponse>(url);

  }

  
}
