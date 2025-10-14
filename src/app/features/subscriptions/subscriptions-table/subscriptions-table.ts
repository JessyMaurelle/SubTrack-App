import { Component,computed,effect,inject,OnInit, signal, ViewChild } from '@angular/core';
import { Subscription } from '../subscriptions.model';
import { take } from 'rxjs';
import { Subscriptions } from '../subscriptions';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { AddEditDialog } from '../add-edit-dialog/add-edit-dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';


@Component({
  selector: 'app-subscriptions-table',
  imports: [CommonModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule,
    MatIconModule, MatButtonModule, MatTooltipModule, MatToolbar, MatOptionModule, MatSelectModule, MatChipsModule, MatSnackBarModule],
  templateUrl: './subscriptions-table.html',
  styleUrl: './subscriptions-table.scss'
})
export class SubscriptionsTable  {

    //public subscriptions :Subscription[] =[] ;
  private api = inject(Subscriptions);
  
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  //dataSource = new MatTableDataSource<Subscription>([]);
  //loading = true;
  //error: string | null = null;
  displayedColumns: string[] = ['name', 'category', 'cycle', 'price', 'nextChargeDate','status', 'actions'];
  categories: string[] = ['Streaming','Music','Internet','Cloud','Other'];
  //selectedCategory = '';
  //selectedStatus= '';
 // searchValue = '';
  //nextFive: string[] = [];

  //Signals
  subscriptions = signal<Subscription[]>([]);
  loading = signal(true);
  error = signal <string | null> (null);
  
  search = signal('');
  selectedCategory = signal('');
  selectedStatus = signal('');
  currentPage = signal(0);                     // ✅ pagination
  pageSize = signal(5);
  nextFive = computed(() => {
    return [...this.subscriptions()]
      .filter(s => s.nextChargeDate)
      .sort(
        (a, b) =>
          new Date(a.nextChargeDate).getTime() -
          new Date(b.nextChargeDate).getTime()
      )
      .slice(0, 5)
      .map(s => s.id);
  });
  

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator! : MatPaginator;

  /*ngAfterViewInit() : void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }*/

  

  /*ngOnInit(): void {
    this.load();
  }*/
 constructor(){
  effect(() => {this.load();});
 }



private load():void{
 /* this.api.getAllSubscriptions().subscribe({
    next:(rows:Subscription[]):void => {
      this.dataSource.data = rows ?? [];
      this.loading = false;
    console.log('rows', rows);

    // for the 5 next abos per date
    this.nextFive = [...this.dataSource.data]
    .filter(s=> s.nextChargeDate)
    .sort((a, b) => new Date(a.nextChargeDate).getTime() - new Date(b.nextChargeDate).getTime())
    .slice(0, 5)
    .map(s=>s.id);
  }
  });*/
  this.loading.set(true);
  this.api.getAllSubscriptions().subscribe({
    next: (rows) => {
      this.subscriptions.set(rows??[]);
      this.loading.set(false);
    },
    error: () => this.loading.set(false)
  });
}

showMessage(message: string, type: 'success' | 'error') {
  this.snackBar.open(message, 'Close', {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: type === 'success' ? ['success-snackbar'] : ['error-snackbar']
  });
}

onAdd(){
  const dialogRef = this.dialog.open(AddEditDialog, {
    width:'1000px',
    data: { mode:'add', categories: this.categories}
  });
  dialogRef.afterClosed().subscribe(result=>{
    if(result){
      this.api.createSubscription(result).subscribe((newSub)=> {
        //this.subscriptions.update((subs) => [...subs, newSub]);        
        this.load();
        this.showMessage('✅ Subscription added successfully!', 'success');
    });
    }
  });
}

onEdit(row:Subscription){
  const dialogRef = this.dialog.open(AddEditDialog, {
    width:'1000px',
    data: { mode:'edit',subscription: row, categories: this.categories}
  });
  dialogRef.afterClosed().subscribe(result=>{
    if(result){
      this.api.updateSubscription(row.id,result).subscribe(()=> {
        this.load();
        this.showMessage('✅ Subscription updated successfully!', 'success');
    });
    }
  });
}

onDelete(row:Subscription){
 /* if (confirm(`Delete subscription "${row.name}" ?`)) {
    this.api.deleteSubscription(row.id).subscribe(() => {
      this.load();
      this.showMessage('🗑️ Subscription deleted!', 'error');
    });
  }*/

      const dialogRef = this.dialog.open(ConfirmDialog, {
        width: '300px',
        data: { message: `Delete subscription "${row.name}" ?` }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.api.deleteSubscription(row.id).subscribe(() => {
            this.load();
            this.showMessage('🗑️ Subscription deleted!', 'error');
          });
        }
      });
    
    
}

// === COMBINAISONS automatiques avec computed() ===
filteredSubscriptions = computed(() => {
  const all = this.subscriptions();
  const search = this.search().toLowerCase();
  const cat = this.selectedCategory();
  const stat = this.selectedStatus();

  return all.filter(s =>
    (!cat || s.category.toLowerCase() === cat.toLowerCase()) &&
    (!stat || s.status.toLowerCase() === stat.toLowerCase()) &&
    (!search || s.name.toLowerCase().includes(search))
  );
});

paginatedSubscriptions = computed(() => {
  const start = this.currentPage() * this.pageSize();
  const end = start + this.pageSize();
  return this.filteredSubscriptions().slice(start, end);
});

// === Gestion du paginator ===
onPageChange(event: any) {
  this.currentPage.set(event.pageIndex);
  this.pageSize.set(event.pageSize);
}


applyFilter(event: Event){
  //const filterValue = (event?.target as HTMLInputElement).value.trim().toLowerCase();
  //this.searchValue = filterValue;
  //this.dataSource.filter = filterValue;
  const value = (event?.target as HTMLInputElement).value;
  this.search.set(value.trim().toLowerCase());
}

applyCategoryFilter(value: string) {
  this.selectedCategory.set(value);
}

applyStatusFilter(value: string) {
  this.selectedStatus.set(value);
}

resetFilters() {
  this.search.set('');
  this.selectedCategory.set('');
  this.selectedStatus.set('');
}

clearSearch() {
  this.search.set('') ;
  //this.dataSource.filter = '';
}

/*applyCategoryFilter(category: string) {
  this.selectedCategory = category;
  this.dataSource.filterPredicate = (data: Subscription, filter: string) => {
    return !category || data.category.toLowerCase() === category.toLowerCase();
  };
  this.dataSource.filter = '' + Math.random(); // force refresh
}

applyStatusFilter(status: string) {
  this.selectedStatus = status;
  this.dataSource.filterPredicate = (data: Subscription, filter: string) => {
    return !status || data.status.toLowerCase() === status.toLowerCase();
  };
  this.dataSource.filter = '' + Math.random();
}

resetFilters():void{
  this.selectedCategory = '';
    this.selectedStatus = '';
    this.searchValue = '';
    this.dataSource.filter = '';
}*/

}