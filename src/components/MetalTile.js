import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { formatINR } from '../utils/format';

export default function MetalTile({ title, subtitle, data, loading, error, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} disabled={loading || !!error}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {loading ? (
        <View style={styles.center}><ActivityIndicator size="large" /></View>
      ) : error ? (
        <View style={styles.center}><Text style={styles.error}>Failed to load</Text></View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.price}>{formatINR(data?.price)}</Text>
          <Text style={styles.timestamp}>Updated: {new Date(data?.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, elevation: 3 },
  title: { fontSize: 18, fontWeight: '700' },
  subtitle: { fontSize: 12, color: '#666', marginTop: 2 },
  center: { height: 72, alignItems: 'center', justifyContent: 'center' },
  content: { marginTop: 8 },
  price: { fontSize: 22, fontWeight: '700' },
  timestamp: { fontSize: 12, color: '#666', marginTop: 6 },
  error: { color: '#c00' },
});
