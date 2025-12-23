// ===== Storage =====
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

// ===== Protection =====
if (!currentUser && !location.pathname.includes("signin") && !location.pathname.includes("signup")) {
    location.href = "signin.html";
}

// ===== Display User =====
document.addEventListener("DOMContentLoaded", () => {
    if (currentUser) {
        document.getElementById("userDisplay").textContent = currentUser.username;
        document.getElementById("balanceDisplay").textContent = currentUser.points + " Points";
    }
});

// ===== Signup =====
function signUp() {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !email || !password) return alert("Fill all fields");
    if (!email.endsWith("@gmail.com")) return alert("Email must be Gmail");

    if (users.find(u => u.username === username || u.email === email))
        return alert("User already exists");

    const user = { username, email, password, points: 0 };
    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(user));
    location.href = "index.html";
}

// ===== SignIn =====
function signIn() {
    const input = document.getElementById("loginInput").value.trim();
    const pass = document.getElementById("loginPassword").value.trim();

    const user = users.find(
        u => (u.username === input || u.email === input) && u.password === pass
    );

    if (!user) return alert("Wrong data");

    localStorage.setItem("currentUser", JSON.stringify(user));
    location.href = "index.html";
}

// ===== Logout =====
function signOut() {
    localStorage.removeItem("currentUser");
    location.href = "signin.html";
}

// ===== Pages =====
function showPage(page) {
    document.getElementById("offersPage").style.display = page === "offers" ? "block" : "none";
    document.getElementById("withdrawPage").style.display = page === "withdraw" ? "block" : "none";
}

// ===== Withdraw Toggle =====
function toggleWithdrawFields(id) {
    document.querySelectorAll(".withdraw-inputs").forEach(box => {
        box.style.display = "none";
    });
    document.getElementById(id).style.display = "block";
}

// ===== Withdraw (Demo) =====
function withdraw(method) {
    alert("Withdraw request sent via " + method + "\n1000 Points = 1 Dollar");
}