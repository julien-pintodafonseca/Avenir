import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';

const Line = props => {
  const [showValue, setShowValue] = useState('');
  return (
    <View>
      <LineChart
        data={props.line}
        withVerticalLabels={false}
        width={Dimensions.get('window').width * 0.95} // from react-native
        height={300}
        yAxisLabel={'$'}
        onDataPointClick={({value, dataset, getColor}) => setShowValue(value)}
        withDots={true}
        chartConfig={{
          backgroundColor: '#fb8c00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 5,
          },
        }}
        style={{
          margin: 5,
          borderRadius: 5,
        }}
      />
      <Text style={styles.cryptoValue}>
        $ {Math.round(showValue * 100) / 100}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cryptoValue: {
    marginTop: 20,
    fontSize: 26,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'Helvetica',
  },
});

export default Line;
