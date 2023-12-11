import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BeritaService {

  server: string = "https://monitoringiotjamur.my.id/";

  constructor(
    public http: HttpClient
  ) { }

//tes
  getListNote(): Observable<any[]> {
    return interval(5000)  
      .pipe(
        startWith(0),  // Start immediately
        switchMap(() => this.http.get<any[]>(this.server))
      );
  }

  getDetailNote(id) {
    return this.http.get(this.server + 'note/' + id);
  }

  addNote(uang,kategori,menu) {
    return this.http.post(this.server + 'add.php', { uang,kategori,menu }).toPromise()
      .then((res: any) => {
        if (res.result === 'success') {
          return { success: true, data: res.data };
        } else {
          return { success: false, message: res.message };
        }
      })
      .catch(error => {
        console.error('Error adding note:', error);
        return { success: false, message: 'An error occurred while adding the note.' };
      });
  }

  deleteNote(id) {
    return this.http.delete(this.server + 'delete.php/' + "?id="+id);
  }

}
