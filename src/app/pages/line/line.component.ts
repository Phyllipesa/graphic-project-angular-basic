import { Component, OnInit } from '@angular/core';
import { VendasService } from '../../services/vendas.service';
import { EChartsOption } from 'echarts'
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';

@Component({
  selector: 'app-line',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './line.component.html',
  styleUrl: './line.component.css',
  providers: [
    provideEcharts()
  ]
})

export class LineComponent implements OnInit {

  dates: string[]=[]; 
  values: number[]=[]; 

  constructor(private vendasService: VendasService) { }

  ngOnInit(): void {
    this.loadData();
  }

  chartOptions: EChartsOption = {};

  loadData() {
    this.vendasService.getGraphicInfo("toLine").subscribe((response) => {
      this.dates = response.map((each) => each.name);
      this.values = response.map((each) => each.value);

      console.log(this.dates);
      console.log(this.values);
      
      this.loadCharOptions();
    });
  }

  loadCharOptions() {
    this.chartOptions = {
      xAxis: {
        type: 'category',
        data: this.dates
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: this.values,
          type: 'line'
        }
      ]
    };
  }
}