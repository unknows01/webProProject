
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

// ---  LogOut ---
function LogOut() {
    console.log("User Logged Out");
    localStorage.removeItem('userToken'); 
    document.location = '../home/home.html';
}

// ---  Profile  ---
function UserProfileHandler() {
    const profileIcon = document.getElementById("userProfile");
    const profileIconContainer = profileIcon.closest('.profile-icon');
    
    const isUserLoggedIn = true;

    if (isUserLoggedIn) {
        profileIcon.addEventListener('click', function(event) {
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

function MyPetData(haveData){
  const emptyPet = document.getElementById("empty-state-section");
  const havePet = document.getElementById("pet-list-section");

  if(haveData){
    havePet.classList.remove('is-hidden');
    emptyPet.classList.add('is-hidden');
  }
}

