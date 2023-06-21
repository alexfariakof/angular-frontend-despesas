import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success-alert',
  templateUrl: './success-alert.component.html'  
})
export class SuccessAlertComponent {
  @Input() message:string ='';

}
