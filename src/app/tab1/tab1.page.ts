import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  public dataReceived = '';
  public calendarEventStringList = '';
  public calendarEventList = [];

  constructor(public activatedRoute: ActivatedRoute) {
  }

  async ngOnInit(){
    await this.activatedRoute.queryParams.subscribe((data) => {
      this.dataReceived = JSON.stringify(data);
      const obj = JSON.parse(this.dataReceived);
      this.calendarEventStringList = obj.calendarEventStringList;
      if (this.calendarEventStringList !== undefined){
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
    this.calendarEventList = [];
    // console.log('Whole String: ' + this.calendarEventStringList);
    const eventList = this.calendarEventStringList.split('|');
    for (const event of eventList) {
      if (event !== '') {
        // console.log('One Event: ' + event);
        let eventDetail = event.split(',');
        // console.log('List: ' + eventDetail);
        eventDetail[3] = eventDetail[3].substring(11, 16);
        eventDetail[4] = eventDetail[4].substring(11, 16);

        this.calendarEventList.push({
          titleText: eventDetail[0],
          locationText: eventDetail[1],
          startDateText: eventDetail[2],
          startTimeText: eventDetail[3],
          endTimeText: eventDetail[4],
          endDateText: eventDetail[5],
          id: eventDetail[6]
        });
        // console.log(this.calendarEventList);
      }
    }
  }

  deleteEvent(id: string){
    console.log(id);
    this.calendarEventList = this.calendarEventList.filter(item => item.id !== id);
  }





}
