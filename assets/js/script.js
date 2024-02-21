const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-tarefa')
const tarefas = document.querySelector('.tarefas')

function criaLi() {
    const li = document.createElement('li');
    return li
}

inputTarefa.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value)
    }
}) 

function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}; // This clean the input text and put the focus to it every time you create a new task. It is invoked when the function criaTarefa is executed.

function criaBotaoApagar(li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar')
    li.appendChild(botaoApagar)
}; // This function create a button to remove the task created. You can see that this button has a class of 'apagar' so we can captura the click and execute the action to remove. This funtion is invoked when the code creates a task. the appendChild will make this button a child of the li created for the task, it is very important so we can easily remove the entire task when we click this button, just check in the function to remove the task how it is done.

function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvaTarefas();
}; // this function creates the task for the page, using others functions to define some settings for the element.

btnTarefa.addEventListener('click', function () {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value)
}) // this function have the condition that, if the value in the iput is not a value in fact, it will not capture. Otherwise, if the condition is true, the click in the button will activate the function criaTarefa.

document.addEventListener('click', function(e) {
    const el = e.target;
    
    if (el.classList.contains('apagar')){
        el.parentElement.remove();
        salvaTarefas()
    }
    
}) // This function will capture any click in the page. With the condition in the if, the function will only capture the click in the button with the class 'apagar'. We use the addEventListener for the DOM because the button 'apagar' will only exist if you create a task, so the code will only search the button apagar because of the condition, otherwise it would capture any element in the page. To discribe the code 'el.parentElement.remove()', so inside the variable 'el', the code will get the parentElement (the parent element of the button, so is the li), and the will remove it.

function salvaTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto)
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}; // This function will save the data of the input captured as an array. First, the variable liTarefas receive the value of all 'li' inside the 'ul' of class '.tarefas' . Then the variable listaDeTarefas is defined as an empty array. Now the structure of repeat 'for' defines that the code will get every li of the ul and store at the let tarefa. The code for this repeat will basicaly get the text of every let tarefa, so, of every li, and store at the let tarefaTexto. Then it will format the let tarefa texto to only get the text of the li, not the text of the button, and 'trim()' is to remove the empty space. And to finalize the structure, it will push the let tarefaTexto to the array defined in listaDeTarefas. To save this data in the navigator, it is defined the const tarefasJSON to indicate that we are saving this file as a JSON file. So basicaly, this const is defined as JSON.stringfy(listaDeTarefas), this will turn the array into a string so we can apply the local.storage.setItem('tarefas', tarefasJSON) and save in the local memory. so basicaly 'tarefas' is the saved data that we will use later to load all the saved content of the page, and tarefasJSON is the value saved. We call the function in the function criaTarefas, so every time we create a task, it will be saved, and we put into the function that remove the tasks, so every time we delete, it is deleted from the cache.

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for(let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
};// this function will basically transform the JSON from a string to an array, and load in the page every time we load the page. First it is defined the const tarefas as local.Storage.getItem('tarefas'), so in this variable is stored the value stringfied in the previous function, and then is defined the const listaDeTarefas as JSON.parse(tarefas), so basically it will take the value stringfied in the previus function and transform in an array again. So we create a structur of repeat 'for', and it will basically get every value of listaDeTarefas, that is now an array again, and store in the let tarefa. So in the scope of the code 'for', we call the function criaTarefa(tarefa), with the parameter equal to every value stored in the let tarefa, so it will create normally every task stored. We call this function at the end of the code.
adicionaTarefasSalvas();