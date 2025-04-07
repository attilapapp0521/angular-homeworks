import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankPlatformComponent } from './rank-platform.component';

describe('RankPlatformComponent', () => {
  let component: RankPlatformComponent;
  let fixture: ComponentFixture<RankPlatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankPlatformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
