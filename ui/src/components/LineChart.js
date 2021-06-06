import React from 'react';
import {Text, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
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

const Line = () => {
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
    </View>
  );
};

export default Line;
