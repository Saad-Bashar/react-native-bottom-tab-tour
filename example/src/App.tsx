import * as React from 'react';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabTour, { TOOLTIP_DATA } from './components/TabTour';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const data: TOOLTIP_DATA[] = [
  {
    title: 'Welcome to the App!\nLets take a tour!',
  },
  {
    title: 'First Tab',
    description: `This is the first tab.\nYou can see the list of all the tabs.`,
  },
  {
    title: '2nd Tab',
    description: `This is the second tab.\nYou can see the list of all the tabs.`,
  },
  {
    title: '3rd Tab',
    description: `This is the third tab.\nYou can see the list of all the tabs.`,
  },
  {
    title: '4th Tab',
    description: `This is the fourth tab.\nYou can see the list of all the tabs.`,
  },
  {
    title: 'Ready to go!',
    description: `We have come to the end of the tour.\nYou can now use the app.`,
  },
];

export default function App() {
  const [showTabTour, setShowTabTour] = React.useState(true);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        {showTabTour && (
          <TabTour data={data} closeTabTour={() => setShowTabTour(false)} />
        )}
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
