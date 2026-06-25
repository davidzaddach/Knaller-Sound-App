import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';

type TabIconName = React.ComponentProps<typeof Ionicons>['name'];

interface TabConfig {
  name: string;
  title: string;
  icon: TabIconName;
  iconFocused: TabIconName;
}

const tabs: TabConfig[] = [
  { name: 'index', title: 'Home', icon: 'home-outline', iconFocused: 'home' },
  { name: 'soundboard', title: 'Sounds', icon: 'grid-outline', iconFocused: 'grid' },
  { name: 'videos', title: 'Videos', icon: 'play-circle-outline', iconFocused: 'play-circle' },
  { name: 'links', title: 'Musik', icon: 'musical-notes-outline', iconFocused: 'musical-notes' },
  { name: 'events', title: 'Live', icon: 'calendar-outline', iconFocused: 'calendar' },
];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ff2d95',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.35)',
        tabBarStyle: {
          backgroundColor: 'rgba(10, 10, 15, 0.95)',
          borderTopColor: 'rgba(255, 45, 149, 0.3)',
          borderTopWidth: 1,
          height: 88,
          paddingBottom: 30,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? tab.iconFocused : tab.icon}
                size={size}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
