import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'examples',
    async loadComponent() {
      const module = await import('./examples/examples.component');
      return module.ExamplesComponent;
    },
  },
  {
    path: 'architecture',
    async loadComponent() {
      const module = await import('./architecture/architecture.component');
      return module.ArchitectureComponent;
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
