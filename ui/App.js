import React from 'react';
import {Text, View} from 'react-native';
import {LineChart, PieChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';

const line = {
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ],
  datasets: [
    {
      data: [
        20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43,
      ],
      strokeWidth: 5, // optional
    },
  ],
};

const data = [
  {
    name: 'Seoul',
    population: 21500000,
    color: 'rgba(131, 167, 234, 1)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Toronto',
    population: 2800000,
    color: '#F00',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Beijing',
    population: 527612,
    color: 'red',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'New York',
    population: 8538000,
    color: 'green',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Moscow',
    population: 11920000,
    color: 'rgb(0, 0, 255)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];

const HelloWorldApp = () => {
  return (
    <View>
      <Text>Bezier Line Chart</Text>
      <LineChart
        data={line}
        withVerticalLabels={false}
        width={Dimensions.get('window').width} // from react-native
        height={300}
        yAxisLabel={'$'}
        onDataPointClick={({value, dataset, getColor}) =>
          console.log('value:', value)
        }
        withDots={true}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <PieChart
        data={data}
        width={Dimensions.get('window').width}
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
        center={[10, 50]}
        absolute
      />
    </View>
  );
};

export default HelloWorldApp;
