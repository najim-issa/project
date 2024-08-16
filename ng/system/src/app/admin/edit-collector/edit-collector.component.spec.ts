import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCollectorComponent } from './edit-collector.component';

describe('EditCollectorComponent', () => {
  let component: EditCollectorComponent;
  let fixture: ComponentFixture<EditCollectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCollectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCollectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
