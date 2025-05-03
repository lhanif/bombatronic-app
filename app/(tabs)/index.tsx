import { ScrollView, View, Text, Dimensions, SafeAreaView } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import { useEffect, useState } from 'react';
import { LineChart } from 'react-native-gifted-charts';

interface SensorDataTypes {
  Timestamps: string[];
  MQ7: number[];
  MQ135: number[];
  Temp: number[];
  Hum: number[];
}

interface ChartCardTypes {
  title: string;
  units: string;
  data: number[] | undefined;
  timestamps: string[];
}

const ChartCard = ({ title, units, data, timestamps }: ChartCardTypes) => {
  const isValid =
    Array.isArray(data) &&
    Array.isArray(timestamps) &&
    data.length > 0 &&
    timestamps.length > 0;

  const latestValue = isValid ? data[data.length - 1].toFixed(1) : "--";
  const minValue = isValid ? Math.min(...data) : 0;
  const maxValue = isValid ? Math.max(...data) : 0;

  const chartData = isValid
    ? data.map((value, index) => ({
        value,
        label: timestamps[index] || '',
      }))
    : [];

  return (
    <View className="bg-white rounded-2xl w-[45%] p-3 shadow-sm">
      <Text className="text-center text-sm text-gray-800 mb-2">
        {title} {"\n"}
        <Text className="text-gray-600 font-bold text-2xl">
          {latestValue + " " + units}
        </Text>
      </Text>

      {isValid ? (
        <LineChart
          data={chartData}
          yAxisOffset={minValue}
          height={100}
          isAnimated
          hideDataPoints
          hideRules
          color="#60B5FF"
          thickness={2}
          noOfSections={4}
          spacing={15}
          yAxisThickness={0}
          xAxisThickness={0}
          xAxisLabelsHeight={0}
          yAxisTextStyle={{ 
            fontSize: 10,
            color: "gray"
          }}
          curved
          />
      ) : (
        <Text className="text-center text-gray-400 text-xs">
          Chart unavailable
        </Text>
      )}
    </View>
  );
};

export default function HomeScreen() {
  const [sensorData, setSensorData] = useState<SensorDataTypes>();

  useEffect(() => {
    let isActive = true;

    const longPoll = async () => {
      while (isActive) {
        try {
          const res = await fetch(`http://192.168.143.226:5000/api/fetch_db`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
          });

          if (!res.ok) throw new Error("Fetch error");

          const data: SensorDataTypes = await res.json();
          console.log("Fetched data:", JSON.stringify(data));

          setSensorData(data);
          await new Promise(resolve => setTimeout(resolve, 10000));
        } catch (err) {
          console.error("Polling error:", err);
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      }
    };

    longPoll();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <SafeAreaView className="bg-[#FFECDB] h-full">
      <ScrollView
        style={{ backgroundColor: "#AFDDFF" }}
        contentContainerStyle={{ paddingVertical: 50 }}
        className="py-10"
      >
        {/* Greeting Section */}
        <View className="bg-white border-[#FFECDB] rounded-xl border-8 justify-center items-center shadow-lg mb-10 p-4 mx-10">
          <Text className="text-4xl font-bold text-black text-center">
            Hello there! <HelloWave />
          </Text>
          <Text className="text-lg text-gray-400 mt-2 text-center">
            Welcome to our Dashboard
          </Text>
        </View>

        {/* Sensor Section */}
        <View className="bg-[#60B5FF] mx-4 rounded-2xl px-6 py-6 shadow-md">
          <Text className="text-xl text-white mb-6">
            Recent sensor readings
          </Text>

          <View className="flex-row flex-wrap justify-between gap-y-4">
            <View className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full 
              bg-white z-10 border-8 border-[#60B5FF] flex justify-center items-center">
              <Text className="text-2xl">📱</Text>
            </View>

            {!sensorData ? (
              <Text className="text-white text-center">Loading sensor data...</Text>
            ) : (
              <>
                <ChartCard
                  title="Carbon Monoxide"
                  units="PPM"
                  data={sensorData.MQ7}
                  timestamps={sensorData.Timestamps}
                />
                <ChartCard
                  title="Carbon Dioxide"
                  units="PPM"
                  data={sensorData.MQ135}
                  timestamps={sensorData.Timestamps}
                />
                <ChartCard
                  title="Temperature"
                  units="°C"
                  data={sensorData.Temp}
                  timestamps={sensorData.Timestamps}
                />
                <ChartCard
                  title="Humidity"
                  units="%"
                  data={sensorData.Hum}
                  timestamps={sensorData.Timestamps}
                />
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
