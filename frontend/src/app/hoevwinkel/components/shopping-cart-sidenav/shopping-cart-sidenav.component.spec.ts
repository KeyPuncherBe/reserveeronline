import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartSidenavComponent } from './shopping-cart-sidenav.component';

describe('ShoppingCartSidenavComponent', () => {
  let component: ShoppingCartSidenavComponent;
  let fixture: ComponentFixture<ShoppingCartSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCartSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
