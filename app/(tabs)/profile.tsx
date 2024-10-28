import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Pressable, Alert } from "react-native";

export default function Profiles() {
  const [ready, setReady] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const STRIPE_KEY =
    "pk_test_51QD5KlIxfWfqadDi8MgkAhP7PLToFdQrvuI5A5L12Y5sYqsAenZxA9MMw5nE1Ls1LqozBEOcBnAzSStoCsjPQJzM00pzU38jph";

  const onCheckout = async () => {
    // 1. Create a payment intent
    var clientSecret = null;
    try {
      const response = await fetch(
        "http://192.168.1.175:3000/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: 1000, // USD $10.00
            currency: "usd",
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        return;
      }

      const data = await response.json();
      clientSecret = data.paymentIntent;

      console.log(`Payment Intent Client Secret: ${clientSecret}`);
    } catch (error) {
      console.error(error);
    }

    // 2. Initialize the payment sheet

    const initResponse = await initPaymentSheet({
      merchantDisplayName: "notJust.dev",
      paymentIntentClientSecret: clientSecret,
    });

    if (initResponse.error) {
      console.log(initResponse.error);
      Alert.alert("Something went wrong on initResponse");
      return;
    }

    // 3. Present the payment sheet from stripe
    await presentPaymentSheet();

    // 4. If payment OK => create the order ....
  };

  return (
    <StripeProvider publishableKey={STRIPE_KEY}>
      <View style={styles.mainContainer}>
        <Pressable onPress={onCheckout} style={styles.button}>
          <Text>Checkout</Text>
        </Pressable>
      </View>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 10,
  },
});
