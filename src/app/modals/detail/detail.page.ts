import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  @Input() public dataNote: any;

  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {

  }

  //Tutup Modal
  async closeModal(data) {
    await this.modalCtrl.dismiss(data);
  }

}