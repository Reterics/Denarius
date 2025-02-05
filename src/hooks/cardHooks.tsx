import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../utils/firebase";
import { PaymentMethod } from "../models/PaymentMethodModel";

const CARD_COLLECTION_NAME = "paymentMethod";

export function useGetPaymentMethodData() {
  const [card, setCardData] = useState<PaymentMethod[]>([]);
  const docRef = collection(db, CARD_COLLECTION_NAME);
  const q = query(docRef, orderBy("priority", "asc"));

  useEffect(() => {
    // onSnapshot so we can get data update real-time
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const card = querySnapshot.docs.map((doc) => {
        const data = doc.data(); // return data compatible with data types specified
        return {
          id: doc.id,
          name: data.name,
          priority: data.priority,
        };
      });
      setCardData(card);
      console.log(card);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return card;
}
