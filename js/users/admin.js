/*
let tabKeyProposta, tabRefProposta, tabDescProposta, tabEstoqueProposta; */
let tabAdminDataSet = [];
let tabDataAdmin = [];
let tabkeyAdmin ;
let dataBd = new Date();


let tableAdmin = $('#tabela_usuarios').DataTable({
    columns: [
        { title: "key" } ,
        { title: "Nome" , width: "15%"} ,
        { title: "Email" , width: "13%" }
        
    ],

    "columnDefs": [
        {
            "targets": 0,
            "visible": false
        },
        {
            "targets": 1,
            "visible": true
        },
        {
            "targets": 2,
            "visible": true  
        },
       

    ],
    "bAutoWidth": false,
    "responsive": true,
    "lengthMenu":[[7, 17, 27, 37, 47],[7, 17, 27, 37, 47]],
    "pageLength": 7,
    "language": {
        "thousands": ".",
        "decimal": ",",
        "sEmptyTable": "Nenhum registro encontrado",
        "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
        "sInfoFiltered": "(Filtrados de _MAX_ registros)",
        "sInfoPostFix": "",
        "sInfoThousands": ".",
        "sLengthMenu": "_MENU_ resultados por página",
        "sLoadingRecords": "Carregando...",
        "sProcessing": "Processando...",
        "sZeroRecords": "Nenhum registro encontrado",
        "sSearch": "Pesquisar",
        "oPaginate": {
            "sNext": "Próximo",
            "sPrevious": "Anterior",
            "sFirst": "Primeiro",
            "sLast": "Último",
        },
        "oAria": {
            "sSortAscending": ": Ordenar colunas de forma ascendente",
            "sSortDescending": ": Ordenar colunas de forma descendente",
        },
    }
});

carregaTabelaAdmins() ; 

///window.setTimeout(aguardaCargaPropostas,3000); 

firebase.database().ref('users').on('child_changed', function (snapshot) {
    console.log(`Registro modificado ===>>> ${snapshot.key} ${snapshot.val().email}`) ; 
    carregaTabelaAdmins(); 
}); 

function carregaTabelaAdmins(){
    tableAdmin.clear(); 
    firebase.database().ref('users').on('child_added', function (snapshot) {

      //  var fornecedor = snapshot.val().fornecedor!==undefined ? snapshot.val().fornecedor : "Diversos" ; 

        tabAdminDataSet = [snapshot.key, snapshot.val().nome, snapshot.val().email, 
                            ];
        tableAdmin.rows.add([tabAdminDataSet]).draw();
    });   
}

//function aguardaCargaPropostas(){console.log('aguardando a carga dos Propostas...')} ; 


$("#tabela_pagtos tbody").on("click", "td", function () {
    tabDataAdmin = tableAdmin.row($(this).parents('tr')).data();

   // localStorage.setItem('idProposta', tabDataAdmin[0]);

  //  tabKeyAdmin = tabDataAdmin[0];

  //  alert(`a variavel tabIdProposta =  ${tabKeyAdmin}`);

});

