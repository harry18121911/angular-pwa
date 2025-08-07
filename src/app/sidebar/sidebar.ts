import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
public toggleSidebar(){
    let sidebar= document.getElementById("sidebar");
    if(sidebar){
      sidebar.classList.toggle("hidden")
    }
  }
}
