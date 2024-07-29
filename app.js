import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getFirestore, doc, getDocs ,collection, getDoc, setDoc, updateDoc, Timestamp} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { getStorage , ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";


const firebaseConfig1 = {
  apiKey: "AIzaSyDdPmw7EHBU-AwoDQ1szeW7WtHANaF30Q0",
  authDomain: "xo-game-c2506.firebaseapp.com",
  projectId: "xo-game-c2506",
  storageBucket: "xo-game-c2506.appspot.com",
  messagingSenderId: "1003496744924",
  appId: "1:1003496744924:web:34f59f5e9df9d261831119",
  measurementId: "G-701HCZH6H9"
};

const app1 = initializeApp(firebaseConfig1, "app1");
const db = getFirestore(app1);
const storage = getStorage(app1);

document.getElementById('focus').style.display='none'
document.getElementById('uploadYourDetails').style.display='none'
document.getElementById('uploadYourBlog').style.display='none'

loadBlogs()

async function loadBlogs() {
    document.getElementById('loaderBox').style.display='flex'
    document.getElementById('home').style.display='none'


    document.getElementById('blogBox').innerHTML = '';
       const querySnapshot = await getDocs(collection(db, "blogverse"));        
        querySnapshot.forEach((doc) => {
            for (let i = 1; i < 10; i++) {
                let key = `Blog${i}`;
                let blogData = doc.data()[key];

                if (blogData) {
                    console.log(doc.id); 
                    let truncatedContent = blogData[1].substring(0, 200);  // Truncate content to 200 characters
                    let temp = `
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title"><b>${blogData[0]}</b></h5>
                                <div class='userDetails'>
                                    <img class='profilePhoto' src='${doc.data().Profile}' alt='Profile Photo'>
                                    <p>${doc.data().Name} - ${convertTimestampToDate(blogData[2])}</p>
                                </div>
                                <p class="card-text">${truncatedContent}...</p>
                                <a style="
    color: blue;
    text-decoration: underline;
" onClick='openBlog("${doc.id}","${key}")' class="card-link">Read More</a>
                            </div>
                        </div>
                    `;
                    document.getElementById('blogBox').innerHTML += temp;
                } else {
                    break;
                }
            }
        });
    
    document.getElementById('loaderBox').style.display='none'
    document.getElementById('home').style.display='block';


}

async function openBlog(id,key) {
    document.getElementById('loaderBox').style.display='flex'
    document.getElementById('focus').style.display='none'
    moreByUser(id)
    document.getElementById('home').style.display='none'
    document.getElementById('welcomeBox').style.display='none'
    const docRef = doc(db, "blogverse", id);
const docSnap = await getDoc(docRef);
let blogData = docSnap.data()[key];
if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  let temp = `
       <a href='index.html'><button  style="
        width: fit-content;
        padding: 10px 20px;
        background-color: #3498db; /* Blue background */
        color: white; /* White text */
        border: none; /* No border */
        border-radius: 5px; /* Rounded corners */
        font-size: 16px; /* Larger font size */
        font-weight: bold; /* Bold text */
        cursor: pointer; /* Pointer cursor on hover */
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
        transition: background-color 0.3s ease, transform 0.3s ease; /* Smooth transition */
    "
    onmouseover="this.style.backgroundColor='#2980b9'; this.style.transform='scale(1.05)';"
    onmouseout="this.style.backgroundColor='#3498db'; this.style.transform='scale(1)';"
    >Go Back</button></a>
  <div class="card">
      <div class="card-body">
          <h5 class="card-title"><b>${blogData[0]}</b></h5>
          <div class='userDetails'>
              <img class='profilePhoto' src='${docSnap.data().Profile}' alt='Profile Photo'>
              <p>${docSnap.data().Name} - ${convertTimestampToDate(blogData[2])}</p>
          </div>
          <p class="card-text">${blogData[1]}</p>
      </div>
  </div>
`;
let temp2 = `
<div class="card">
    <div class="card-body">
        <div class='userBox'>
            <img class='userppBox' src='${docSnap.data().Profile}' alt='Profile Photo'>
            <br>
            <h3><b>${docSnap.data().Name}</b></h3>
            <h5 style="te;text-decoration: underline;">${id}</h5>
        </div>
    </div>
</div>
`;
document.getElementById('userBlog').innerHTML=temp
document.getElementById('userdetail').innerHTML=temp2
document.getElementById('focus').style.display='flex'

} else {
  console.log("No such document!");
}
    document.getElementById('loaderBox').style.display='none'
    document.getElementById('focus').style.display='flex'
    console.log(id);
    console.log(key);

}

async function moreByUser(id){
    console.log("loading more by user")
    const docRef = doc(db, "blogverse", id);
const docSnap = await getDoc(docRef);
for (let i = 1; i < 10; i++) {
    let key = `Blog${i}`;
    let blogData = docSnap.data()[key];

    if (blogData) {
        let truncatedContent = blogData[1].substring(0, 100);   

        let tempk = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title"><b>${blogData[0]}</b></h5>
                    <div class='userDetails'>
                        <p>${convertTimestampToDate(blogData[2])}</p>
                    </div>
                    <p class="card-text">${truncatedContent}...</p>
                    <a style="
    color: blue;
    text-decoration: underline;
" onClick='openBlog("${doc.id}","${key}")' class="card-link">Read More</a>
                </div>
            </div>
        `;
console.log("written")
        document.getElementById('moreByUser').innerHTML += tempk;
    } else {
        break;
    }
}

}
function convertTimestampToDate(timestamp) {
    if (!timestamp) {
        return "Invalid timestamp";
    }

    const date = timestamp.toDate();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

async function checkUserDetails() {
    const userEmail = localStorage.getItem('MKA-Email');
    
    if (userEmail) {
      try {
        const docRef = doc(db, "blogverse", userEmail);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          console.log("User details found:", docSnap.data());
          document.getElementById('main').style.display = 'none';
          document.getElementById('uploadYourBlog').style.display = 'block';
        } else {
          console.log("No user details found.");
          document.getElementById('main').style.display = 'none';
          document.getElementById('uploadYourDetails').style.display = 'block';
        }
      } catch (error) {
        console.error("Error checking user details:", error);
      }
    } else {
      console.log("No email found in localStorage.");
    }
  }
  
  


  document.getElementById('submitUserDetailsBtn').addEventListener('click', async function() {
    let name = document.getElementById('input-field').value;
    let fileInput = document.getElementById('input-file');
    let errorElement = document.getElementById('err');
    
    if (name === '' || fileInput.files.length === 0) {
      errorElement.innerText = 'Please fill all fields.';
    } else {
      errorElement.innerText = ''; 
      
      try {
        document.getElementById('loaderBox').style.display='flex'
        document.getElementById('uploadYourDetails').style.display='none'

        const file = fileInput.files[0];
        const storageRef = ref(storage, `profile_pics/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        uploadTask.on('state_changed', 
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
            console.error('Upload failed:', error);
          }, 
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('File available at', downloadURL);
            
            await setDoc(doc(db, "blogverse", localStorage.getItem('MKA-Email')), {
              name: name,
              Profile: downloadURL
            });
            
            console.log('User details saved successfully.');
            checkUserDetails();
          }
        );
      } catch (error) {
        console.error('Error saving user details:', error);
      }
    }
  });
  
  document.getElementById('submitBlogBtn').addEventListener('click', async function() {
    let title=document.getElementById('input-BlogTitle').value
    let content=document.getElementById('input-BlogContent').value
    let email=localStorage.getItem('MKA-Email');
    let newBlog;

    if(title=='' || content==''){
        document.getElementById('err1').innerText='Please fill all fields'
    }else{
        document.getElementById('uploadYourBlog').style.display='none'
        document.getElementById('loaderBox').style.display='flex'
        const docRef = doc(db, "blogverse", email);
        const docSnap = await getDoc(docRef);
        for (let i = 1; i < 100; i++) {
            let key = `Blog${i}`;
            let blogData = docSnap.data()[key];
            if (!blogData) {
                newBlog=key;
                 break;
            }
    }
    let tempArr=[]
    tempArr=[
        title,
        content,
        Timestamp.fromDate(new Date())
    ]
    const docRef1 = doc(db, "blogverse", email);
    await updateDoc(docRef1, {
      [newBlog]: tempArr
    });
    }
    window.location.href='index.html'
  })


async function createPost(){
    checkUserDetails()

}
window.openBlog=openBlog;
window.createPost=createPost;