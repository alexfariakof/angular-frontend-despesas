import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: '<div class="loading-modal spinner-border text-primary" role="status"></div>'
})

export class LoadingComponent {

  constructor() {}
}
