import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import MetalTile from '../components/MetalTile';
import { fetchMetal } from '../api/metalsApi';

const METALS = [
  { symbol: 'XAU', title: 'Gold', subtitle: '24K price • INR' },
  { symbol: 'XAG', title: 'Silver', subtitle: 'Price • INR' },
  { symbol: 'XPT', title: 'Platinum', subtitle: 'Price • INR' },
  { symbol: 'XPD', title: 'Palladium', subtitle: 'Price • INR' },
];

export default function LandingScreen({ navigation }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState({ XAU: true, XAG: true, XPT: true });
  const [error, setError] = useState({});

  const loadSymbol = async (symbol) => {
    try {
      setLoading((s) => ({ ...s, [symbol]: true }));
      setError((e) => ({ ...e, [symbol]: null }));
      const res = await fetchMetal(symbol);
      setData((d) => ({ ...d, [symbol]: res }));
    } catch (err) {
      setError((e) => ({ ...e, [symbol]: err?.message || 'Error' }));
    } finally {
      setLoading((s) => ({ ...s, [symbol]: false }));
    }
  };

  const loadAll = useCallback(() => {
    METALS.forEach((m) => loadSymbol(m.symbol));
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  return (
    <ScrollView style={styles.container}
      refreshControl={<RefreshControl refreshing={false} onRefresh={loadAll} />}>
      <View style={styles.list}>
        {METALS.map((m) => (
          <MetalTile
            key={m.symbol}
            title={m.title}
            subtitle={m.subtitle}
            data={data[m.symbol]}
            loading={loading[m.symbol]}
            error={error[m.symbol]}
            onPress={() => navigation.navigate('Details', { details: data[m.symbol] })}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },
  list: { padding: 16 },
});
