
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
function displayUserRoles(userRoles) {
    // กำหนด Role ปัจจุบัน (Current Role) ที่กำลังแสดงอยู่
    // ในหน้า DashBoard.html นี้ Role ปัจจุบันคือ 'User'
    const currentRole = 'Seller'; 
    
    const roleHolder = document.querySelector('.user-role-selector');
    
    // กำหนดเส้นทาง URL สำหรับแต่ละ Role
    const rolePaths = {
        'User': '../DashBoard/DashBoard.html', // เพิ่ม User Dashboard
        'Seller': '../DashBoardSeller/DashBoardSeller.html',
        'Care Taker': '../DashBoardCareTaker/DashBoardCareTaker.html',
        'Admin': '../DashboardAdmin/DashboardAdmin.html'
    };

    // Card สถิติที่เกี่ยวข้องกับ Role
    const roleStatCards = {
        'Seller': 'listingStat', 
        'Care Taker': 'careTakerStat', 
    };

    // 1. ล้างปุ่ม Role ที่มีอยู่และซ่อน Stat Card ทั้งหมด
    roleHolder.innerHTML = '';
    
    document.querySelectorAll('.stat-card-role').forEach(card => {
        card.classList.add('hidden');
    });
    
    // รวม 'User' เข้าไปในรายการบทบาทที่ต้องแสดงเสมอ
    const rolesToDisplay = Array.from(new Set(['User', ...userRoles]));

    if (rolesToDisplay.length > 0) {
        
        rolesToDisplay.forEach(roleName => {
            // สร้างปุ่ม Role
            const button = document.createElement('li'); 
            button.className = 'Role';
            button.setAttribute('Role', roleName);
            button.textContent = roleName;

            const targetPath = rolePaths[roleName];
            
            // **ไฮไลต์บทบาทปัจจุบัน**
            if (roleName === currentRole) {
                button.classList.add('active-role');
            }

            if (targetPath) {
                // ผูก Event Listener สำหรับการนำทาง
                button.addEventListener('click', function() {
                    // ป้องกันการโหลดซ้ำหน้าเดิม
                    if (roleName !== currentRole) {
                        document.location = targetPath;
                    }
                });
            }

            roleHolder.appendChild(button);

            // 4. แสดง Stat Card ที่เกี่ยวข้องกับ Role ปัจจุบันเท่านั้น
            if (roleName === currentRole) {
                // ใน User Dashboard นี้ เราจะแสดง Stat Card ของ Seller และ Care Taker
                // หากผู้ใช้มีสิทธิ์ใน Role นั้นๆ ด้วย
                const hasSeller = userRoles.includes('Seller');
                const hasCareTaker = userRoles.includes('Care Taker');

                if (hasSeller) {
                    document.getElementById(roleStatCards['Seller'])?.classList.remove('hidden');
                }
                if (hasCareTaker) {
                    document.getElementById(roleStatCards['Care Taker'])?.classList.remove('hidden');
                }
            }
        });
    }
}

// --- ฟังก์ชันจำลองการดึงข้อมูลผู้ใช้ (แทนที่ด้วยการเรียก API จริง) ---
function fetchUserProfile() {
    // *** ทดสอบ: ผู้ใช้คนนี้เป็น User, Seller, และ Admin ***
    const user = {
        name: "John Doe", 
        roles: ["Seller", "Admin"], // บทบาทเสริมที่นอกเหนือจาก 'User'
        stats: {
            pets: 4,
            messages: 2,
            listings: 1 
        }
    };
    return user;
}

// --- อัปเดต DOMContentLoaded Listener ---
// document.addEventListener('DOMContentLoaded', function() {
//     UserProfileHandler();

//     try {
//         const user = fetchUserProfile();
//         
//         // อัปเดตชื่อผู้ใช้
//         const userNameDisplay = document.getElementById('userNameDisplay');
//         if (userNameDisplay) {
//             userNameDisplay.textContent = user.name;
//         }
//         
//         // แสดงปุ่ม Role และ Stat Cards ตามบทบาท
//         displayUserRoles(user.roles);

//     } catch (error) {
//         console.error("Error loading user profile:", error);
//     }
// });

displayUserRoles(['Seller' , 'Care Taker' , 'Admin'])