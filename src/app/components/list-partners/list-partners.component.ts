import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Partner } from 'src/app/interfaces/partner.interface';
import { PartnerService } from 'src/app/services/partner.service';
import { ConfirmModalComponent } from '../modal/confirm-modal/confirm-modal.component';
import { EditModalComponent } from '../modal/edit-modal/edit-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-partners',
  templateUrl: './list-partners.component.html',
  styleUrls: ['./list-partners.component.scss']
})
export class ListPartnersComponent {


  isUserAuthenticated: boolean = false;

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      setTimeout(() => {
        this.verifyAcess(isAuthenticated);
      });
    });
  }
  verifyAcess(isAuthenticated: boolean) {
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
    }
  }

  displayedColumns: string[] = ['id', 'name', 'description', 'repositoryGit', 'urlDoc', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Partner>([]);

  public confirmModal?: boolean;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getPartners();
  }

  constructor(private partnerService: PartnerService, public dialog: MatDialog, private _snackBar: MatSnackBar, private authService: AuthService, private router: Router, private changeDetector: ChangeDetectorRef) { }

  handleSharedUrlParameters() {
    const queryParams = new URLSearchParams(window.location.search);
    const sharedPage = queryParams.get('page');
    const sharedPageSize = queryParams.get('pageSize');



    if (sharedPage && sharedPageSize) {
      this.paginator.pageIndex = parseInt(sharedPage, 10);
      this.paginator.pageSize = parseInt(sharedPageSize, 10);

      this.getPartners();
    }
  }

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
      data: { data, extraValue: true },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.editPartner(result, data.id);
    });
  }


  getPartners() {
    this.partnerService.getAllPartner().subscribe(
      (response: Partner | Partner[]) => {
        const partners = Array.isArray(response) ? response : [response];
        this.dataSource.data = partners;
        this.handleSharedUrlParameters();
        this.changeDetector.detectChanges();
      },
      (error) => {
        console.error('Erro ao obter parceiros:', error);
      }
    );
  }


  editPartner(data: Partner, id: string) {
    this.partnerService.putByIdPartner(id, data).subscribe(
      (sucess) => {
        this.openSnackBar("Editado com Sucesso", "Ok");
      },
      (error) => {
        this.openSnackBar("Ocorreu um erro", "Ok");
        console.error('Erro ao obter parceiros:', error);
      }
    );
  }

  deletePartners(id: string) {
    this.openDialog('0ms', '0ms', 'Excluir', 'Deseja realmente excluir?')
      .then((confirmed: boolean) => {
        if (confirmed) {
          this.partnerService.deleteByIdPartner(id).subscribe(
            () => {
              this.partnerService.getAllPartner().subscribe(
                (response: Partner | Partner[]) => {
                  const partners = Array.isArray(response) ? response : [response];
                  this.dataSource.data = partners;
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
    const shareUrl = `${window.location.origin}/listar/parceiros?page=${currentPage}&pageSize=${pageSize}`;

    navigator.clipboard.writeText(shareUrl);
    this.openSnackBar('Link copiado para área de transferência!', 'Ok');
  }


}