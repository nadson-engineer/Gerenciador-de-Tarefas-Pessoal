const inputTarefa = document.querySelector('.input-tarefa')
const btn = document.querySelector('.btn')
const tarefas = document.querySelector('.tarefas')

function criaLi() {
    const li = document.createElement('li')
    return li;
}

function addTarefaNaLista (textInput) {
    const li = criaLi();
    li.innerText = textInput;
    tarefas.appendChild(li)
    limpaInput()
    criaButton(li)
    salvarTarefas()
}
inputTarefa.addEventListener('keypress', function(e){
    if (e.keyCode === 13){
        if (!inputTarefa.value) return;
    addTarefaNaLista(inputTarefa.value)
    }
})
function criaButton(li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button')
    botaoApagar.innerText = 'apagar'
    botaoApagar.setAttribute('class', 'apagar')
    botaoApagar.setAttribute('title', 'apagar esta tarefa')

    li.appendChild(botaoApagar);
}
btn.addEventListener('click', function(){
    if (!inputTarefa.value) return;
    addTarefaNaLista(inputTarefa.value)
})
function limpaInput(){
    inputTarefa.value = '';
    inputTarefa.focus();
}
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('apagar')) {
        e.target.parentElement.remove();
        salvarTarefas();
    }
});
function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = []

    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('apagar', '')
        listaDeTarefas.push(tarefaTexto);
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON)
}


function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas)

    for (let tarefa of listaDeTarefas) {
        addTarefaNaLista(tarefa)
    }
}
adicionaTarefasSalvas();