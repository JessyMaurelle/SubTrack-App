import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionsTable } from './subscriptions-table';

describe('SubscriptionsTable', () => {
  let component: SubscriptionsTable;
  let fixture: ComponentFixture<SubscriptionsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionsTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
