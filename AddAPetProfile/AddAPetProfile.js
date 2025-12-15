
function openLoginModal() {
  document.getElementById("loginModal").classList.add("show-modal");
}
        
function closeLoginModal() {
  document.getElementById("loginModal").classList.remove("show-modal");
}


function openSignupModal() {
  document.getElementById("signupModal").classList.add("show-modal");
}
        

function closeSignupModal() {
  document.getElementById("signupModal").classList.remove("show-modal");
}
        

window.onclick = function(event) {
  if (event.target.id === "loginModal") {
    closeLoginModal();
  }
if (event.target.id === "signupModal") {
  closeSignupModal();
 }
}

function displayUserRoles(userRoles) {
    const roleHolder = document.querySelector('.RoleHolder');
    
    const rolePaths = {
        'Seller': '../ListYourPet/ListYourPet.html',
        'Care Taker': '../AddCareTakerPlace/AddCareTakerPlace.html',
        'Admin': '../AdminDashboard/AdminDashboard.html'
    };

    roleHolder.innerHTML = ''; 

    if (userRoles && userRoles.length > 0) {
        roleHolder.classList.add('show-roles'); 
        
        userRoles.forEach(roleName => {
            const button = document.createElement('div');
            button.className = 'Role';
            button.setAttribute('Role', roleName);
            button.textContent = roleName;

            const targetPath = rolePaths[roleName];

            if (targetPath) {
                button.addEventListener('click', function() {
                    document.location = targetPath;
                });
            }

            roleHolder.appendChild(button);
        });
    } else {
        roleHolder.classList.remove('show-roles');
    }
}

// function UserProfile(login) {
//   const userProfile = document.getElementById("userProfile");
//   if(login){
//     // userProfile.addEventListener("click", document.location='../UserProfile/UserProfile.html')
//   }
//   else{
//     userProfile.addEventListener("click", openLoginModal())
//   }
            
// }

// --- ฟังก์ชัน LogOut ---
function LogOut() {
    // 1. ล้างข้อมูลการเข้าสู่ระบบ (เช่น token, session storage, local storage)
    console.log("User Logged Out"); // สำหรับการทดสอบ
    localStorage.removeItem('userToken'); 
    // ตัวอย่างการลบข้อมูลผู้ใช้

    // 2. ส่งผู้ใช้กลับไปยังหน้า Home
    document.location = '../home/home.html';
}

// --- ฟังก์ชันหลักสำหรับ Profile Icon ---
function UserProfileHandler() {
    const profileIcon = document.getElementById("userProfile");
    const profileIconContainer = profileIcon.closest('.profile-icon');
    
    // ตรวจสอบสถานะการเข้าสู่ระบบ
    // (***คุณต้องกำหนดวิธีการตรวจสอบสถานะการเข้าสู่ระบบจริง ๆ ที่นี่***)
    // สำหรับการสาธิตนี้ สมมติว่ามีตัวแปร isUserLoggedIn หรือตรวจสอบจาก local storage
    const isUserLoggedIn = true; // สมมติว่าผู้ใช้เข้าสู่ระบบแล้ว

    if (isUserLoggedIn) {
        // ถ้าเข้าสู่ระบบแล้ว: แสดง/ซ่อน Dropdown เมื่อคลิก
        profileIcon.addEventListener('click', function(event) {
            // ป้องกันการปิดทันทีเมื่อคลิก
            event.stopPropagation(); 
            // Toggle class 'active' เพื่อแสดง/ซ่อน Dropdown
            profileIconContainer.classList.toggle('active');
        });
        
        // ปิด Dropdown เมื่อคลิกที่อื่นบนหน้าจอ
        window.addEventListener('click', function(event) {
            if (!profileIconContainer.contains(event.target)) {
                profileIconContainer.classList.remove('active');
            }
        });
        
    } else {
        // ถ้ายังไม่ได้เข้าสู่ระบบ: เปิด Login Modal เมื่อคลิก
        profileIcon.addEventListener('click', function() {
            openLoginModal(); 
        });
    }
}

// --- เรียกใช้ฟังก์ชันเมื่อ DOM โหลดเสร็จ ---
document.addEventListener('DOMContentLoaded', function() {
    UserProfileHandler();
    // ถ้าคุณต้องการให้มีการตรวจสอบบทบาท (Role) เมื่อโหลดหน้า
    // และแสดงเมนูบทบาท (RoleHolder) คุณสามารถเรียกใช้ฟังก์ชัน displayUserRoles(userRoles) ที่นี่
});

// ฟังก์ชัน openLoginModal, closeLoginModal, openSignupModal, closeSignupModal 
// และ displayUserRoles ยังคงเหมือนเดิม

// --------------- UploadFile ---------------
document.getElementById('PetPhotoFile').addEventListener('change', function(event) {
const [file] = event.target.files
            if (file) {
                const preview = document.getElementById('pet-photo-preview');
                const placeholder = document.querySelector('.photo-placeholder .fa-camera');
                
                preview.src = URL.createObjectURL(file);
                preview.style.display = 'block';
                if (placeholder) {
                    placeholder.style.display = 'none';
                }
            }
        });


function CreatePet(){
  
}