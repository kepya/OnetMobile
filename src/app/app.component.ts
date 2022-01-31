import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'onetMobile';

  showModal: boolean = false;

  getEvent(event) {
    if (event != null && event != '') {
      // alert('ok ' + JSON.stringify(event));
      this.showModal = true;
    } else {
      this.showModal = false;
    }

    console.log('Event: ' + event);
  }
}
