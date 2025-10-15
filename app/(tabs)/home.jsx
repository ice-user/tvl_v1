import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const primaryColor = '#38e07b';
const backgroundLight = '#f6f8f7';
const backgroundDark = '#122017';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Workout Tracking</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Workout</Text>

          <TouchableOpacity style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.iconBox}>
                <Text style={styles.iconText}>🏋️</Text>
              </View>
              <View>
                <Text style={styles.cardTitle}>Squats</Text>
                <Text style={styles.cardSubtitle}>Leg Day</Text>
              </View>
            </View>
            <View style={styles.cardStatsRow}>
              <View style={styles.cardStat}>
                <Text style={styles.statLabel}>Sets</Text>
                <Text style={styles.statValue}>3</Text>
              </View>
              <View style={styles.cardStat}>
                <Text style={styles.statLabel}>Duration</Text>
                <Text style={styles.statValue}>30s</Text>
              </View>
              <View style={styles.cardStat}>
                <Text style={styles.statLabel}>Posture</Text>
                <Text style={[styles.statValue, styles.highlight]}>{`95%`}</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* More workout cards... */}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Workout History</Text>

          <TouchableOpacity style={styles.historyItem}>
            <Text style={styles.historyDate}>2024-07-20</Text>
            <Text style={styles.historyType}>Full Body</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.historyItem}>
            <Text style={styles.historyDate}>2024-07-15</Text>
            <Text style={styles.historyType}>Upper Body</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity
  style={styles.fab}
  onPress={() => router.push('/(tabs)/cameraWorkout')}
>
  <Text style={styles.fabText}>▶</Text>
</TouchableOpacity>


      <View style={styles.footer}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabel}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNav]}>
          <Text style={styles.navIcon}>🏋️</Text>
          <Text style={[styles.navLabel, styles.activeNavLabel]}>Workouts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📊</Text>
          <Text style={styles.navLabel}>Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🧠</Text>
          <Text style={styles.navLabel}>AI Coach</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundLight,
  },
  fab: {
  position: 'absolute',
  bottom: 80, // makes room for footer
  right: 20,
  backgroundColor: primaryColor,
  width: 60,
  height: 60,
  borderRadius: 30,
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 5,
  zIndex: 999,
},
fabText: {
  color: backgroundDark,
  fontSize: 28,
  fontWeight: 'bold',
},

  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: backgroundDark,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: backgroundDark,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    // shadow for iOS / elevation for Android if you want
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: primaryColor + '33', // semi-transparent
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 24,
    color: primaryColor,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: backgroundDark,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  cardStatsRow: {
    flexDirection: 'row',
  },
  cardStat: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: backgroundDark,
  },
  highlight: {
    color: primaryColor,
  },
  historyItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  historyDate: {
    fontSize: 16,
    fontWeight: '500',
    color: backgroundDark,
  },
  historyType: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    height: 60,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 20,
  },
  navLabel: {
    fontSize: 12,
    color: '#666',
  },
  activeNav: {
    backgroundColor: primaryColor + '20',
  },
  activeNavLabel: {
    color: primaryColor,
    fontWeight: '600',
  },
});
