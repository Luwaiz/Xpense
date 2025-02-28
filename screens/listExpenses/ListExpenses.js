import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import TransactionList from "../../components/TransactionList";
import styles from "./Styles";
import AuthStore from "../../hooks/ZustandStore";
import axios from "axios";
import API from "../../hooks/API";

const ListExpenses = ({ route }) => {
	const { BudgetId } = route.params;
	const [expenses, setExpenses] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	const token = AuthStore((state) => state.token);

  const getExpenses = async () => {
    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      const response = await axios.get(`${API.getBudgetCategories}/${BudgetId}`, header);
      console.log(response.data);
      setExpenses(response.data);
    } catch (err) {
      console.log("Error fetching expenses:", err.response);
    }
  };
  
	useEffect(() => {
		getExpenses();
	}, []);
	return (
		<View style={styles.container}>
			<TransactionList
				data={expenses}
				fetchData={getExpenses}
				refreshing={refreshing}
			/>
		</View>
	);
};

export default ListExpenses;
