import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPlacesComponent } from './register-places.component';

describe('RegisterPlacesComponent', () => {
  let component: RegisterPlacesComponent;
  let fixture: ComponentFixture<RegisterPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPlacesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
