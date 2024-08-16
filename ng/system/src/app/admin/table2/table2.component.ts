import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CollectorService } from '../services/collector.service';

@Component({
  selector: 'app-table2',
  templateUrl: './table2.component.html',
  styleUrls: ['./table2.component.css']
})
export class Table2Component implements OnInit {
editCollector(arg0: any) {
throw new Error('Method not implemented.');
}
openAddEditPdetails(_t81: any) {
throw new Error('Method not implemented.');
}
deleteDetails(arg0: any) {
throw new Error('Method not implemented.');
}
  displayedColumns: string[] = ['id', 'name', 'email', 'phone_number', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private collectorService: CollectorService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCollectorsFromLocalStorage();
  }

  loadCollectorsFromLocalStorage() {
    const localCollectors = localStorage.getItem('collectors');

    if (localCollectors) {
      const parsedCollectors = JSON.parse(localCollectors);
      this.dataSource = new MatTableDataSource(parsedCollectors.data.map((item: any) => ({
        id: item.collectorId,
        name: item.user.name,
        email: item.user.email,
        phone_number: item.user.phone_number
      })));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      console.error('No data found in local storage');
      this.collectorService.getCollectors().subscribe(); // Fetch from API if local storage is empty
    }
  }

  deleteCollector(id: number) {
    this.collectorService.deleteUser(id).subscribe(
      () => {
        this.loadCollectorsFromLocalStorage(); // Refresh the collector list after deletion
        this.snackBar.open('Collector deleted successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });
      },
      (error) => {
        console.error('Error deleting collector', error);
        this.snackBar.open('Error deleting collector. Please try again.', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
