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
import TabTour from react-native-bottom-tab-tour;

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
## Props
The only prop that is a must for this component is the `data` array prop. Each item in the `data array` will act as an individual view. The first and last item appears as a popup in the middle of the screen whereas the other items will be appearing on top of each tab.

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
| opacityViewHeights | number | height of the opacity layer
| opacityColor | string | background color of the opacity view


## License
MIT

## Contribution
Will be very happy to get any contribution!
