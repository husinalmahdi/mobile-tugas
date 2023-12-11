import { Component } from '@angular/core';
import { BeritaService } from 'src/app/services/berita.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private noteService: BeritaService,
    public toastCtrl: ToastController,
  ) { }

}
