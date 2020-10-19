import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  order$;
  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) { 
    this.order$ = authService.user$.switchMap(u => orderService.getOrdersByUser(u.uid));
  }

  ngOnInit(): void {
  }

}
