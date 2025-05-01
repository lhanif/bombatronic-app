import { Image, StyleSheet, Platform, View, Text, ScrollView } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';

export default function HomeScreen() {
  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView className='py-10' contentContainerStyle={{ height: '100%'}}>
        <View className='h-1/5 flex flex-row justify-center'>
          <Text className='text-4xl font-bold'>
            Hello, There! <HelloWave/>{"\n"}
            <Text className='text-base text-[#FF9149]'>
              Welcome to our Dashboard
            </Text>
          </Text>
        </View>

        <View className='bg-[#60B5FF] rounded-xl p-5'>
          <Text className='text-2xl font-semibold'>Recent Sensor Readings</Text>
          <View className='flex flex-row justify-center gap-x-2'>
            <LineChart
              data={{
              labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"],
              datasets: [
                  {
                  data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100
                  ]
                  }
              ]
              }}
              width={200}
              height={220}
              chartConfig={{
                backgroundColor: "white",
                backgroundGradientFrom: "white",
                backgroundGradientTo: "white",
                decimalPlaces: 0,
                color: (opacity = 1) => `blue`,
                labelColor: (opacity = 1) => `black`,
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
                        <LineChart
              data={{
              labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"],
              datasets: [
                  {
                  data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100
                  ]
                  }
              ]
              }}
              width={200}
              height={220}
              chartConfig={{
                backgroundColor: "white",
                backgroundGradientFrom: "white",
                backgroundGradientTo: "white",
                decimalPlaces: 0,
                color: (opacity = 1) => `blue`,
                labelColor: (opacity = 1) => `black`,
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
          </View>
          <View className='flex flex-row justify-center gap-x-2'>
            <LineChart
              data={{
              labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"],
              datasets: [
                  {
                  data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100
                  ]
                  }
              ]
              }}
              width={200}
              height={220}
              chartConfig={{
                backgroundColor: "white",
                backgroundGradientFrom: "white",
                backgroundGradientTo: "white",
                decimalPlaces: 0,
                color: (opacity = 1) => `blue`,
                labelColor: (opacity = 1) => `black`,
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
                        <LineChart
              data={{
              labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"],
              datasets: [
                  {
                  data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100
                  ]
                  }
              ]
              }}
              width={200}
              height={220}
              chartConfig={{
                backgroundColor: "white",
                backgroundGradientFrom: "white",
                backgroundGradientTo: "white",
                decimalPlaces: 0,
                color: (opacity = 1) => `blue`,
                labelColor: (opacity = 1) => `black`,
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
