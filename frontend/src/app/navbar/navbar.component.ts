import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  template: `
    <nav class="navbar navbar-expand-lg bg-blue">
      <div class="container-fluid">
        <a class="navbar-brand f-quickdraw" href="/">QUICK DRAW</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="bi bi-list"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav ms-auto ">
            <a class="nav-link mx-3 f-poppins" aria-current="page" href="#">
              Architecture
            </a>
            <a
              class="nav-link mx-3 f-poppins"
              href="https://github.com/ivanlpc"
              target="_blank"
            >
              GitHub
            </a>
            <a class="nav-link mx-3 f-poppins" href="#">Examples</a>
          </div>
        </div>
      </div>
    </nav>
  `,
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {}
