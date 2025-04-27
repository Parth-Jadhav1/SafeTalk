import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth, db, storage } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

// 1. 
const AuthContext = React.createContext();
// hook
export function useAuth() {
    // 3
    return useContext(AuthContext);
}

function AuthWrapper({ children }) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        // check kr rahe ho if you have logged in before
        // kuch bhi change -> yha update ho jaayega 
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);
            if (currentUser) {
                const docRef = doc(db, "Users", currentUser?.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const { profile_pic, name, email, lastSeen, status } = docSnap.data();
                    // context me jaake save kr dia hai user ka data
                    await setLastSeen(currentUser);

                    setUserData({
                        id: currentUser.uid,
                        profile_pic,
                        email,
                        name,
                        lastSeen,
                        status: status ? status : ""
                    });

                }
            }
            setLoading(false);
        })
        return () => {
            unsubscribe()
        }
    }, [])


    const setLastSeen = async (user) => {
        const date = new Date();
        const timeStamp = date.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            day: "2-digit",
            
        });
        await updateDoc(doc(db, "Users", user.uid), {
            lastSeen: timeStamp,
        });


    }

    const updateName = async (newName) => {
        await updateDoc(doc(db, "Users", userData.id), {
            name: newName
        });
    }
    const updateStatus = async (newstatus) => {
        await updateDoc(doc(db, "Users", userData.id), {
            status: newstatus
        });
    }

    const updatePhoto = async (img) => {
        try {
            // Validation checks
            if (!img) {
                setError("No file selected");
                return;
            }
            if (!userData?.id) {
                setError("User not authenticated");
                return;
            }
            if (img.size > 5 * 1024 * 1024) {
                setError("File too large (max 5MB)");
                return;
            }
    
            setIsUploading(true);
            setError(null);
    
            const storageRef = ref(storage, `profile/${userData.id}`);
            const uploadTask = uploadBytesResumable(storageRef, img);
    
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Progress tracking (optional)
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    console.error("Upload error:", error);
                    setError(`Upload failed: ${error.message}`);
                    setIsUploading(false);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        await updateDoc(doc(db, "Users", userData.id), {
                            profile_pic: downloadURL,
                        });
                        setUserData(prev => ({
                            ...prev,
                            profile_pic: downloadURL,
                        }));
                    } catch (error) {
                        console.error("Error updating profile:", error);
                        setError("Failed to update profile");
                    } finally {
                        setIsUploading(false);
                    }
                }
            );
        } catch (error) {
            console.error("Unexpected error:", error);
            setError("An unexpected error occurred");
            setIsUploading(false);
        }
    };


    
    return <AuthContext.Provider value={{ setUserData, userData, loading, updateName, updateStatus, updatePhoto, isUploading, error }}>
        {children}
    </AuthContext.Provider>
}

export default AuthWrapper;