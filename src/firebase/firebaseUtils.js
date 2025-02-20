import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const toggleLike = async (articleId, userId) => {
  if (!userId) return;

  const articleRef = doc(db, "articles", articleId);
  const articleSnap = await getDoc(articleRef);

  if (articleSnap.exists()) {
    const articleData = articleSnap.data();
    const likesArray = articleData.likes || [];

    if (likesArray.includes(userId)) {
      // User already liked → remove like
      await updateDoc(articleRef, {
        likes: arrayRemove(userId),
      });
    } else {
      // User hasn't liked yet → add like
      await updateDoc(articleRef, {
        likes: arrayUnion(userId),
      });
    }
  }
};