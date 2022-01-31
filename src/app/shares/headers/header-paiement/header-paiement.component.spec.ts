import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPaiementComponent } from './header-paiement.component';

describe('HeaderPaiementComponent', () => {
  let component: HeaderPaiementComponent;
  let fixture: ComponentFixture<HeaderPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderPaiementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
