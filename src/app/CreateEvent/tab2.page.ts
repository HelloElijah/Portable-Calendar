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

  public calendarEventString = '';

  public titleText: string;
  public locationText: string;
  public startDateText = '2020-08-02';
  public startTimeText: string;
  public endTimeText: string;
  public endDateText: string;
  public id;

  public titleCheck = true;
  public locationCheck = true;
  public startTimeCheck = true;
  public endTimeCheck = true;
  public endDateCheck = true;

  public errorMessage: string;

  async createEvent(){
    this.resetCheck();
    const check = this.validateInput();

    if (check === true) {
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

      this.id = Math.floor(Math.random() * 99999999);
      this.calendarEventString = this.titleText + ',' + this.locationText + ',' + this.startDateText
      + ',' + this.startTimeText + ',' + this.endTimeText + ',' + this.endDateText + ',' + this.id;
      this.router.navigate(['tabs/tab1'], {queryParams: {
        calendarEventString: this.calendarEventString,
      }});
      this.resetText();
    }

    else {
      const toast = await this.toastController.create({
        header: this.errorMessage,
        message: 'Click to Close',
        position: 'bottom',
        duration: 6000,
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
    }

  }

  validateInput(){
    if (this.endTimeText === undefined){
      this.endTimeCheck = false;
      this.errorMessage = 'Whoops, you need to Enter end time';
    }
    else if (this.endTimeText < this.startTimeText && this.endDateText.substring(0, 10) === this.startDateText){
      this.endTimeCheck = false;
      this.errorMessage = 'Whoops, End time should be after Start time';
    }
    if (this.endDateText === undefined){
      this.endDateCheck = false;
      this.errorMessage = 'Whoops, you need to Enter end date';
    }
    else if (this.endDateText < this.startDateText){
      this.endDateCheck = false;
      this.errorMessage = 'Whoops, End date should be after Start date';
    }

    if (this.startTimeText === undefined){
      this.startTimeCheck = false;
      this.errorMessage = 'Whoops, you need to Enter start time';
    }
    if (this.locationText === undefined){
      this.locationCheck = false;
      this.errorMessage = 'Whoops, you need to Enter the location';
    }
    if (this.titleText === undefined){
      this.titleCheck = false;
      this.errorMessage = 'Whoops, you need to Enter the title';
    }
    return this.titleCheck && this.locationCheck && this.startTimeCheck && this.endTimeCheck && this.endDateCheck;
  }

  resetCheck(){
    this.titleCheck = true;
    this.locationCheck = true;
    this.startTimeCheck = true;
    this.endTimeCheck = true;
    this.endDateCheck = true;
  }

  resetText(){
    this.titleText = undefined;
    this.locationText = undefined;
    this.startTimeText = undefined;
    this.endTimeText = undefined;
    this.endDateText = undefined;
  }

}
