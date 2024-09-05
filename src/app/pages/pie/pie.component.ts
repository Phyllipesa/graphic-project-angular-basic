import { Component, OnInit } from '@angular/core';
import { Data } from '../../_models/Data';
import { VendasService } from '../../services/vendas.service';
import { EChartsOption } from 'echarts'
import { CommonModule } from '@angular/common';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';

@Component({
  selector: 'app-pie',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.css',
  providers: [
    provideEcharts()
  ]
})

export class PieComponent implements OnInit {

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
        console.log(response);       
      }
    });
  }
}