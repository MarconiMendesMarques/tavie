var email = document.getElementById('inputEmail'); 
var senha = document.getElementById('inputSenha');
var authEmailPassButton = document.getElementById('authEmailPassButton');
var createUserButton = document.getElementById('createUserButton');
var logOutButton = document.getElementById('logOutButton');
var displayName = document.getElementById('displayName');

var id = '';
var refUser = firebase.database().ref('users'); 



// login com email e password
authEmailPassButton.addEventListener('click', function(){

    firebase
        .auth()
        .signInWithEmailAndPassword(email.value,senha.value)
        .then(function(){
            id = firebase.auth().currentUser.uid 
            alert(`bem vindo ${email.value} - id ${id}`);
            displayName.innerText = 'Bem vindo, ' + email.value;
            email.value = "" ;
            senha.value = "" ; 
           // window.location.replace("./index.html");
        })
        .then(function(){

            refUser.orderByChild("id").equalTo(`${id}`).once("value")
            .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                var key = childSnapshot.key;
                var childData = childSnapshot.val().admin;
                console.log(childData) ; 
                console.log(key) ; 
                console.log(childSnapshot.val().nome) ; 
                        if(childData){
                            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
                            window.location.replace('./html/users/admin.html')
                        } else {
                            window.location.replace('./html/users/cliente.html')
                        }
                });
            })

        })
        .catch(function(error){
            console.error(error.code);
            alert('Usuário nāo cadastrado...');         
            document.location.reload(true);
        });
});

/* Criar novo usuário
createUserButton.addEventListener('click', function () {
    firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, senha.value)
        .then(function (result) {
            id = firebase.auth().currentUser.uid ; 
            displayName.innerText = 'Bem vindo, ' + email.value;
            alert(`Bem vindo ${email.value} id: ${id}`);

        })
        .catch(function (error) {
            console.error(error.code);
            console.error(error.message);
            alert('Falha ao cadastrar, verifique o erro no console.')
        });
}); */ 

// Logout
logOutButton.addEventListener('click', function () {
    firebase
        .auth()
        .signOut()
        .then(function () {
            displayName.innerText = 'Você não está autenticado';
            alert('Você se deslogou');
            email.value = "" ;
            senha.value = "" ; 
        }, function (error) {
            console.error(error);
        });
});


// modelo de usuario para inserir novo usuario no bd 

let usuario = {
    "id":"fulano",
    "email":"email.teste@gmail.com",
    "senha":"senhaemail",
    "nome": "fulano adm", 
    "admin": true,
    "cpf":"266.999.888.999-99",
    "rg": "878887888",
    "cnpj": "89909888/0001-03",
    "ie": "9090/0009988",
    "enderereco":"shcgn 709 bloco c 840",
    "bairro": "asa norte",
    "cidade": "brasilia",
    "estado": "df",
    "cep": "89999-999",
    "foneComercial": "99983-9999",
    "foneCelular": "90900900009",
    "redesocial": {
        "facebook":"fjafafasdf",
        "insta": "adfadfad",
        "twiter": "adfasdfdas"
    },
    "catalogos": [
        9876,89899,34344,56566
    ]

}
