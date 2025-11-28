import { Component, inject } from '@angular/core';
import { Subscriptions } from './subscriptions/subscriptions';
import { Subscription } from './subscriptions/subscriptions.model';
import { CommonModule, DatePipe, CurrencyPipe, NgFor } from '@angular/common';
import { SettingService } from './setting-service';

@Component({
  selector: 'app-dashboard',
  imports: [DatePipe, CurrencyPipe, CommonModule, NgFor],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  private api = inject(Subscriptions);
  settings = inject(SettingService);

  subscriptions: Subscription[] = [];
  totalYearly = 0;
  totalMonthly = 0;
  priceIncrease = 0;
  next: Subscription[] = [];


      ngOnInit() {
        this.api.getAllSubscriptions().subscribe(data => {
          // 🧩 Normalisation des données reçues du backend
      this.subscriptions = data.map(s => ({
        ...s,
        cycle: s.cycle ? s.cycle.charAt(0).toUpperCase() + s.cycle.slice(1).toLowerCase() : '',
        status: s.status ? s.status.charAt(0).toUpperCase() + s.status.slice(1).toLowerCase() : '',
        category: s.category ? s.category.charAt(0).toUpperCase() + s.category.slice(1).toLowerCase() : '',
        price: s.price || 0
      }));
    
          // total monthly
          this.totalMonthly= this.subscriptions
            .filter(s => s.cycle.toLowerCase() === 'monthly')
            .reduce((sum, s) => sum + s.price, 0);
    
          // total yearly (abos yearly + monthly*12)
          this.totalYearly= this.subscriptions.reduce((sum, s) => {
            if (s.cycle.toLowerCase() === 'monthly') return sum + (s.price * 12);
            if (s.cycle.toLowerCase() === 'yearly') return sum + s.price;
            return sum;
          }, 0);
    
          // increases → TODO : compare with `oldPrice`
          this.priceIncrease= this.subscriptions.filter(s => s.oldPrice && s.price > s.oldPrice).length;
    
          // next abos per date
          this.next = [...this.subscriptions]
            .sort((a, b) => new Date(a.nextChargeDate).getTime() - new Date(b.nextChargeDate).getTime())
            .slice(0, 5);
        });
      }
    
  
}
