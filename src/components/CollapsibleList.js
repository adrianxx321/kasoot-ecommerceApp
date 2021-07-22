import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { ScreenRatio_iPhone } from './ScreenRatio-iPhone';

const CollapsibleList = ({ title, children }) => {
  const [open, setOpen] = useState(false)
  const animatedController = useRef(new Animated.Value(0)).current
  const [bodySectionHeight, setBodySectionHeight] = useState(0)

  const bodyHeight = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, bodySectionHeight],
  });

  const arrowAngle = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0rad', `${Math.PI}rad`],
  });

  const toggleListItem = () => {
    if (open) {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 0,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false
      }).start()
    } else {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 1,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        useNativeDriver: false
      }).start()
    }
    setOpen(!open);
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => toggleListItem()}>
        <View style={styles.titleContainer}>
          <Text style={{
                fontSize: ScreenRatio_iPhone(20),
                fontWeight: "600",
            }}>{title}</Text>
          <Animated.View style={{ transform: [{ rotateX: arrowAngle }] }}>
            <Image
                source={require("../../assets/icons/accordion-arrow.png")}
                style={{
                    width: ScreenRatio_iPhone(24),
                    height: ScreenRatio_iPhone(24)
            }}/>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
      <Animated.View style={{height: bodyHeight, overflow: "hidden" }}>
        <View
            style={styles.bodyContainer}
            onLayout={event =>
                setBodySectionHeight(event.nativeEvent.layout.height)
          }>
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        marginHorizontal: ScreenRatio_iPhone(25),
        marginVertical: ScreenRatio_iPhone(20),
        justifyContent: "space-between",
        borderColor: "#c2c2c2",
    },
    bodyContainer: {
        marginHorizontal: ScreenRatio_iPhone(25),
        position: 'absolute',
        borderBottomWidth: 1,
        paddingTop: ScreenRatio_iPhone(10),
        paddingBottom: ScreenRatio_iPhone(30),
        borderBottomColor: "#c2c2c2"
    },
})

export default CollapsibleList