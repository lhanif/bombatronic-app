import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import Video from 'react-native-video'; // Library untuk video streaming
import { SafeAreaView } from 'react-native-safe-area-context';

type StreamingCameraProps = {
  streamUrl: string;
};

const StreamingCamera: React.FC<StreamingCameraProps> = ({ streamUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    setError(false);
  }, [streamUrl]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="items-center pt-5">
        <Text className="text-2xl font-semibold">Camera</Text>
      </View>

      <View className="flex-1 justify-center items-center mt-10">
        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
        {error ? (
          <View className="flex items-center">
            <Text className="text-red-500">Error loading stream</Text>
            <Button title="Reload" onPress={() => setIsLoading(true)} />
          </View>
        ) : (
          <Video
            source={{ uri: streamUrl }}
            onError={handleError}
            onLoad={() => setIsLoading(false)}
            style={{ width: 320, height: 240 }} // Sesuaikan ukuran video
            resizeMode="contain" // Agar video pas di dalam frame
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default StreamingCamera;
