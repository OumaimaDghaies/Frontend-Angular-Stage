import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratordataComponent } from './collaboratordata.component';

describe('CollaboratordataComponent', () => {
  let component: CollaboratordataComponent;
  let fixture: ComponentFixture<CollaboratordataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaboratordataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollaboratordataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
