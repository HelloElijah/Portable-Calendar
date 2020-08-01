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

  constructor(public activatedRoute: ActivatedRoute) {
  }

  async ngOnInit(){
    await this.activatedRoute.queryParams.subscribe((data) => {
      this.dataReceived = JSON.stringify(data);
      const obj = JSON.parse(this.dataReceived);
      this.calendarEventString = obj.calendarEventString;
      if (this.calendarEventString !== undefined){
        this.convertToList();
      }


      // this.calendarEvent.titleText = obj.titleText;
      // this.calendarEvent.locationText = obj.locationText;
      // // this.calendarEvent.startDateText = obj.startDateText.split('T', 2)[0];
      // // this.calendarEvent.startTimeText = obj.startTimeText.split('T', 2)[1].substring(0, 5);
      // // this.calendarEvent.endTimeText = obj.endTimeText.split('T', 2)[1].substring(0, 5);
      // // this.calendarEvent.endDateText = obj.endDateText.split('T', 2)[0];
      // this.calendarEvent.startDateText = obj.startDateText.substring(0, 10);
      // this.calendarEvent.startTimeText = obj.startTimeText.substring(11, 16);
      // this.calendarEvent.endTimeText = obj.endTimeText.substring(11, 16);
      // this.calendarEvent.endDateText = obj.endDateText.substring(0, 10);
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
    // this.calendarEventList = [];
    // console.log('Whole String: ' + this.calendarEventStringList);
    // const eventList = this.calendarEventStringList.split('|');
    if (this.calendarEventString !== '') {
      // console.log('One Event: ' + event);
      const eventDetail = this.calendarEventString.split(',');
      console.log('List: ' + eventDetail);
      console.log(eventDetail[6]);
      eventDetail[3] = eventDetail[3].substring(11, 16);
      eventDetail[4] = eventDetail[4].substring(11, 16);

      console.log(this.calendarEventList);


      if (this.calendarEventList.some(x => x.id === eventDetail[6]) === false){
        console.log('Here');
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
      console.log(this.calendarEventList);
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
