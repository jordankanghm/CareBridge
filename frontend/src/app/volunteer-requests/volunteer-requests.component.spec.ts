import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerRequestsComponent } from './volunteer-requests.component';

describe('VolunteerRequestsComponent', () => {
  let component: VolunteerRequestsComponent;
  let fixture: ComponentFixture<VolunteerRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolunteerRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
