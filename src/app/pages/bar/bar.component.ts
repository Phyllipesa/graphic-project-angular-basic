import { Component, OnInit } from '@angular/core';
import { Data } from '../../_models/Data';
import { VendasService } from '../../services/vendas.service';
import { EChartsOption } from 'echarts'
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.css',
  providers: [
    provideEcharts()
  ]
})
export class BarComponent implements OnInit {

  categories: string[]=[]; 
  values: number[]=[]; 


  constructor(private vendasService: VendasService) { }

  ngOnInit(): void {
    this.loadData();
  }

  chartOptions: EChartsOption = {};

  loadData() {
    this.vendasService.getGraphicInfo("toBar").subscribe((response) => {
      this.categories = response.map((each) => each.name);
      this.values = response.map((each) => each.value);
      this.loadChartOptions();
    });
  }

  loadChartOptions() {
    this.chartOptions = {
      xAxis: {
        type: 'category',
        data: this.categories,
        axisLabel: {
          interval: 45,
          rotate: 0
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Vendas (unit)',
          data: this.values,
          type: 'bar',
          label: {
            show: true,
            position: 'top',
            formatter: '{c} units'
          }
        }
      ]
    };
  }
}