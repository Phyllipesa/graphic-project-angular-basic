import { Component, OnInit } from '@angular/core';
import { Data } from '../../_models/Data';
import { VendasService } from '../../services/vendas.service';
import { EChartsOption } from 'echarts'
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';

@Component({
  selector: 'app-stacked',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './stacked.component.html',
  styleUrl: './stacked.component.css',
  providers: [
    provideEcharts()
  ]
})
export class StackedComponent implements OnInit {

  data: Data[]=[]; 

  constructor(private vendasService: VendasService) { }

  ngOnInit(): void {
    this.loadData();
  }

  chartOptions: EChartsOption = {};

  loadData() {
    this.vendasService.getGraphicInfo("toStacked").subscribe((response) => {
      this.data = response;
      this.loadCharOptions();
    });
  }

  loadCharOptions() {
  }
}