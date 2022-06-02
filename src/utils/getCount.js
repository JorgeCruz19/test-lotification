import { collection, getDocs } from "firebase/firestore";
import { db } from "../db/firebase-config";

async function getCount(ref) {
  const querySnapshot = await getDocs(collection(db, ref));
  return querySnapshot.size
}

export default getCount