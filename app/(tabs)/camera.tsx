import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const StreamingCamera = () => {
  const [currentImage, setCurrentImage] = useState('');
  const [nextImage, setNextImage] = useState('');
  const [showCurrent, setShowCurrent] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const newUrl = `http://192.168.194.180/cam-lo.jpg?timestamp=${new Date().getTime()}`;
      
      // Preload image silently
      Image.prefetch(newUrl).then(() => {
        setNextImage(newUrl);
        setShowCurrent(prev => !prev); // swap image after preload done
        setCurrentImage(newUrl); // update current
      }).catch(() => {
        // Optional: handle error
      });

    }, 100); // 10 fps

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Camera Stream</Text>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: showCurrent ? currentImage : nextImage }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </SafeAreaView>
  );
};

export default StreamingCamera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AFDDFF',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  imageWrapper: {
    marginTop: 200,
    width: 320*1.2,
    height: 240*1.2,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 5,
    padding:5,
    borderColor: '#60B5FF',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 7,
  },
});
