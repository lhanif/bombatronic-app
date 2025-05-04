import React, { useState } from 'react';
import { View, Text, Image, ScrollView , Modal, TextInput, TouchableOpacity,} from 'react-native';
import { useIpContext } from '../IpContext';

const AboutScreen = () => {
  const { ipCamera, ipData, setIpCamera, setIpData } = useIpContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [tempCamera, setTempCamera] = useState(ipCamera);
  const [tempData, setTempData] = useState(ipData);
  return (
    <ScrollView className="flex-1 bg-[#AFDDFF] px-6 pt-10">
      {/* Logo */}
      <View className="items-center mb-8">
        <Image
          source={require('../../assets/images/logo2.png')}
          style={{ width: 100, height: 100 }}
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


      {/* Button to Open Modal */}
      <TouchableOpacity
        onPress={() => {
          setTempCamera(ipCamera);
          setTempData(ipData);
          setModalVisible(true);
        }}
        className="bg-blue-600 rounded-xl px-6 py-3 self-center"
      >
        <Text className="text-white font-semibold text-base">Set IP Address</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 px-6">
          <View className="bg-white rounded-xl p-6 w-full">
            <Text className="text-lg font-semibold mb-4 text-center">Enter IP Addresses</Text>

            <Text className="mb-2 text-gray-700">IP Camera</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
              placeholder="e.g., 192.168.1.100"
              value={tempCamera}
              onChangeText={setTempCamera}
            />

            <Text className="mb-2 text-gray-700">IP Data</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-2 mb-6"
              placeholder="e.g., 192.168.1.200"
              value={tempData}
              onChangeText={setTempData}
            />

            <View className="flex-row justify-between">
              <TouchableOpacity
                className="bg-gray-300 px-4 py-2 rounded-lg"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-gray-800">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-blue-600 px-4 py-2 rounded-lg"
                onPress={() => {
                  setIpCamera(tempCamera);
                  setIpData(tempData);
                  setModalVisible(false);
                }}
              >
                <Text className="text-white">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default AboutScreen;
