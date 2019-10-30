const addbtn = document.querySelector("input.add");
const cpftxt = document.querySelector("input.cpf");
const nometxt = document.querySelector("input.nome");
const cidadetxt = document.querySelector("input.cidade");
const curriculotxt = document.querySelector("textarea");
const tbody = document.querySelector("tbody");

if(localStorage.getItem("vetcurriculos") === null){
    localStorage.setItem("vetcurriculos", "[]");
} else {
    localdata = JSON.parse(localStorage.getItem("vetcurriculos"));
    for(let i=0;i<localdata.length;i++){ //TODO: completar
        list(JSON.parse(localdata[i]).cpf, JSON.parse(localdata[i]).nome, JSON.parse(localdata[i]).cidade, JSON.parse(localdata[i]).curriculo);
    }
}

addbtn.addEventListener('click', function (e) {
    e.preventDefault();
    let newcpf = cpftxt.value;
    let newnome = nometxt.value;
    let newcidade = cidadetxt.value;
    let newcurriculo = curriculotxt.value;
    addcurr(newcpf, newnome, newcidade, newcurriculo);
    if (typeof (Storage) !== "undefined") {

    }
    list(newcpf, newnome, newcidade, newcurriculo);
});
tbody.addEventListener('click', function (e) {
    e.preventDefault();
    if(event.target.type == 'submit') {
        remcurr(event.target.parentNode.parentNode.querySelector(".cpf").textContent);
        event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode);
    }
});
function list(a,b,c,d){
    let cpf, nome, cidade, curriculo;
    if(typeof a == "string") {
        cpf = a;
        nome = b;
        cidade = c;
        curriculo = d;
    } else {
        cpf = a.value;
        nome = b.value;
        cidade = c.value;
        curriculo = d.value;
    }
    const btn = `<td><button>Excluir</button></td>`;
    let rowcpf = `<td><p>CPF: </p></td><td class="cpf">${cpf}</td>`;
    let rownome = `<td><p>Nome: </p><td>${nome}</td>`;
    let rowcidade = `<td><p>Cidade: </p><td>${cidade}</td>`;
    let rowcurriculo =  `<td><p>Currículo: </p><br><td>${curriculo}</td>`;
    let tr = `<tr>${rowcpf}${rownome}${rowcidade}${rowcurriculo}${btn}</tr>`;
    tbody.innerHTML += tr;
}
function addcurr(a,b,c,d){
    newcurr = '{"cpf":"'+a+'", "nome":"'+b+'", "cidade":"'+c+'", "curriculo":"'+d+'"}';
    vetres = JSON.parse(localStorage.getItem("vetcurriculos"));
    vetres.push(newcurr);
    localStorage.setItem("vetcurriculos", JSON.stringify(vetres));
}
function remcurr(cpf){
    vet = JSON.parse(localStorage.getItem("vetcurriculos"));
    for(let i=0;i<vet.length;i++){
        if( JSON.parse(vet[i]).cpf === cpf) {
            vet.splice(vet[i], 1);
            localStorage.setItem("vetcurriculos", JSON.stringify(vet));
        }
    }
}
