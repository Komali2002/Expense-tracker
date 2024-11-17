import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import SmsRetriever from 'react-native-sms-retriever';

const App = () => {
  const transactionMessages: string[] = [
    "2022-01-01 10:00:00, $50 to John Smith",
    "2022-01-02 12:30:00, $25 to Jane Doe",
    "2022-01-02 15:00:00, $75 to John Smith",
    "2022-01-03 09:00:00, $100 to Jane Doe",
    "2022-01-03 14:00:00, $150 to John Smith",
  ];
  function parseTransactionMessage(transactionMessage: string) {
    const regex = /^(\d{4}-\d{2}-\d{2})\s(\d{2}:\d{2}:\d{2}),\s\$(\d+)\s+to\s+(.+)$/;
    const match = regex.exec(transactionMessage);
    if (!match) {
      throw new Error(`Invalid transaction message: ${transactionMessage}`);
    }
    const [_, dateString, timeString, amountString, recipient] = match;
    const date = new Date(dateString);
    const time = timeString.split(":").map((n) => parseInt(n, 10));
    const amount = parseFloat(amountString);
    return { date, time, amount, recipient };
  }
  function sortTransactionsByDate(transactions: any[]) {
    return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
  }
  function categorizeExpensesByRecipient(transactions: any[]) {
    return transactions.reduce((result, transaction) => {
      const { recipient, amount } = transaction;
      if (!result[recipient]) {
        result[recipient] = 0;
      }
      result[recipient] += amount;
      return result;
    }, {});
  }
  const transactions = transactionMessages.map(parseTransactionMessage);
const sortedTransactions = sortTransactionsByDate(transactions);
const categorizedExpenses = categorizeExpensesByRecipient(transactions);

console.log("Sorted transactions:");
console.log(sortedTransactions);

console.log("Categorized expenses:");
console.log(categorizedExpenses);

  return (
    <View>
      <Text>sortedTransactions</Text>
      <Text>categorizedExpenses</Text>
    </View>
  );
};
export default App;