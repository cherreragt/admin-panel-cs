import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { AdminsService } from 'src/app/services/admins.service';
import { ServerService } from 'src/app/services/server.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title:string = "Example";
  
  doughnutChartLabels: Label[] = ['Servers', 'Admins Active', 'Admins Expired'];
  doughnutChartData: MultiDataSet = [
    [2, 15, 7]
  ];
  doughnutChartType: ChartType = 'line';
  colors:Color[] = [
    { backgroundColor: '#c76e00' }
  ];

  servers:any = [];
  admins:any = [];
  constructor(private server:ServerService, private adminsService:AdminsService) { }

  ngOnInit(): void {
    this.server.getServers().subscribe(({msg}:any) => {
      this.servers = msg;
    });
  }

}
