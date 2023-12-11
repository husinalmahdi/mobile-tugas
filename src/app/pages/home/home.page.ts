import { Component, OnInit, Input } from '@angular/core';
import { BeritaService } from 'src/app/services/berita.service';
import { ToastController, ModalController } from '@ionic/angular';
import { DetailPage } from '../../modals/detail/detail.page';
// import { FormNotePage } from '../../modals/form-berita/form-berita.page';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  listsNote: any;

  constructor(
    private beritaService: BeritaService,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public alertController: AlertController
  ) { }

  ngOnInit() {

  }
  // isModalOpen = false;

  // setOpen(isOpen: boolean) {
  //   this.isModalOpen = isOpen;
  // }
  // isModalOpen1 = false;

  // setOpen1(isOpen: boolean) {
  //   this.isModalOpen1= isOpen;
  // }
  // isModalOpen2 = false;

  // setOpen2(isOpen: boolean) {
  //   this.isModalOpen2 = isOpen;
  // }

  // isModalOpen3 = false;

  // setOpen3(isOpen: boolean) {
  //   this.isModalOpen3 = isOpen;
  // }
  // isModalOpen4 = false;

  // setOpen4(isOpen: boolean) {
  //   this.isModalOpen4 = isOpen;
  // }
  // isModalOpen5 = false;

  // setOpen5(isOpen: boolean) {
  //   this.isModalOpen5 = isOpen;
  // }
  
  // async presentAlert() {
  //   const alert = await this.alertController.create({
  //     header: 'Salahhh...',
  //     message: 'bukan yang ini lahhh',
  //     buttons: ['OK']
  //   });
  
  //   await alert.present();
  // }
  pengeluaran: number;
  pendapatan: number;
  total: number;
  bulan:any;
  ionViewWillEnter() {
    // MEMANGGIL API LIST NOTE
    this.beritaService.getListNote().subscribe(

      res => {
        console.log(this.bulan);
        if (res["result"] == "success") { // JIKA HASIL SUCCESS
          this.listsNote = res["data"];
          this.listsNote.forEach(item => {
            item.uang = Number(item.uang);
          });
          if(this.bulan){
          this.listsNote = this.listsNote.filter(item => item.kategori === this.bulan);
          }
           this.calculateTotalUangPengeluaran();
           this.calculateTotalUangPendapatan();
           this.calculateSaldo() ;
        } else { // JIKA HASIL ERROR

          this.presentToast(res["message"]);

        }
        console.log(res);
      },
      err => {
        console.log(err.error)
      }
    )
  }
  calculateTotalUangPengeluaran() {
    // Gunakan fungsi reduce untuk menjumlahkan nilai uang dari setiap item
    
    this.pengeluaran = this.listsNote.reduce((total, item) => {
      // Tambahkan nilai uang hanya jika kategori sama dengan 'pengeluaran'
      if (item.menu === 'pengeluaran') {
        total += item.uang;
      }
      return total;
    }, 0);
  
    console.log("Total Uang:", this.pengeluaran);
  }
  calculateTotalUangPendapatan() {
    // Gunakan fungsi reduce untuk menjumlahkan nilai uang dari setiap item
    
    this.pendapatan = this.listsNote.reduce((total, item) => {
      // Tambahkan nilai uang hanya jika kategori sama dengan 'pengeluaran'
      if (item.menu === 'pendapatan') {
        total += item.uang;
      }
      return total;
    }, 0);
  
    console.log("Total Uang:", this.pendapatan);
  }
  calculateSaldo() {
    // Hitung saldo sebagai selisih antara pendapatan dan pengeluaran
    this.total = this.pendapatan - this.pengeluaran;
    console.log("Saldo:", this.total);
  }
  
  
  //FUNCTION PRESENT TOAST
  async presentToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500
    });
    toast.present();
  }
  async modalDetail(i) {
    const modal = await this.modalCtrl.create({
      component: DetailPage,
      componentProps: {
        dataNote: this.listsNote[i]
      }
    });

    return await modal.present();
  }
  // listsNote: any;
  uang: number; // Add this line for the 'uang' property
  kategori:any;
  menu:any;
  tambahNote() {
    // Check if 'uang' is provided
    console.log(this.kategori);
    
    if (this.uang !== undefined && this.uang !== null) {
      // Create a new entr

      // Call your API to add the new entry
      this.beritaService.addNote(this.uang,this.kategori,this.menu).then(
        res => {
          
          if (res["result"] == "success") {
            // If successful, update the list of notes
            this.listsNote.unshift(this.uang,this.kategori,this.menu);
            this.presentToast("Note added successfully");
            // location.reload();

          } else {
            this.presentToast(res["message"]);
            // location.reload();
            this.presentToast("Note added successfully");
          }
        },
        err => {
          console.log(err.error);
        }
      );
  
      // Reset 'uang' after adding the entry
      this.uang = null;
    } else {
      this.presentToast("Please enter the amount of money.");
    }
  }
  hapusNote(noteId: number) {
    // Call your service method to delete the note
    this.beritaService.deleteNote(noteId).subscribe(
      res => {
        if (res["result"] == "success") {
          // If successful, remove the note from the listsNote array
          const index = this.listsNote.findIndex(note => note.id === noteId);
          if (index !== -1) {
            this.listsNote.splice(index, 1);
            this.presentToast("Note deleted successfully");
          } else {
            this.presentToast("Note not found in the list");
          }
        } else {
          this.presentToast(res["message"]);
        }
      },
      err => {
        console.log(err.error);
      }
    );
  }
//   hapusnote()
//  {
//   this.beritaService.getListNote().subscribe()
//  }

  // ... existing code ...

  // listsNote: any;

  // async modalFormNote() {

  //   const modal = await this.modalCtrl.create({
  //     component: FormNotePage
  //   });

  //   // KETIKA MODAL DI TUTUP
  //   modal.onWillDismiss().then(dataReturned => {

  //     if (dataReturned.data) {
  //       // TAMBAHKAN NOTE KE ARRAY PALING DEPAN
  //       this.listsNote.unshift(dataReturned.data);
  //     }

  //   });

  //   return await modal.present();
  // }
}