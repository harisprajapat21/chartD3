import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import * as d3 from 'd3';

import { MarketPrice } from '../service/market-price';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnChanges{
  @ViewChild('chart')
  chartElement: ElementRef | undefined;

  parseDate = d3.timeParse('%d-%m-%Y');

  @Input()
  marketStatus: MarketPrice[] | undefined;

  private svgElement: HTMLElement | undefined;
  private chartProps: any;

  constructor() {}

  formatDate() {
    this.marketStatus?.forEach((ms) => {
      if (typeof ms.date === 'string') {
        ms.date = '' + this.parseDate(ms.date);
      }
    });
  }
  buildChart() {
    this.chartProps = {};
    this.formatDate();
  
    // Set the dimensions of the canvas / graph
    var margin = { top: 30, right: 20, bottom: 30, left: 50 },
      width = 600 - margin.left - margin.right,
      height = 270 - margin.top - margin.bottom;
  
    // Set the ranges
    this.chartProps.x = d3.scaleTime().range([0, width]);
    this.chartProps.y = d3.scaleLinear().range([height, 0]);
  
    // Define the axes
    var xAxis = d3.axisBottom(this.chartProps.x);
    var yAxis = d3.axisLeft(this.chartProps.y).ticks(5);
  
    let _this = this;
  
    // Define the line
    var valueline = d3.line<MarketPrice>()
      .x(function (d) {
        let newDate = d.date && new Date(d.date);
        if (newDate instanceof Date) {
          return _this.chartProps.x(newDate.getTime());
        }
      })
      .y(function (d) { console.log('Close market'); return _this.chartProps.y(d.close); });
  
    // Define the line
    var valueline2 = d3.line<MarketPrice>()
      .x(function (d) {
        let newDate = d.date && new Date(d.date);
        if (newDate instanceof Date) {
          return _this.chartProps.x(newDate.getTime());
        }
      })
      .y(function (d) { console.log('Open market'); return _this.chartProps.y(d.open); });
  
    var svg = d3.select(this.chartElement?.nativeElement)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  
    // Scale the range of the data
    if(_this.marketStatus)
    this.chartProps.x.domain(
      d3.extent(_this.marketStatus,function (d) {
        let newDate = d.date && new Date(d.date);
        if (newDate instanceof Date) {
            return (newDate as Date).getTime();
          }else{
            return
          }
        }));
      if(this.marketStatus)
    this.chartProps.y.domain([0, d3.max(this.marketStatus, function(d)  {
        if (d.close && d.open){
          return Math.max(d.close, d.open);
        }else{
          return 
        }
      })]);
  
    // Add the valueline2 path.
    if(_this.marketStatus)
    svg.append('path')
      .attr('class', 'line line2')
      .style('stroke', 'green')
      .style('fill', 'none')
      .attr('d', valueline2(_this.marketStatus));
  
    // Add the valueline path.
    if(_this.marketStatus)
    svg.append('path')
      .attr('class', 'line line1')
      .style('stroke', 'black')
      .style('fill', 'none')
      .attr('d', valueline(_this.marketStatus));
  
  
    // Add the X Axis
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);
  
    // Add the Y Axis
    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis);
  
    // Setting the required objects in chartProps so they could be used to update the chart
    this.chartProps.svg = svg;
    this.chartProps.valueline = valueline;
    this.chartProps.valueline2 = valueline2;
    this.chartProps.xAxis = xAxis;
    this.chartProps.yAxis = yAxis;
  }
  ngOnChanges() {
    if (this.marketStatus) {
      this.buildChart();
    }
  }
}
