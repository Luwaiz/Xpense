import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import React from "react";
import TransactionBox from "./TransactionBox";

const TransactionList = ({ data, refreshing, fetchData }) => {

  return (
    <FlatList
      style={styles.scroll}
      data={data ?? []} // Prevent null issues
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => <TransactionBox item={item} />}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchData ?? (() => {})} />
      }
    />
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
});
