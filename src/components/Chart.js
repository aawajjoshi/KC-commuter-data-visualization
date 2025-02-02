// Component for creating a Pie Chart

// Dependency imports
import React, { useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMediaQuery } from 'react-responsive';

// Relative import
import { StoreContext } from '../store/GlobalState';

const Chart = () => {
  const [state] = useContext(StoreContext);

  // Media query to change dimensions
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  // Initializing properties required for piechart
  let labelOptions, chartOptions, chartData;

  // Conditions to check against
  const checkState =
    state.driveAlone !== 0 &&
    state.drivePool !== 0 &&
    !state.publicTransport !== 0 &&
    !state.walk !== 0;

  // Setting up piechart labels based on the established conditions
  checkState
    ? (labelOptions = {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        color: '#fffffe',
      })
    : (labelOptions = {
        enabled: false,
      });

  // Setting up container style based on screen width
  isTabletOrMobile
    ? (chartOptions = {
        pie: {
          allowPointSelect: true,
          size: 80,
          cursor: 'pointer',
          dataLabels: labelOptions,
          borderColor: checkState ? '#ffffff' : null,
        },
      })
    : (chartOptions = {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: labelOptions,
          borderColor: checkState ? '#ffffff' : null,
        },
      });

  // Setting up piechart data based on the established conditions
  checkState
    ? (chartData = [
        {
          name: 'Drive Alone',
          y: state.driveAlone,
          selected: true,
          color: '#4BA451',
        },
        {
          name: 'Carpool',
          y: state.drivePool,
          color: '#00A5E6',
        },
        {
          name: 'Transit',
          y: state.publicTransport,
          color: '#CE7E2C',
        },
        {
          name: 'Walking',
          y: state.walk,
          color: '#8185E9',
        },
      ])
    : (chartData = [
        {
          name: '',
          y: 100,
          selected: true,
          color: 'transparent',
        },
      ]);

  // Initializing the options for the piechart
  let options = {
    chart: {
      backgroundColor: '#222B2F',
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: checkState
        ? 'Commuter information for'
        : 'No information available',
      margin: isTabletOrMobile ? -100 : 50,
      style: {
        color: '#fffffe',
        fontWeight: 'bold',
        fontSize: '20px',
      },
    },
    subtitle: {
      text: state.subHeading,
      style: {
        color: '#FFEACE',
        fontWeight: 'bold',
        fontSize: '14px',
      },
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: chartOptions,
    series: [
      {
        name: 'Commute',
        colorByPoint: true,
        data: chartData,
      },
    ],
  };

  return (
    <>
      {state.intromsg && (
        <div className="chart">
          <h2 className="intro-info">
            Click on a tract for <br />
            commuter information
          </h2>
        </div>
      )}
      {state.chart && (
        <div className="chart">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      )}
    </>
  );
};

export default Chart;
