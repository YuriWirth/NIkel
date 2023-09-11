const myModal= new bootstrap.Modal("#TransactionModal");
let logged= sessionStorage.getItem("logged");
const session= localStorage.getItem("session");
let data= {
    transactions:[]
};

document.getElementById("button-logout").addEventListener("click", logout);

//adicionar lançamento
document.getElementById("Transactionform").addEventListener("submit", function(e){
    e.preventDefault();

    const value= parseFloat(document.getElementById("Valueinput").value);
    const description= document.getElementById("Descriptioninput").value;
    const date= document.getElementById("Dateinput").value;
    const type= document.querySelector('input[name="Typeinput"]:checked').value;
    
    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });

    savedata(data);
    e.target.reset();
    myModal.hide();

    gettransactions();

    alert("Lançamento adicionado com sucesso!");

});

checklogged();

function checklogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged= session;
    }
    if(!logged){
        window.location.href= "index.html";
        return;
    }

    const datauser= localStorage.getItem(logged);
    if(datauser){
        data= JSON.parse(datauser);
    }

    gettransactions();

}

function logout(){
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");
    
    window.location.href= "index.html";
}

function gettransactions(){
    const transactions= data.transactions;
    let transactionshtml= ``;

    if(transactions.length){
        transactions.forEach((item)=> {
            let type= "Entrada";

            if(item.type=== "2"){
                type= "Saida";
            }

            transactionshtml+=`
        <tr>
            <th scope="row">${item.date}</th>
            <td>${item.value.toFixed(2)}</td>
            <td>${type}</td>
            <td>${item.description}</td>
        </tr>
    `

        })
    }
    document.getElementById("transactions-list").innerHTML= transactionshtml
}

function savedata(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}