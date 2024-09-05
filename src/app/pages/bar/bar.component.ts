import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { VendasService } from '../../services/vendas.service';
import { EChartsOption } from 'echarts'
import { Data } from '../../_models/Data';


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

  data: Data[]=[]; 

  constructor(private vendasService: VendasService) { }

  ngOnInit(): void {
    this.carregarDados();
  }

  chartOptions: EChartsOption = {
    title: {
      text: 'Vendas',
      subtext: 'Por Categoria de Produt',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Vendas',
        type: 'pie',
        radius: '50%',
        data: [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  carregarDados() {
    this.vendasService.getGraphicInfo("toPie").subscribe((response) => {
      if (this.chartOptions.series && Array.isArray(this.chartOptions.series) && this.chartOptions.series[0]) {
        this.chartOptions.series[0].data = response;
      }
    });
  }
}