const btnTarefa = document.querySelector('.btnTarefa')
const inputTarefa = document.querySelector('.inputTarefa')
const tarefas = document.querySelector('.tarefas')

btnTarefa.addEventListener('click', () =>{
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value)
})

function criaLi() {
    const li = document.createElement('li')
    return li;
}

function criaBotaoApagar(li) {
    li.innerText += '   '
    const botaoApagar = document.createElement('button')
    botaoApagar.innerText = 'apagar'
    botaoApagar.setAttribute('class', 'apagar')
    botaoApagar.setAttribute('title', 'apagar essa tarefa')
    li.appendChild(botaoApagar)
}

document.addEventListener('click', function (e){
    const el = e.target

    if (el.classList.contains('apagar')) {
        el.parentElement.remove()
        salvaTarefas()
    }
})

function limpaInput () {
    inputTarefa.value = ''
    inputTarefa.focus()
}

function criaTarefa(nomeTarefa) {
    const li = criaLi()
    li.innerHTML = nomeTarefa
    tarefas.appendChild(li)
    criaBotaoApagar(li)
    limpaInput()
    salvaTarefas()
}

inputTarefa.addEventListener('keypress', (e) =>{
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value)
    }
})

function salvaTarefas() {
    const liTarefas = tarefas.querySelectorAll('li')
    const listaDeTarefas = []

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('apagar', '').trim();
        listaDeTarefas.push(tarefaTexto)
    }

    const tarefaJSON = JSON.stringify(listaDeTarefas)
    localStorage.setItem('tarefas', tarefaJSON)
}

function addTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefas)

    for (const tarefa of listaDeTarefas) {
        criaTarefa(tarefa)
    }
}
addTarefasSalvas()
