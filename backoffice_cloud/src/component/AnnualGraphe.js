import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import MonthGraphe  from './MonthGraphe';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class AnnualGraphe extends Component {	
	constructor(props) {
		super(props);
		this.state = {
	
		  selectedYear: 2023,
		  selectedNameMonth: 0,
		  selectedNumeroMonth: 0 ,
		};
		this.handleYearChange = this.handleYearChange.bind(this);
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
	   }
	   
	
	handleYearChange(event) {
		this.setState({selectedYear: event.target.value});
		this.chart.render();
	}
	   
	toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
	
	render() {
		const options = {
			theme: "light2",
			animationEnabled: true,
			title:{
				text: "Vente pendant l'annee 2023"
			},
			subtitles: [{
				text: "Move the cursor over the dots to see the statistics per month"
			}],
			axisX: {
				minimum: new Date(this.state.selectedYear, 0, 1), 
 				maximum: new Date(this.state.selectedYear, 11, 31), 
				title: "Mois"
			},
			axisY: {
				title: "Unités vendues",
				titleFontColor: "#C32F27",
				lineColor: "#C32F27",
				labelFontColor: "#C32F27",
				tickColor: "#C32F27"
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
				itemclick: (e) => this.toggleDataSeries(e)
			},
			data: [{
				type: "spline",
				name: "Unités vendues",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "#,##0 Unités",
				dataPoints: [
				  { x: new Date(2023, 1, 1), y: 135 },
				  { x: new Date(2023, 2, 1), y: 144 },
				  { x: new Date(2023, 3, 1), y: 103 },
				  { x: new Date(2023, 4, 1), y: 93 },
				  { x: new Date(2023, 5, 1), y: 129 },
				  { x: new Date(2023, 6, 1), y: 143 },
				  { x: new Date(2023, 7, 1), y: 156 },
				  { x: new Date(2023, 8, 1), y: 122 },
				  { x: new Date(2023, 9, 1), y: 106 },
				  { x: new Date(2023, 10, 1), y: 137 },
				  { x: new Date(2023, 11, 1), y: 142 },
				  { x: new Date(2023, 12, 1), y: 142 }
				] ,
				click: (e) => {
					var monthNumber = e.dataPoint.x.getMonth() + 1;
					var month = e.dataPoint.x.getMonth() + 1;
					var monthName = new Date(0, monthNumber - 1).toLocaleString('default', { month: 'long' });
					console.log(month + "--" + monthName);
					this.setState({ selectedNameMonth: monthName, selectedNumeroMonth: month });
				}
													
			   }]
			   
		}
		
		
		return (
		<div>
			<input type="number" min="2000" max="2050" value={this.state.selectedYear} onChange={this.handleYearChange} />
			<CanvasJSChart options = {options} 
				 onRef={ref => this.chart = ref}
				 onMonthSelected={(month) => this.setState({ selectedMonth: month })}
			/>
			{this.state.selectedNumeroMonth ?
				(
					<MonthGraphe years= { this.state.selectedYear } nameMonth= { this.state.selectedNameMonth } numeroMonth= { this.state.selectedNumeroMonth } />
				)
				: null
			}
		</div>
		);
	}
			
}
 
export default AnnualGraphe;   

