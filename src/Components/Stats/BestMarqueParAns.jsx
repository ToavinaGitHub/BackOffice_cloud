import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class BestMarqueParAns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: 2024,
      selectedNameMonth: 0,
      selectedNumeroMonth: 0,
      dataY: [],
      token: localStorage.getItem("token"),
    };
    this.toggleDataSeries = this.toggleDataSeries.bind(this);
  }

  componentDidMount() {
    this.fetchYData();
  }

  fetchYData = () => {
    fetch("http://localhost:8080/bestMarque?annee=" + this.state.selectedYear,{
      headers: {
        'Authorization': `Bearer ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ dataY: data }, () => {
          this.chart.render();
        });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  handleYearChange = (event) => {
    const newYear = parseInt(event.target.value, 10);
    this.setState({ selectedYear: newYear }, () => {
      this.fetchYData();
    });
  }

  toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    this.chart.render();
  }

  render() {
    const options = {
      theme: "light2",
      animationEnabled: true,
      title: {
        text: "Meilleurs marque pendant l'année " + this.state.selectedYear,
      },
      subtitles: [{
        text: "Move the cursor over the dots to see the statistics per month",
      }],
      axisX: {
        title: "Mois",
        interval: 1,
        intervalType: "month",
      },
      axisY: {
        title: "Vente par Marque",
        titleFontColor: "#C32F27",
        lineColor: "#C32F27",
        labelFontColor: "#C32F27",
        tickColor: "#C32F27",
      },
      toolTip: {
        shared: true,
      },
      legend: {
        cursor: "pointer",
        itemclick: (e) => this.toggleDataSeries(e),
      },
      data: [
        {
          type: "spline",
          name: "Vente par marque",
          showInLegend: true,
          xValueFormatString: "MMMM",
          yValueFormatString: "#,##0 ",
          dataPoints: this.state.dataY.map((value, index) => ({
            x: new Date(this.state.selectedYear, index, 1),
            y: value,
          })),
          click: (e) => {
            var monthNumber = e.dataPoint.x.getMonth() + 1;
            var month = e.dataPoint.x.getMonth() + 1;
            var monthName = new Date(0, monthNumber - 1).toLocaleString('default', { month: 'long' });
            console.log(month + "--" + monthName);
            this.setState({ selectedNameMonth: monthName, selectedNumeroMonth: month });
          },
        },
      ],
    };

    return (
      <div>
        <input type="number" min="2000" max="2050" value={this.state.selectedYear} onChange={this.handleYearChange} />
        <CanvasJSChart options={options}
          onRef={ref => this.chart = ref}
          onMonthSelected={(month) => this.setState({ selectedMonth: month })}
        />
      </div>
    );
  }
}

export default BestMarqueParAns;
