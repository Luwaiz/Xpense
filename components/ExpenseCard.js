import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../hooks/Colours";

const ExpenseCard = ({ item}) => {
  return (
    <View style={styles.card}>
      <View style={styles.details}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.category}>{item?.category}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>₦{item?.amount}</Text>
        <Text style={styles.date}>{item?.date}</Text>
      </View>
    </View>
  );
};

export default ExpenseCard;

const styles = StyleSheet.create({
  card: {
    marginHorizontal:16,
    marginVertical:20,
    backgroundColor: colors.secondaryGrey, // Use your theme colors
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
  },
  category: {
    fontSize: 14,
    color: colors.greyText,
  },
  amountContainer: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primaryGrey, // Use an appropriate color
  },
  date: {
    fontSize: 12,
    color: colors.greyText,
  },
});
