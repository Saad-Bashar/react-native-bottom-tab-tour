/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  useWindowDimensions,
  SafeAreaView,
  StyleSheet,
  Platform,
  ViewStyle,
  LayoutAnimationConfig,
  LayoutAnimation,
  Dimensions,
  PlatformIOSStatic,
  //@ts-ignore
  Pressable,
  TextStyle,
} from 'react-native';
import React, { useMemo, useState } from 'react';
//@ts-ignore
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface TabTourProps {
  data: TOOLTIP_DATA[];
  closeTabTour: () => void;
  nextBtnStyle?: ViewStyle;
  skipBtnStyle?: ViewStyle;
  opacity?: number;
  opacityViewHeight?: number;
  opacityColor?: string;
  widthPad?: number;
}

export interface TOOLTIP_DATA {
  title: string;
  titleStyle?: TextStyle;
  description?: string;
  descriptionStyle?: TextStyle;
  style?: ViewStyle;
  btnText?: string;
  showThumb?: boolean;
  thumbIndex?: number;
}

const Dots = ({
  length,
  activeIndex,
}: {
  length: number;
  activeIndex: number;
}) => {
  let dots = [];
  for (let i = 0; i < length; i++) {
    const dot = (
      <View
        key={i}
        style={[styles.dot, i === activeIndex && styles.dotActive]}
      />
    );
    dots.push(dot);
  }

  return <View style={[{ flexDirection: 'row' }]}>{dots}</View>;
};
const isLandscape = () => {
  const dim = Dimensions.get('screen');
  return dim.width >= dim.height;
};
function tabBarHeight() {
  const platformIOS = Platform as PlatformIOSStatic;
  // @ts-ignore
  const majorVersion = parseInt(platformIOS.Version, 10);
  const isIos = Platform.OS === 'ios';
  const isIOS11 = majorVersion >= 11 && isIos;
  if (platformIOS.isPad) return 49;
  if (isIOS11 && !isLandscape()) return 49;
  return 29;
}

function layoutAnimation({
  duration = 300,
  deleteDuration = 100,
  damping = 0.6,
}: {
  duration?: number;
  deleteDuration?: number;
  damping?: number;
}) {
  const layoutAnimConfig: LayoutAnimationConfig = {
    duration: duration,
    update: {
      type: LayoutAnimation.Types.spring,
      springDamping: damping,
    },
    create: {
      duration: duration,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
    delete: {
      duration: deleteDuration,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
  };
  LayoutAnimation.configureNext(layoutAnimConfig);
}

export default function TabTour({
  data,
  closeTabTour,
  skipBtnStyle,
  nextBtnStyle,
  opacityViewHeight,
  opacity = 0.9,
  opacityColor = '#0F1C31',
  widthPad,
}: TabTourProps) {
  const { height, width } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();
  const tourViewHeight = opacityViewHeight
    ? opacityViewHeight
    : height - (tabBarHeight() + bottom);
  const WIDTH_PAD = widthPad ?? 50;
  const styleMiddle = useMemo(
    () => ({
      top: height * 0.4,
      width: width - WIDTH_PAD,
    }),
    [height, width, WIDTH_PAD]
  );
  const styleBottom = useMemo(
    () => ({
      bottom: 100,
      width: width - WIDTH_PAD,
    }),
    [width, WIDTH_PAD]
  );
  const tooltips: TOOLTIP_DATA[] = useMemo(() => {
    return data.map((item, index) => {
      const firstIndex = index === 0;
      const lastIndex = index === data.length - 1;
      const style = firstIndex || lastIndex ? styleMiddle : styleBottom;
      if (!firstIndex && !lastIndex) {
        item.showThumb = true;
        item.thumbIndex = index - 1;
      }
      return {
        ...item,
        style,
      };
    });
  }, [data, styleMiddle, styleBottom]);
  const [index, setIndex] = useState(0);
  const {
    title,
    style,
    showThumb,
    titleStyle,
    descriptionStyle,
    description,
    thumbIndex,
    btnText,
  } = tooltips[index];
  const firstIndex = index === 0;
  const lastIndex = index === tooltips.length - 1;

  const onPressNext = () => {
    if (!lastIndex) {
      layoutAnimation({ duration: 250, damping: 0.8 });
      setIndex(index + 1);
    } else {
      closeTabTour();
    }
  };
  const onSkip = () => {
    closeTabTour();
  };

  return (
    <SafeAreaView
      style={[
        StyleSheet.absoluteFillObject,
        { backgroundColor: 'transparent' },
      ]}
    >
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            opacity: opacity,
            height: tourViewHeight,
            backgroundColor: opacityColor,
          },
        ]}
      />
      <View style={[styles.container, style]}>
        <View style={[{ paddingHorizontal: 12, paddingTop: 20 }]}>
          <Text
            style={[
              styles.title,
              titleStyle,
              firstIndex
                ? [{ textAlign: 'center' }]
                : [{ paddingLeft: 12, color: '#4F47F4' }],
            ]}
          >
            {title}
          </Text>
          {description && (
            <Text style={[styles.description, descriptionStyle]}>
              {description}
            </Text>
          )}
        </View>
        <View
          style={[
            {
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              padding: 20,
            },
          ]}
        >
          <Dots length={tooltips.length} activeIndex={index} />
          <View style={[{ flex: 1 }]} />
          {!lastIndex && (
            <Pressable style={skipBtnStyle} onPress={onSkip}>
              <Text style={[{ color: '#555', marginRight: 10 }]}>or skip</Text>
            </Pressable>
          )}
          <Pressable style={nextBtnStyle} onPress={onPressNext}>
            <Text>{btnText || (lastIndex ? 'Done' : 'Next')}</Text>
          </Pressable>
        </View>
      </View>
      {showThumb && (
        // @ts-ignore
        <View
          style={[
            { position: 'absolute' },
            // @ts-ignore
            { left: ((thumbIndex * 2 + 1) / 8) * width - 24, bottom: 60 },
          ]}
        >
          <Text style={{ fontSize: 36 }}>👇</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#B9CCE3',
    borderRadius: 20,
    width: '100%',
    position: 'absolute',
    paddingBottom: 12,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#46556A',
    marginRight: 4,
    opacity: 0.25,
  },
  dotActive: {
    backgroundColor: '#4F47F4',
    opacity: 1,
  },
  emojiView: {
    position: 'absolute',
    top: -30,
  },
  emoji: {
    fontSize: 36,
    lineHeight: 49,
  },
  emojiCenter: {
    alignSelf: 'center',
  },
  emojiLeft: {
    paddingLeft: 16,
    top: -25,
  },
  title: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    lineHeight: 20,
    padding: 15,
    color: '#4F47F4',
  },
});
