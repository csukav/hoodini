import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: Date;
  couponCode?: string;
  couponSent?: boolean;
}

const NEWSLETTER_COLLECTION = "newsletter_subscribers";

export async function subscribeNewsletter(email: string): Promise<string> {
  try {
    // Check if email already exists
    const q = query(
      collection(db, NEWSLETTER_COLLECTION),
      where("email", "==", email.toLowerCase())
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      throw new Error("Ez az email már feliratkozott");
    }

    // Add new subscriber
    const docRef = await addDoc(collection(db, NEWSLETTER_COLLECTION), {
      email: email.toLowerCase(),
      subscribedAt: Timestamp.now(),
      couponSent: false,
    });

    return docRef.id;
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    throw error;
  }
}

export async function getNewsletter(): Promise<NewsletterSubscriber[]> {
  try {
    const querySnapshot = await getDocs(
      collection(db, NEWSLETTER_COLLECTION)
    );
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        email: data.email,
        subscribedAt: data.subscribedAt?.toDate?.() || new Date(),
        couponCode: data.couponCode,
        couponSent: data.couponSent || false,
      } as NewsletterSubscriber;
    });
  } catch (error) {
    console.error("Error getting newsletter:", error);
    throw error;
  }
}
