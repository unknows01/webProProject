
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

// function displayUserRoles(userRoles) {
//     const roleHolder = document.querySelector('.RoleHolder');
    
//     const rolePaths = {
//         'Seller': '../ListYourPet/ListYourPet.html',
//         'Care Taker': '../AddCareTakerPlace/AddCareTakerPlace.html',
//         'Admin': '../AdminDashboard/AdminDashboard.html'
//     };

//     roleHolder.innerHTML = ''; 

//     if (userRoles && userRoles.length > 0) {
//         roleHolder.classList.add('show-roles'); 
        
//         userRoles.forEach(roleName => {
//             const button = document.createElement('div');
//             button.className = 'Role';
//             button.setAttribute('Role', roleName);
//             button.textContent = roleName;

//             const targetPath = rolePaths[roleName];

//             if (targetPath) {
//                 button.addEventListener('click', function() {
//                     document.location = targetPath;
//                 });
//             }

//             roleHolder.appendChild(button);
//         });
//     } else {
//         roleHolder.classList.remove('show-roles');
//     }
// }

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

// --- ฟังก์ชันสำหรับแสดง/ซ่อนปุ่ม Role และ Dashboard Stats ที่เกี่ยวข้อง ---
displayUserRoles(['Seller' , 'Care Taker' , 'Admin'])
function displayUserRoles(userRoles) {
    const roleHolder = document.querySelector('.user-role-selector'); // ใช้คลาสใหม่ .user-role-selector
    
    // กำหนดเส้นทาง URL สำหรับแต่ละ Role
    const rolePaths = {
        'Seller': '../DashBoardSeller/DashBoardSeller.html',
        'Care Taker': '../DashBoardCareTaker/DashBoardCareTaker.html',
        'Admin': '../AdminDashboard/AdminDashboard.html'
    };

    // Card สถิติที่เกี่ยวข้องกับ Role
    const roleStatCards = {
        'Seller': 'listingStat', // สำหรับ Seller
        'Care Taker': 'careTakerStat', // สำหรับ Care Taker
    };

    // 1. ล้างปุ่ม Role ที่มีอยู่และซ่อน RoleHolder
    roleHolder.innerHTML = '';
    roleHolder.classList.remove('show-roles');

    // 2. ซ่อน Stat Card ที่เกี่ยวข้องกับ Role ทั้งหมดก่อน
    document.querySelectorAll('.stat-card-role').forEach(card => {
        card.classList.add('hidden');
    });

    if (userRoles && userRoles.length > 0) {
        // 3. แสดง RoleHolder
        roleHolder.classList.add('show-roles'); 
        
        userRoles.forEach(roleName => {
            // สร้างปุ่ม Role
            const button = document.createElement('li'); // เปลี่ยนเป็น <li> เพื่อให้เป็นไปตาม ul
            button.className = 'Role';
            button.setAttribute('Role', roleName);
            button.textContent = roleName;

            const targetPath = rolePaths[roleName];

            if (targetPath) {
                // ผูก Event Listener สำหรับการนำทาง
                button.addEventListener('click', function() {
                    document.location = targetPath;
                });
            }

            roleHolder.appendChild(button);

            // 4. แสดง Stat Card ที่เกี่ยวข้องกับ Role
            const statCardId = roleStatCards[roleName];
            if (statCardId) {
                const statCard = document.getElementById(statCardId);
                if (statCard) {
                    statCard.classList.remove('hidden');
                }
            }
        });
    }
}