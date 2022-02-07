import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementUserComponent } from './paiement-user.component';

describe('PaiementUserComponent', () => {
  let component: PaiementUserComponent;
  let fixture: ComponentFixture<PaiementUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaiementUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaiementUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
