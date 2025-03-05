import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const toggleLike = async (articleId, userId) => {
  if (!userId) return;

  const articleRef = doc(db, "articles", articleId);
  const articleSnap = await getDoc(articleRef);

  if (articleSnap.exists()) {
    const articleData = articleSnap.data();
    const likesArray = articleData.likes || [];

    const likes = likesArray.includes(userId) ? arrayRemove(userId) :  arrayUnion(userId);

    await updateDoc(articleRef, {
      likes,
    });
  }
};