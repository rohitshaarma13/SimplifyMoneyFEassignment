import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatINR, formatTimestamp } from '../utils/format';

export default function DetailsScreen({ route }) {
  const { details } = route.params || {};
  if (!details) {
    return (
      <View style={styles.container}><Text>No data provided.</Text></View>
    );
  }

  const { date, time } = formatTimestamp(details.timestamp);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{details.name} Details</Text>
      <Row label="Current Price" value={formatINR(details.price)} />
      <Row label="Previous Open" value={details.previousOpen != null ? formatINR(details.previousOpen) : '—'} />
      <Row label="Previous Close" value={details.previousClose != null ? formatINR(details.previousClose) : '—'} />
      <Row label="Unit" value={details.unit || '—'} />
      <Row label="Currency" value={details.currency || 'INR'} />
      <Row label="Date" value={date} />
      <Row label="Time" value={time} />
    </View>
  );
}

function Row({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#eee' },
  label: { fontSize: 15, color: '#444' },
  value: { fontSize: 15, fontWeight: '600' },
});
