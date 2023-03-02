<template>
  <div>
        Email : <input type="text" placeholder="email" v-model="email" />
        Password : <input type="password" name="pwd" id="" v-model="pwd"/>
        <button @click="($event) => login()">Login</button>
        <button @click="($event) => Register()">Register</button>
        <button @click="($event) => GoogleLogin()">GoogleLogin</button>
        <button @click="addUserData">เพิ่มข้อมูล</button>
        <button @click="showMenu">แสดงเมนู</button>
        ชื่อไทย: <input type="nameTh" placeholder="nameTh" v-model="menu.nameTH">
        ชื่ออังกฤษ: <input type="nameEn" placeholder="nameEn" v-model="menu.nameEn">
        ราคา: <input type="price" placeholder="price" v-model="menu.price">
        รายละเลียด: <input type="detail" placeholder="detail" v-model="menu.detail">
    </div>
    <div>
      <table>
          <tr>
              <td>ชื่อ</td>
              <td>ผักกาดจอ</td>
              <td>ผักกระเพราหมู</td>
              <td>ราคา</td>
          </tr>
          <tr v-for="menuItem in allMenu" :key="menuItem.id">
              <td>{{ menuItem.data.nameTH }}</td>
              <td>{{ menuItem.data.nameEn }}</td>
              <td>...</td>
              <td>ลบ...{{ menuItem.id }}</td> <br />
                <button @click="deleteMenu(menuItem.id)">ลบ</button>
          </tr>
          <tr></tr>
          <tr></tr>
      </table>
    </div>
</template>

<script setup>
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword,signInWithPopup,GoogleAuthProvider} from "firebase/auth";
import { useRouter} from "vue-router";
import { db } from "../main.js";
const router = useRouter();
const email = ref("");
const pwd = ref("");
const menu = ref({nameTH: "", nameEn: "", price: 0, detail: ""})
const allMenu = ref([]);

async function addUserData() {
  try {
  const docRef = await addDoc(collection(db, "foodmanu"), menu.value);
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

}
  
async function showMenu() {
   const querySnapshot = await getDocs(collection(db, "foodmanu"));
   querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc anapshots
      console.log(doc.id, " => ", doc.data());
      const myDoc = ref({ id: doc.id, data: doc.data() });
      // allMenu.value.push(doc.data());
      allMenu.value.push(myDoc.value);
   });
}

function login(){
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithEmailAndPassword(auth, email.value, pwd.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("User = " + user);
    router.push("about");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

}
function Register(){
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, pwd.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("User = " + user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode + errorMessage);
    //..
  });
}
function GoogleLogin(){
    const auth = getAuth();
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    console.log("token ="+token+""+user)
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

</script>

<style></style>