import { Component, Input, OnInit } from '@angular/core';
import { Paiement } from 'src/app/models/paiment';
import { User } from 'src/app/models/user';
import { Paiementervice } from 'src/app/shares/services/paiement.service';

@Component({
  selector: 'app-paiement-user',
  templateUrl: './paiement-user.component.html',
  styleUrls: ['./paiement-user.component.scss']
})
export class PaiementUserComponent implements OnInit {

  paiements: Paiement[] = [];
  @Input() user = new User();

  constructor(private service: Paiementervice) { }

  ngOnInit(): void {
    this.all();
  }

  
  all() {
    this.service.all().subscribe(
      (data) => {
        if (data != null && data.length > 0) {
          this.paiements = data;
        }
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }
}
