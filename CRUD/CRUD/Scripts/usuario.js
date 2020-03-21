//Carregar dados na tabela quando os documentos estiverem prontos
//Aqui 
$(document).ready(function () {
    loadData();
});

//Função Load Data 
function loadData() {
    $.ajax({
        url: "/Usuario/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.UsuarioID + '</td>';
                html += '<td>' + item.Nome + '</td>';
                html += '<td>' + item.Email + '</td>';
                html += '<td>' + item.Senha + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.UsuarioID + ')" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a> <a href="#" onclick="confirmDeleteModal(' + item.UsuarioID + ')" class="delete" data-toggle="myModal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}  


//Função Adicionar
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        UsuarioID: $('#UsuarioID').val(),
        Nome: $('#Nome').val(),
        Email: $('#Email').val(),
        Senha: $('#Senha').val(),
    };
    $.ajax({
        url: "/Usuario/Add",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Função para obter os dados com base na identificação do funcionário
function getbyID(UsuaID) {
    $('#Nome').css('border-color', 'lightgrey');
    $('#Email').css('border-color', 'lightgrey');
    $('#Senha').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Usuario/getbyID/" + UsuaID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#UsuarioID').val(result.UsuarioID);
            $('#Nome').val(result.Nome);
            $('#Email').val(result.Email);
            $('#Senha').val(result.Senha);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//Função para atualizar o registro do Usuario  
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var usuObj = {
        UsuarioID: $('#UsuarioID').val(),
        Nome: $('#Nome').val(),
        Email: $('#Email').val(),
        Senha: $('#Senha').val(),
    };
    $.ajax({
        url: "/Usuario/Update",
        data: JSON.stringify(usuObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#UsuarioID').val("");
            $('#Nome').val("");
            $('#Email').val("");
            $('#Senha').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
} 

//Função para excluir registro de Usuario  
function confirmDeleteModal(ID) {
    $('#deleteModal').modal();
    $('#deleteButton').html('<input type="submit" class="btn btn-danger" onclick="Delete(' + ID + ')" value="Deletar">');
}

function Delete(ID) {

        $.ajax({
            url: "/Usuario/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function() {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    $('#deleteModal').modal('hide'); // Fecha o Modal
}


//Função para limpar as caixas de texto
function clearTextBox() {
    $('#UsuarioID').val("");
    $('#Nome').val("");
    $('#Email').val("");
    $('#Senha').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Nome').css('border-color', 'lightgrey');
    $('#Email').css('border-color', 'lightgrey');
    $('#Senha').css('border-color', 'lightgrey');
}

//Valdidação usando jquery
function validate() {
    var isValid = true;
    if ($('#Nome').val().trim() == "") {
        $('#Nome').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Nome').css('border-color', 'lightgrey');
    }
    if ($('#Email').val().trim() == "") {
        $('#Email').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Email').css('border-color', 'lightgrey');
    }
    if ($('#Senha').val().trim() == "") {
        $('#Senha').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Senha').css('border-color', 'lightgrey');
    }
    return isValid;
} 