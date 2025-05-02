import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

const AboutScreen = () => {
  return (
    <ScrollView className="flex-1 bg-[#AFDDFF] px-6 pt-10">
      {/* Logo */}
      <View className="items-center mb-8">
        <Image
          source={require('../../assets/images/logo2.png')}
        height={20}
        width={20}
          resizeMode="center"
        />
      </View>

      {/* Description */}
      <Text className="text-center text-base leading-7 text-gray-800 mb-10">
        Bombatronic is a product by SymbIoT team consisted of four highly ambitious individuals passionate about technology, IoT, and AI.{"\n\n"}
        Driven by innovation, they aim to reduce fire-related tragedies across Indonesia by developing a cost-efficient IoT prototype that is both accessible and widely applicable for all.{"\n\n"}
        All of this research was possible because of the IoT and AI bootcamp named <Text className="font-bold">“Samsung Innovation Campus”</Text> provided by Samsung and Hacktiv8.
      </Text>

      {/* Tech Stack Title */}
      <Text className="text-center text-2xl font-semibold mb-6">Tech Stacks :</Text>

      {/* Tech Stack Icons */}
      <View className="flex-row flex-wrap justify-center items-center gap-4">
        <Image
          source={require('../../assets/images/flask.png')}
          style={{ width: 50, height: 50 }}
          resizeMode="contain"
        />
        <Image
          source={require('../../assets/images/opencv.png')}
          style={{ width: 50, height: 50 }}
          resizeMode="contain"
        />
        <Image
          source={require('../../assets/images/streamlit.png')}
          style={{ width: 50, height: 50 }}
          resizeMode="contain"
        />
        <Image
          source={require('../../assets/images/tensorflow.png')}
          style={{ width: 50, height: 50 }}
          resizeMode="contain"
        />
        <Image
          source={require('../../assets/images/mongodb.png')}
          style={{ width: 50, height: 50 }}
          resizeMode="contain"
        />
      </View>



    </ScrollView>
  );
};

export default AboutScreen;
