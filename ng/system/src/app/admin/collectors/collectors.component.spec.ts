import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectorsComponent } from './collectors.component';

describe('CollectorsComponent', () => {
  let component: CollectorsComponent;
  let fixture: ComponentFixture<CollectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
