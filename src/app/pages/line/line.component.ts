import { Component, OnInit } from '@angular/core';
import { VendasService } from '../../services/vendas.service';
import { EChartsOption } from 'echarts'
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { Line } from '../../_models/Line';

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

  data!: Line;
  chartOptions: EChartsOption = {};

  constructor(private vendasService: VendasService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.vendasService.getGraphicInfo<Line[]>("toLine").subscribe((response) => {
      if (response) {
        this.data = response[0];
        this.loadCharOptions();
      }
    });
  }

  loadCharOptions() {
    const { datas, vendasDia } = this.data

    this.chartOptions = {
      xAxis: {
        type: 'category',
        data: datas
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: vendasDia,
          type: 'line'
        }
      ]
    };
  }
}