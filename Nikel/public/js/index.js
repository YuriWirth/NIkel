const myModal= new bootstrap.Modal("#register-modal");
let logged= sessionStorage.getItem("logged");
const session= localStorage.getItem("session");

checklogged();

//logar sistema
document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();
    const email= document.getElementById("email-input").value;
    const password= document.getElementById("password-input").value;
    const checksession= document.getElementById("session-check").checked;
    
    const account= getaccount(email);
    if(!account){
        alert("Verifique seu usuário ou a senha!");
        return;
    }

    if(account){
        if(account.password !== password){
        alert("Verifique seu usuário ou a senha!");
        return;
        }

        savesession(email, checksession);

        window.location.href = "home.html";
    }
});

//criar conta
document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email= document.getElementById("email-create-input").value;
    const password= document.getElementById("password-create-input").value;
    const password2= document.getElementById("password-create-input2").value;
    
    if(email.length<5){
        alert("Preencha o campo com um e-mail valido");
        return;
    }
    if(password.length<4){
        alert("Senha muito fraca!");
        return;
    }

    if(password != password2){
        alert("As senhas não são iguais.");
        return;
    }

    saveaccount({
        login: email,
        password: password,
        transactions: []    
    });

    myModal.hide();
    alert("Conta criada com sucesso.");
});

function checklogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged= session;
    }
    if(logged){
        savesession(logged, session);

        window.location.href= "home.html";
    }
}

function saveaccount(data){
    localStorage.setItem(data.login, JSON.stringify(data));
    
}
function savesession(data, savesession){
    if(savesession){
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function getaccount(key){
    const account= localStorage.getItem(key);
    
    if(account){
        return JSON.parse(account);
    }

    return"";
}