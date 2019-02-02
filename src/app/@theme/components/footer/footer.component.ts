import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created By Khaled Ouertani</span>
    <div class="socials">
      <a href="https://github.com/Godfatherlolz" target="_blank" class="ion ion-social-github"></a>
      <a href="https://www.facebook.com/khaled.ouertani" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://twitter.com/Khaled_Ouertani" target="_blank" class="ion ion-social-twitter"></a>
      <a href="https://www.linkedin.com/in/khaled-ouertani/" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
