import React, { Component } from 'react';
import dayjs from 'dayjs';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class MonthGraphe extends Component {	
	constructor(props) {
		super(props);
        this.state = {
            years: this.props.years,
            numeroMonth: this.props.numeroMonth,
        };
        this.handleYearChange = this.handleYearChange.bind(this);
        this.toggleDataSeries = this.toggleDataSeries.bind(this);
    }
	   
	
	handleYearChange(event) {
		this.setState({years: event.target.value});
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
        let firstDay = dayjs().set('year', this.state.years).set('month', this.state.numeroMonth - 1).set('date', 1);
        let lastDay = firstDay.clone().endOf('month');        

		const options = {
			theme: "light2",
			animationEnabled: true,
			title:{
				text: "Vente pendant le mois " + this.props.nameMonth
			},
			subtitles: [{
				text: "..."
			}],
            axisX: {
                minimum: firstDay.toDate(),
                maximum: lastDay.toDate(),
                title: "Jours",
                valueType: 'dateTime',
                labelFormatter: function (e) {
                    return dayjs(e.value).format('D-MMMM');
                },
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
                itemclick: (e) => this.toggleDataSeries()
            },
            data: [{
                type: "spline",
				name: "Unités vendues",
				showInLegend: true,
				xValueFormatString: "D MMM",
				yValueFormatString: "#,##0 Unités",
				dataPoints: [
                    { x: new Date(2023, 4, 1), y: 9 },
                    { x: new Date(2023, 4, 2), y: 12 },
                    { x: new Date(2023, 4, 3), y: 1 },
                    { x: new Date(2023, 4, 4), y: 2 },
                    { x: new Date(2023, 4, 5), y: 7 },
                    { x: new Date(2023, 4, 6), y: 20 },
                    { x: new Date(2023, 4, 10), y: 9 },
                    { x: new Date(2023, 4, 12), y: 9 },
                    { x: new Date(2023, 4, 15), y: 12 },
                    { x: new Date(2023, 4, 19), y: 15 },
                    { x: new Date(2023, 4, 20), y: 12 },
                    { x: new Date(2023, 4, 30), y: 1 },
                    { x: new Date(2023, 4, 31), y: 4 },
                ]
            }]
                          
		}
		
		
		return (
		<div>
			<CanvasJSChart options = {options} 
				    onRef={ref => (this.chart = ref)}
			/>
		</div>
		);
	}
			
}
 
export default MonthGraphe;   

