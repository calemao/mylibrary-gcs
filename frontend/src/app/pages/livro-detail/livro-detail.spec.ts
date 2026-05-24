import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroDetail } from './livro-detail';

describe('LivroDetail', () => {
  let component: LivroDetail;
  let fixture: ComponentFixture<LivroDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivroDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(LivroDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
