import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    public toastController: ToastController,
    public router: Router
    ) {}

  public calendarEventStringList = '';

  public titleText: string;
  public locationText: string;
  public startDateText = '2020-05-25';
  public startTimeText: string;
  public endTimeText: string;
  public endDateText: string;
  public id;

  async createEvent(){
    const toast = await this.toastController.create({
      header: 'Event has been created successfully',
      message: 'Click to Close',
      position: 'top',
      duration: 2000,
      buttons: [
        {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();

    this.id = Math.floor(Math.random() * 999999);
    this.calendarEventStringList = this.calendarEventStringList + this.titleText + ',' + this.locationText + ',' + this.startDateText 
    + ',' + this.startTimeText + ',' + this.endTimeText + ',' + this.endDateText + ',' + this.id + '|';

    this.router.navigate(['tabs/tab1'], {queryParams: {
      calendarEventStringList: this.calendarEventStringList,
    }});  }
}
