//vai requisitar uma API

let edit = false // variavel para evitar edição seguida

async function cadastrar(){
    let id= document.getElementById("id").value
    let nome= document.getElementById("nome").value
    let documento= Number(document.getElementById("documento").value) 
    let cep= Number(document.getElementById("cep").value)
    let uf= document.getElementById("uf").value 
    let cidade= document.getElementById("cidade").value
    let bairro= document.getElementById("bairro").value
    let rua= document.getElementById("rua").value
    let numero= Number(document.getElementById("numero").value)
    let telefone= Number(document.getElementById("telefone").value)
    let nomeativo= document.getElementById("nomeativo").value
    let marcaativo= document.getElementById("marcaativo").value
    let servico= document.getElementById("servico").value
    let custo= Number(document.getElementById("custo").value)
    let obs= document.getElementById("obs").value

    let dado
    let metodo // vai conter post ou put

    if(id && (edit == true)){ // vai atualizar
        //alterar o dado para enviar
        metodo = 'PUT'
        dado={
            id, nome, idade, documento, cep, uf, cidade, bairro, rua, numero,
            telefone, nomeativo, marcaativo, servico, custo, obs 
        }
    }
    else{ // vai cadastrar
        //criar o dado para enviar
        metodo = 'POST'
        dado={
            nome, idade, documento, cep, uf, cidade, bairro, rua, numero,
            telefone, nomeativo, marcaativo, servico, custo, obs 
        }
    }
    

    //chamando a api utilizando o fetch
    await fetch('http://localhost:8080/OS', {
        method: metodo,
        body: JSON.stringify(dado),
        headers: {"Content-Type":"application/json; charset=UTF-8"}
    })
    //resposta de sucess "servidor"
    .then(response => {
        if(edit == false){
            alert("Cadastro realizado com sucesso")
            limpa()
        }
        else{
            alert("Edição realizada com sucesso")
            edit = false
            limpa()
        }
        consultar()
    })
    //resposta de error do "servidor"
    .catch(error =>{
        alert(error)
    })
}

async function consultar(){
    //consome a API e recupera os FifaPlayers

    let dados = await fetch('http://localhost:8080/OS')
    .then( response =>{
        return response.json() // = atribui os dados em json para dado
    })
    //resposta de error do "servidor"
    .catch(error =>{
        alert(error)
    })

    //vamos crirar uma variavel result para concatenar a resposta
    let resposta = ''
    //percorrer a variavel dados
    dados.map(dado=>{
        resposta += `<tr><td>${dado.nome}</td> <td>${dado.documento}</td> 

        <td> <i onClick='remove(${dado.id})'class='bi bi-trash3'> </i> </td> 
        <td> <i onClick="atualiza(${dado.id},'${dado.documento}')" class='bi bi-pencil pulse'> </i> </td> </tr>`
    })
    //colocar a resposta no body da tabela
    document.getElementById("conteudoTabela").innerHTML = resposta
}

//remove um FifaPlayer do banco de dados
//quem chamar a função remove pode fazer outra ação antes de receber resposta

async function remove(id){
    let confirma = confirm('Confirma a exclusão da OS?')
    if (confirma){
        //chama a api -> sincrona(await) = enquanto não houver retorno do servidor aguarda 
        await fetch(`http://localhost:8080/OS/${id}`,{
            method:'DELETE'
        })
        .then(response =>{//quando o servidor retornou
            alert("Jogador foi removido com sucesso")
            consultar()
        })
        .catch( error =>{ //quando há erro na comunicação com o servidor
            alert("Problema na remoção")
        })
    }
}

function atualiza(id, nome, idade, documento, cep, uf, cidade, bairro, rua, numero,
    telefone, nomeativo, marcaativo, servico, custo, obs ){
    document.getElementById("id").value = id
    document.getElementById("nome").value = nome
    document.getElementById("documento").value = documento
    document.getElementById("cep").value = cep
    document.getElementById("uf").value = uf
    document.getElementById("cidade").value = cidade
    document.getElementById("bairro").value = bairro
    document.getElementById("rua").value = rua
    document.getElementById("numero").value = numero
    document.getElementById("telefone").value = telefone
    document.getElementById("nomeativo").value = nomeativo
    document.getElementById("marcaativo").value = marcaativo
    document.getElementById("servico").value = servico
    document.getElementById("custo").value = custo
    document.getElementById("obs").value = obs
    edit = true
}

function limpa(){
    document.getElementById("id").value = ""
    document.getElementById("nome").value = ""
    document.getElementById("documento").value = ""
    document.getElementById("cep").value = ""
    document.getElementById("uf").value = ""
    document.getElementById("cidade").value = ""
    document.getElementById("bairro").value = ""
    document.getElementById("rua").value = ""
    document.getElementById("numero").value = ""
    document.getElementById("telefone").value = ""
    document.getElementById("nomeativo").value = ""
    document.getElementById("marcaativo").value = ""
    document.getElementById("servico").value = ""
    document.getElementById("custo").value = ""
    document.getElementById("obs").value = ""
}


