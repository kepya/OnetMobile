import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-telephone',
  templateUrl: './telephone.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./telephone.component.scss']
})
export class TelephoneComponent implements OnInit {

  urls: any[] = [];

  constructor(private router: Router, private ref: ChangeDetectorRef) { 
    this.router.events
    .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
    .subscribe((events: RoutesRecognized[]) => {
      console.log('previous url', events[0].urlAfterRedirects);
      console.log('current url', events[1].urlAfterRedirects);

      this.urls.push(events[0].urlAfterRedirects.slice(1));
      console.log('url', this.urls);
      // require view to be updated
      this.ref.markForCheck();
    });
  }

  ngOnInit(): void {

  }

}
