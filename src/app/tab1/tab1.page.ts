import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { alertController } from '@ionic/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  public dataReceived = '';
  public calendarEventString = '';
  public calendarEventList = [];
  public deletedIdList = [];

  constructor(public activatedRoute: ActivatedRoute) {}

  ngOnInit(){
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
    eventDetail[2] = eventDetail[2].substring(0, 10);
    eventDetail[3] = eventDetail[3].substring(11, 16);
    eventDetail[4] = eventDetail[4].substring(11, 16);
    eventDetail[5] = eventDetail[5].substring(0, 10);

    if (this.calendarEventList.some(x => x.id === eventDetail[6]) === false
    && this.deletedIdList.some(x => x === eventDetail[6]) === false){
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

    this.calendarEventList.sort((a, b) => {
      if (a.startDateText > b.startDateText) {return 1; }
      else if (a.startDateText < b.startDateText) {return -1; }
      else {
          if (a.startTimeText > b.startTimeText) {return 1; }
          else if (a.startTimeText > b.startTimeText) {return -1; }
      }
    });

  }

  async deleteOneEvent(id: string){
    console.log(id);
    const alert = await alertController.create({
      header: 'Delete this event?',
      buttons: [{
        text: 'Yes',
        role: 'delete',
        handler: () => {
          this.calendarEventList = this.calendarEventList.filter(item => item.id !== id);
          this.deletedIdList.push(id);
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

  async deleteAllEvents(){
    const alert = await alertController.create({
      header: 'Are you sure to Delete all the events?',
      buttons: [{
        text: 'Yes',
        role: 'delete',
        handler: () => {
          for (let event of this.calendarEventList){
            console.log(event.id);
            this.deletedIdList.push(event.id);
          }
          this.calendarEventList = [];
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
