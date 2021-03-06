# react-native-bottom-tab-tour
## Customizable and delightful tour-guide for your bottom tabs

react-native-bottom-tab-tour is a flexible tourguide for your bottom tab navigation.

## Preview
![tour](https://user-images.githubusercontent.com/13269141/150741308-e6315941-ee2a-4976-8e75-ed266139a05e.gif)

## Installation
You should already have `react-native-safe-area-context` installed which comes with the `react-navigation` package. Run the following to install this package.
```
yarn install @saad27/react-native-bottom-tab-tour
```

## Usage
import `react-native-bottom-tab-tour` in your root component, it should be outside of your navigation. like this 
```sh
import TabTour from "@saad27/react-native-bottom-tab-tour";

const data = [
  {
    title: 'Welcome to the App!\nLets take a tour!', // INTRO ITEM
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
    title: 'Third Tab',
    description: `This is the second tab.\nYou can see the list of all the tabs.`,
  },
  {
    title: 'Fourth Tab',
    description: `This is the second tab.\nYou can see the list of all the tabs.`,
  },
  {
    title: 'Ready to go!', // ENDING ITEM
    description: `We have come to the end of the tour.\nYou can now use the app.`,
  },
];
const App () => {
    const [showTabTour, setShowTabTour] = React.useState(true);
    <SafeAreaProvider>
        <Navigation />
        {showTabTour && (
          <TabTour data={data} closeTabTour={() => setShowTabTour(false)} />
        )}
        <StatusBar />
    </SafeAreaProvider>    
}
```
## Example
You can run the example from the example folder. Go to example folder, run yarn and expo run ios/android.

## Props
There are 2 compuslory props.

1. `data` - You need to pass the `data` array. Each item in the `data array` will act as an individual view. 

For the tab tour to work properly, you need to give an intro item (which is the first index of the array) and an ending item (which is the last item of the array).
The intro and ending item appears as a popup in the middle of the screen whereas the other items will be appearing on top of each individual tab.

2. `tabCount` - number of tabs.

Interface of the data object.
```sh
export interface TOOLTIP_DATA {
  title: string; // TITLE IS COMPULSORY
  titleStyle?: TextStyle;
  description?: string;
  descriptionStyle?: TextStyle;
  style?: ViewStyle;
  btnText?: string; // NEXT BTN TITLE
}
```

To customize further, there are few more additional props. (The list will grow soon!)


| Props | Type | Description
| ------ | ------ | ------ |
| data | TOOLTIP_DATA[] | data array for tour guide
| closeTabTour | () => void | for closing the tour view
| nextBtnStyle | ViewStyle | next button styling
| skipBtnStyle | ViewStyle | skip button styling
| opacity | number (0-1) | opacity for the background layer
| opacityViewHeight | number | height of the opacity layer
| opacityColor | string | background color of the opacity view


## License
MIT

## Contribution
Will be very happy to get any contribution!
