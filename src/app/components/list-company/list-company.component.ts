import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Company } from 'src/app/interfaces/company.interface';
import { CompanyService } from 'src/app/services/company.service';
import { ConfirmModalComponent } from '../modal/confirm-modal/confirm-modal.component';
import { EditModalComponent } from '../modal/edit-modal/edit-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.scss']
})
export class ListCompanyComponent implements OnInit{

  isUserAuthenticated: boolean = false;

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      setTimeout(() => {
        this.verifyAcess(isAuthenticated);
      });
    });


  }


  handleSharedUrlParameters() {
    const queryParams = new URLSearchParams(window.location.search);
    const sharedPage = queryParams.get('page');
    const sharedPageSize = queryParams.get('pageSize');



    if (sharedPage && sharedPageSize) {
      this.paginator.pageIndex = parseInt(sharedPage, 10);
      this.paginator.pageSize = parseInt(sharedPageSize, 10);

      this.getCompany();
    }
  }

  verifyAcess(isAuthenticated: boolean) {
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
    }
  }



  displayedColumns: string[] = ['id', 'companyName', 'collaboratorsCount', 'isActive', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Company>([]);

  public confirmModal?: boolean;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getCompany();
  }

  constructor(private companyService: CompanyService, public dialog: MatDialog, private _snackBar: MatSnackBar, private authService: AuthService, private router: Router, private route: ActivatedRoute, private changeDetector: ChangeDetectorRef) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, title: string, description: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const dialogRef = this.dialog.open(ConfirmModalComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
        data: { title, description }
      });

      dialogRef.afterClosed().subscribe(result => {
        resolve(result === true);
      });
    });
  }


  openDialogEdit(data: any): void {
    const dialogRef = this.dialog.open(EditModalComponent, {
      data: { data, extraValue: false },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.editPartner(result, data.id);
    });
  }



  getCompany() {
    this.companyService.getAllCompany().subscribe(
      (response: Company | Company[]) => {
        const Company = Array.isArray(response) ? response : [response];
        this.dataSource.data = Company;
        this.handleSharedUrlParameters();
        this.changeDetector.detectChanges();
      },
      (error) => {
        console.error('Erro ao obter parceiros:', error);
      }
    );
  }


  editPartner(data: Company, id: string) {
    this.companyService.putByIdCompany(id, data).subscribe(
      (sucess) => {
        this.openSnackBar("Editado com Sucesso", "Ok");
      },
      (error) => {
        this.openSnackBar("Ocorreu um erro", "Ok");
        console.error('Erro ao obter parceiros:', error);
      }
    );
  }

  deleteCompany(id: string) {
    this.openDialog('0ms', '0ms', 'Excluir', 'Deseja realmente excluir?')
      .then((confirmed: boolean) => {
        if (confirmed) {
          this.companyService.deleteByIdCompany(id).subscribe(
            () => {
              this.companyService.getAllCompany().subscribe(
                (response: Company | Company[]) => {
                  const Company = Array.isArray(response) ? response : [response];
                  this.dataSource.data = Company;
                  this.openSnackBar("Deletado com Sucesso", "Ok");
                },
              );
            },
            (error) => {
              this.openSnackBar("Ocorreu um erro", "Ok");
              console.error('Erro ao excluir parceiro:', error);
            }
          );
        }
      });
  }

  shareTable() {
    const currentPage = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;
    const shareUrl = `${window.location.origin}/listar/empresa-externa?page=${currentPage}&pageSize=${pageSize}`;

    navigator.clipboard.writeText(shareUrl);
    this.openSnackBar('Link copiado para área de transferência!', 'Ok');
  }



}
