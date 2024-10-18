import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElderlyRequestsComponent } from './elderly-requests.component';

describe('ElderlyRequestsComponent', () => {
  let component: ElderlyRequestsComponent;
  let fixture: ComponentFixture<ElderlyRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElderlyRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElderlyRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
