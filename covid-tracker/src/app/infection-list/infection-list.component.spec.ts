import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfectionListComponent } from './infection-list.component';

describe('InfectionListComponent', () => {
  let component: InfectionListComponent;
  let fixture: ComponentFixture<InfectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfectionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
