import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { alertController } from '@ionic/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{
  public dataReceived = '';
  public calendarEventString = '';
  public calendarEventList = [];
  public deletedId;

  constructor(public activatedRoute: ActivatedRoute) {
  }

  ionViewWillEnter(){
    this.activatedRoute.queryParams.subscribe((data) => {
      this.dataReceived = JSON.stringify(data);
      const transferObject = JSON.parse(this.dataReceived);
      this.calendarEventString = transferObject.calendarEventString;
      if (this.calendarEventString !== undefined){
        this.convertToList();
      }
    });
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  convertToList(){
    const eventDetail = this.calendarEventString.split(',');
    eventDetail[3] = eventDetail[3].substring(11, 16);
    eventDetail[4] = eventDetail[4].substring(11, 16);

    if (this.calendarEventList.some(x => x.id === eventDetail[6]) === false && eventDetail[6] !== this.deletedId){
      this.calendarEventList.push({
        titleText: eventDetail[0],
        locationText: eventDetail[1],
        startDateText: eventDetail[2],
        startTimeText: eventDetail[3],
        endTimeText: eventDetail[4],
        endDateText: eventDetail[5],
        id: eventDetail[6]
      });
    }
  }

  async requestConfirm(id: string){
    console.log(id);
    const alert = await alertController.create({
      header: 'Delete this event',
      buttons: [{
        text: 'Yes',
        role: 'delete',
        handler: () => {
          this.calendarEventList = this.calendarEventList.filter(item => item.id !== id);
          this.deletedId = id;
        }
      },
      {
        text: 'No',
        role: 'cancel'
      }
    ]
    });

    await alert.present();
  }





}
