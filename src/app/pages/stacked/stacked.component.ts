import { Component, OnInit } from '@angular/core';
import { VendasService } from '../../services/vendas.service';
import { EChartsOption } from 'echarts'
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { Stacked } from '../../_models/Stacked';

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
  
  data!: Stacked;
  chartOptions: EChartsOption = {};

  constructor(private vendasService: VendasService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.vendasService.getGraphicInfo<Stacked[]>("toStacked").subscribe((response) => {
      if (response) {
        this.data = response[0];
        this.loadCharOptions();
      }
    });
  }

  loadCharOptions() {
    const { categorias, rawData, totalData } = this.data;
    const series: echarts.BarSeriesOption[] = [
        'Quantidade de Vendas',
        'Quantidade de itens vendidos',
    ].map((name, sid) => {
        return {
            name,
            type: 'bar',
            stack: 'total',  // Empilhar as barras
            barWidth: '60%',
            label: {
                show: true,
                formatter: (params: any) => Math.round(params.value * 1000) / 10 + '%'
            },
            data: rawData[sid].map((d, did) =>
              totalData[did] <= 0 ? 0 : d / totalData[did])
        };
    });
    
    this.chartOptions = {
      legend: {
        selectedMode: false
      },
      grid: {
        left: 100,
        right: 50,
        top: 50,
        bottom: 50
      },
      xAxis: {
          type: 'category',
          data: categorias
      },
      yAxis: {
          type: 'value'
      },
      series
      };
  }
}