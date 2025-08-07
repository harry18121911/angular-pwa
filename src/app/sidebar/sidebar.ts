import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone:true,
  imports: [RouterLink,CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  public toggleSidebar() {
    let sidebar = document.getElementById("sidebar");
    let backdrop = document.getElementById("backdrop");
    if (sidebar && backdrop) {
      sidebar.classList.toggle("hidden")
      backdrop.classList.toggle("hidden")
    }

  }
}
