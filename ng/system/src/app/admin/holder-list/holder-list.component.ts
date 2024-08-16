import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../services/user.service';
import { EditdetailsComponent } from '../editdetails/editdetails.component';

@Component({
  selector: 'app-holder-list',
  templateUrl: './holder-list.component.html',
  styleUrls: ['./holder-list.component.css']
})
export class HolderListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone_number', 'shehia', 'action',];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        // Ensure data is an array
        this.dataSource = new MatTableDataSource(data.data || data); // Adjust as needed
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          const dataStr = `${data.name} ${data.email} ${data.phone_number} ${data.shehia} `.toLowerCase();
          return dataStr.includes(filter.trim().toLowerCase());
        };
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  deleteDetails(id: number) {
    this.userService.deleteUser(id).subscribe(
      (response) => {
        console.log('User deleted successfully', response);
        this.fetchUsers(); // Refresh the user list after deletion
      },
      (error) => {
        console.error('Error deleting user', error);
      }
    );
  }

  openAddEditPdetails(user: any): void {
    const dialogRef = this.dialog.open(EditdetailsComponent, {
      width: '400px',
      data: {
        user: user,
        isNew: !user
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.isNew) {
          // Logic for creating a new user can be handled here
          console.log('New user data:', result);
        } else {
          // Logic for updating the existing user
          this.userService.updateUser(result.id, result).subscribe(
            (response) => {
              console.log('User updated successfully', response);
              this.fetchUsers(); // Refresh the user list after updating
            },
            (error) => {
              console.error('Error updating user', error);
            }
          );
        }
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
