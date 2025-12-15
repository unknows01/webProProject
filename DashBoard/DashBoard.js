
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

// ---  LogOut ---
function LogOut() {
    console.log("User Logged Out");
    localStorage.removeItem('userToken'); 

    document.location = '../home/home.html';
}

function UserProfileHandler() {
    const profileIcon = document.getElementById("userProfile");
    const profileIconContainer = profileIcon.closest('.profile-icon');
    
    const isUserLoggedIn = true;

    if (isUserLoggedIn) {
        profileIcon.addEventListener('click', function(event) {
            // ป้องกันการปิดทันทีเมื่อคลิก
            event.stopPropagation(); 
            profileIconContainer.classList.toggle('active');
        });
        
        window.addEventListener('click', function(event) {
            if (!profileIconContainer.contains(event.target)) {
                profileIconContainer.classList.remove('active');
            }
        });
        
    } else {
        profileIcon.addEventListener('click', function() {
            openLoginModal(); 
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    UserProfileHandler();
});

function displayUserRoles(userRoles) {
    const currentRole = 'User'; 
    
    const roleHolder = document.querySelector('.user-role-selector');
    const rolePaths = {
        'User': '../DashBoard/DashBoard.html',
        'Seller': '../DashBoardSeller/DashBoardSeller.html',
        'Care Taker': '../DashBoardCareTaker/DashBoardCareTaker.html',
        'Admin': '../DashboardAdmin/DashboardAdmin.html'
    };

    const roleStatCards = {
        'Seller': 'listingStat', 
        'Care Taker': 'careTakerStat', 
    };

    roleHolder.innerHTML = '';
    
    document.querySelectorAll('.stat-card-role').forEach(card => {
        card.classList.add('hidden');
    });
    
    const rolesToDisplay = Array.from(new Set(['User', ...userRoles]));

    if (rolesToDisplay.length > 0) {
        
        rolesToDisplay.forEach(roleName => {
            const button = document.createElement('li'); 
            button.className = 'Role';
            button.setAttribute('Role', roleName);
            button.textContent = roleName;

            const targetPath = rolePaths[roleName];
            
            if (roleName === currentRole) {
                button.classList.add('active-role');
            }

            if (targetPath) {
                button.addEventListener('click', function() {
                    if (roleName !== currentRole) {
                        document.location = targetPath;
                    }
                });
            }

            roleHolder.appendChild(button);

            if (roleName === currentRole) {
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

function fetchUserProfile() {
    const user = {
        name: "John Doe", 
        roles: ["Seller", "Admin"],
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
//         const userNameDisplay = document.getElementById('userNameDisplay');
//         if (userNameDisplay) {
//             userNameDisplay.textContent = user.name;
//         }
//         
//         displayUserRoles(user.roles);

//     } catch (error) {
//         console.error("Error loading user profile:", error);
//     }
// });

displayUserRoles(['Seller' , 'Care Taker' , 'Admin'])