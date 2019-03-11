import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
// import { ElectronService } from 'ngx-electron';
import { ElectronService } from 'src/providers/electron.service';
// import * as electron from 'electron';



type AOA = any[][];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title = 'Time Office Rectifier';

  constructor(public electronService: ElectronService,
    private ngZone: NgZone,
    private router: Router) {
    
  }

  ngOnInit() {
    debugger;
    this.electronService.ipcRenderer.on('process-bifurcation', (event, arg) => {
      this.ngZone.run(() => {
        this.router.navigate(['/bifurcation']);
      });
    });
  }


}
