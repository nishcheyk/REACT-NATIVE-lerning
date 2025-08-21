import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import Animated, {
  ZoomIn,
  ZoomOut,
  FlipInYRight,
  FlipOutYLeft,
} from "react-native-reanimated";

const CalculatorButton = ({
  text,
  onPress,
  style,
  textStyle,
}: {
  text: string;
  onPress: () => void;
  style?: object;
  textStyle?: object;
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && { opacity: 0.6 },
      ]}
      onPress={onPress}
      android_ripple={{ color: "#ccc" }}
    >
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </Pressable>
  );
};

export default function App() {
  const [display, setDisplay] = useState("0");
  const [prevNumber, setPrevNumber] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [resetNext, setResetNext] = useState(false);

  const handleNumberPress = (num: string) => {
    if (resetNext) {
      setDisplay(num);
      setResetNext(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPrevNumber(null);
    setOperator(null);
    setResetNext(false);
  };

  const handlePlusMinus = () => {
    if (display === "0") return;
    if (display.startsWith("-")) {
      setDisplay(display.slice(1));
    } else {
      setDisplay("-" + display);
    }
  };

  const handlePercentage = () => {
    const num = parseFloat(display);
    setDisplay(String(num / 100));
  };

  const handleOperatorPress = (op: string) => {
    if (prevNumber != null && operator && !resetNext) {
      const result = calculate();
      setPrevNumber(result);
      setDisplay(result);
    } else {
      setPrevNumber(display);
    }
    setOperator(op);
    setResetNext(true);
  };

  const calculate = () => {
    if (!operator || prevNumber === null) return display;
    const current = parseFloat(display);
    const previous = parseFloat(prevNumber);

    let result: number = 0;
    switch (operator) {
      case "+":
        result = previous + current;
        break;
      case "-":
        result = previous - current;
        break;
      case "×":
        result = previous * current;
        break;
      case "÷":
        if (current === 0) {
          Alert.alert("Error", "Cannot divide by zero");
          return "0";
        }
        result = previous / current;
        break;
      default:
        return display;
    }
    return result.toString();
  };

  const handleEquals = () => {
    const result = calculate();
    setDisplay(result);
    setPrevNumber(null);
    setOperator(null);
    setResetNext(true);
  };

  const handleDot = () => {
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <Animated.Text
          style={styles.displayText}
          entering={ZoomIn.delay(100)}
          exiting={ZoomOut}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {display}
        </Animated.Text>
      </View>

      <View style={styles.buttonsContainer}>
        {/* Row 1 */}
        <View style={styles.row}>
          <CalculatorButton
            text="C"
            onPress={handleClear}
            style={styles.grayButton}
            textStyle={{ fontWeight: "bold" }}
          />
          <CalculatorButton
            text="+/-"
            onPress={handlePlusMinus}
            style={styles.grayButton}
          />
          <CalculatorButton
            text="%"
            onPress={handlePercentage}
            style={styles.grayButton}
          />
          <CalculatorButton
            text="÷"
            onPress={() => handleOperatorPress("÷")}
            style={styles.orangeButton}
          />
        </View>

        {/* Row 2 */}
        <View style={styles.row}>
          <CalculatorButton text="7" onPress={() => handleNumberPress("7")} />
          <CalculatorButton text="8" onPress={() => handleNumberPress("8")} />
          <CalculatorButton text="9" onPress={() => handleNumberPress("9")} />
          <CalculatorButton
            text="×"
            onPress={() => handleOperatorPress("×")}
            style={styles.orangeButton}
          />
        </View>

        {/* Row 3 */}
        <View style={styles.row}>
          <CalculatorButton text="4" onPress={() => handleNumberPress("4")} />
          <CalculatorButton text="5" onPress={() => handleNumberPress("5")} />
          <CalculatorButton text="6" onPress={() => handleNumberPress("6")} />
          <CalculatorButton
            text="-"
            onPress={() => handleOperatorPress("-")}
            style={styles.orangeButton}
          />
        </View>

        {/* Row 4 */}
        <View style={styles.row}>
          <CalculatorButton text="1" onPress={() => handleNumberPress("1")} />
          <CalculatorButton text="2" onPress={() => handleNumberPress("2")} />
          <CalculatorButton text="3" onPress={() => handleNumberPress("3")} />
          <CalculatorButton
            text="+"
            onPress={() => handleOperatorPress("+")}
            style={styles.orangeButton}
          />
        </View>

        {/* Row 5 */}
        <View style={styles.row}>
          <CalculatorButton
            text="0"
            onPress={() => handleNumberPress("0")}
            style={styles.zeroButton}
          />
          <CalculatorButton text="." onPress={handleDot} />
          <CalculatorButton
            text="="
            onPress={handleEquals}
            style={styles.orangeButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232323",
    padding: 16,
    justifyContent: "space-between",
  },
  displayContainer: {
    flex: 2,
    justifyContent: "flex-end",
  },
  displayText: {
    color: "white",
    fontSize: 64,
    fontWeight: "bold",
    textAlign: "right",
    marginBottom: 10,
  },
  buttonsContainer: {
    flex: 5,
  },
  row: {
    flexDirection: "row",
    marginVertical: 6,
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#333333",
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  zeroButton: {
    flex: 2,
  },
  grayButton: {
    backgroundColor: "#a5a5a5",
  },
  orangeButton: {
    backgroundColor: "#f08a5d",
  },
  buttonText: {
    fontSize: 28,
    color: "white",
    fontWeight: "700",
  },
});
