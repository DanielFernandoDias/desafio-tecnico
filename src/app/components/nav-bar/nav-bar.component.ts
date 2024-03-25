import { AfterContentChecked, AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  isUserAuthenticated: boolean = false;
  toolbarName: string = '';

  public routesMap: { [key: string]: string } = {
    'cadastro/parceiro': 'Cadastro Parceiro',
    'cadastro/empresa-externa': 'Cadastro Empresa Externa',
    'listar/parceiros': 'Listar Parceiros',
    'listar/empresa-externa': 'Listar Empresas Externas',
    'sobre': 'Bem vindo!'
  };

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      map(route => route.snapshot.url.join('/'))
    ).subscribe(url => {
      this.toolbarName = this.routesMap[url]; // Define o nome do toolbar baseado na rota atual
    });
  }


  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      setTimeout(() => {
        this.isUserAuthenticated = isAuthenticated;
      });
    });
  }

  logout(): void {
    this.authService.setAuthenticated(false);
    this.router.navigate(['/login']);
  }
}
