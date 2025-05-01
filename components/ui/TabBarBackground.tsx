import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

// Tetap ekspor default undefined
export default undefined;

// Ekspor fungsi seperti sebelumnya
export function useBottomTabOverflow() {
  return 0;
}

// ⬇️ Tambahkan komponen visual yang akan dipakai oleh `tabBarBackground`
export function TabBarVisualBackground() {
  // Hanya tampilkan di iOS karena Android & Web pakai shim (undefined)
  if (Platform.OS !== 'ios') return null;

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View style={styles.background} />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#60B5FF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginHorizontal: 16,
    marginBottom: 10,
  },
});
