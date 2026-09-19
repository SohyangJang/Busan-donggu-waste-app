const PASSWORD = "a4404458**";

const loginBtn = document.getElementById("loginBtn");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");

loginBtn.addEventListener("click", login);

passwordInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        login();
    }
});

function login() {

    if (passwordInput.value === PASSWORD) {

        window.location.href = "dashboard.html";

    } else {

        message.textContent = "비밀번호가 올바르지 않습니다.";
        passwordInput.value = "";
        passwordInput.focus();

    }

}
