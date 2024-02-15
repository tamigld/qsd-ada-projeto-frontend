// let listaTarefas = [
//     {
//         titulo: "Agendar médico",
//         descricao: "Preciso agendar o médico para não esquecer, super importante!",
//         prioridade: "Alta",
//         id: 1
//     }
// ];

let listaTarefas = []

listarTarefas()

function adicionarTarefa() {
    let titulo = document.getElementById("title").value
    let descricao = document.getElementById("descricao").value
    const id = listaTarefas.length + 1

    function createOutput() {
        var prioridade;
        if (document.getElementById('low').checked == true) {
            prioridade = "Baixa";
        } else if (document.getElementById('medium').checked == true) {
            prioridade = "Média";
        } else if (document.getElementById('high').checked == true) {
            prioridade = "Alta";
        }
        return prioridade
    }

    let prioridade = createOutput()

    const validation = (valor, valor2) => {
        let message = document.getElementById('message-error')
        if (!valor || !valor2) {
            message.innerHTML = "Preencha os campos."
            return false
        } else if (valor && valor2) {
            message.innerHTML = ""
            return true
        }
    }

    if (validation(titulo, prioridade) == true) {
        const tarefa = {
            titulo: titulo,
            descricao: descricao,
            prioridade: prioridade,
            id: id
        }

        listaTarefas.push(tarefa)
        listarTarefas()
    }
}

function listarTarefas() {
    let lista = document.getElementById('tbody')

    if (listaTarefas.length !== 0) {
        // se a lista de tarefas for diferente de zero, o bloco abaixo é realizado
        lista.innerHTML = listaTarefas.map((tarefa) => {
            return (
                `<td id="message" colspan="4"></td>
                <tr>
                        <td class="td-title">${tarefa.titulo}</td>
                        <td class="td-prio">${tarefa.prioridade}</td>
                        <td class="td-desc">${tarefa.descricao}</td>
                        <td class="td-action">
                            <button onclick=editarTarefa(this.id) class="btn-def btn-edit" id="${tarefa.id}">Editar</button>
                            <button onclick=deletarTarefa(this.id) class="btn-def btn-del" id="${tarefa.id}">Excluir</button>
                        </td>
                    </tr>`
            )
        }).join('')
    } else {
        // se o a lista de tarefas  for igual a 0, a mensagem é exibida:
        document.getElementById('message').innerText = "Não há tarefas a serem exibidas. Crie alguma! 😜"
    }
}


function deletarTarefa(id) {
    let idAchado = id
    listaTarefas.splice(listaTarefas.findIndex(({ id }) => id == idAchado), 1);

    if (listaTarefas < 1) {
        location.reload()
    } else {
        listarTarefas()
    }
}


function editarTarefa(id) {
    let modal = document.getElementById("modalGroup")
    modal.style.visibility = 'visible'
    modal.style.opacity = '1'

    let botaoTeste = document.getElementById('button-modal')
    botaoTeste.innerHTML = `<button onclick=atualizarTarefa(${id}) class="btn-def" type="button">Salvar</button>`
}

function atualizarTarefa(id) {
    function createOutput() {
        var prioridade;
        if (document.getElementById('newLow').checked == true) {
            prioridade = "Baixa";
        } else if (document.getElementById('newMedium').checked == true) {
            prioridade = "Média";
        } else if (document.getElementById('newHigh').checked == true) {
            prioridade = "Alta";
        }
        return prioridade
    }

    let newTitle = document.getElementById('newTitle').value
    let newDescricao = document.getElementById('newDescricao').value
    let newPrioridade = createOutput()

    if (newTitle) {
        listaTarefas.find(function (tarefa) {
            if (tarefa.id == id) {
                tarefa.titulo = newTitle;
            }
        });
    }

    if (newDescricao) {
        listaTarefas.find(function (tarefa) {
            if (tarefa.id == id) {
                tarefa.descricao = newDescricao;
            }
        });
    }

    if (newPrioridade) {
        listaTarefas.find(function (tarefa) {
            if (tarefa.id == id) {
                tarefa.prioridade = newPrioridade;
            }
        });
    }

    listarTarefas()
    closeModal()
}

function closeModal() {
    let modal = document.getElementById("modalGroup")
    let modalDescricao = document.getElementById("modalGroup-descricao")
    modal.style.visibility = 'hidden'
    modal.style.opacity = '0'
    modalDescricao.style.visibility = 'hidden'
    modalDescricao.style.opacity = '0'

    // esvaziar inputs do modal ao fechar o mesmo
    let titleInput = document.getElementById("newTitle")
    titleInput.value = ""
    let descInput = document.getElementById("newDescricao")
    descInput.value = ""
    let escolhas = document.getElementsByName('newPriority')
    for (i = 0; i < escolhas.length; i++) {
        escolhas[i].checked = false
    }
}