<template>
    <div class="container col-12">

        <h2>Listagem de Itens</h2>
        <hr>

         <form class="d-flex" role="search" @submit.prevent="iniciarPesquisa">
            <input class="form-control me-2" type="search" placeholder="Digite sua busca..." aria-label="Search" id="formPesquisa" v-model="palavrasChave">
            <button class="btn btn-outline-secondary" type="submit" id="botaoIniciarPesquisa"
            ><Icon icon="octicon:search-24" width="20" height="20"/></button>
            <button class="btn btn-outline-danger" type="button" 
            @click="finalizarPesquisa" v-if="estaPesquisando"><Icon icon="icons8:cancel" width="20" height="20"/></button>
        </form>

        <!-- Items-->

        <div class="row d-flex justify-content-center col-12">
            <ShItemVue v-for="(item, index) in dadosAPI" :item="item" :index="index" class="col-sm-6"
            @deletar-item="deletarItem" @editar-item="editarItem"/>
        </div>
        
    </div>
</template>

<script lang="ts" setup>
import ShItemVue from '@/components/ShItem.vue';
import { uid } from 'uid';
import { onMounted, ref } from 'vue';
import { Icon } from '@iconify/vue';
import { authentication } from '@/stores/authentication';

class Item {

    nome : string;
    
    constructor(nome : string) {
       this.nome = nome;
    }
}

onMounted(() => {
    
    dadosAPI.value = [
       {
            nome: "Papel",
            tipo: "ESCRITORIO",
            quantidade: 789,
            valorUnitario: 156.90,
            cod: uid()
        },
        {
            nome: "Caneta",
            tipo: "ESCRITORIO",
            quantidade: 500,
            valorUnitario: 2.50,
            cod: uid()
        },
        {
            nome: "Notebook",
            tipo: "ELETRONICO",
            quantidade: 30,
            valorUnitario: 1200.00,
            cod: uid()
        },
        {
            nome: "Arame Farpado",
            tipo: "AGRICOLA",
            quantidade: 100,
            valorUnitario: 8.75,
            cod: uid()
        },
        {
            nome: "Lápis",
            tipo: "ESCRITORIO",
            quantidade: 1000,
            valorUnitario: 1.20,
            cod: uid()
        },
        {
            nome: "Martelo",
            tipo: "FERRAMENTA",
            quantidade: 50,
            valorUnitario: 25.50,
            cod: uid()
        },
        {
            nome: "Pasta Arquivo",
            tipo: "ESCRITORIO",
            quantidade: 200,
            valorUnitario: 5.75,
            cod: uid()
        },
        {
            nome: "Fio Elétrico",
            tipo: "ELETRICO",
            quantidade: 300,
            valorUnitario: 3.00,
            cod: uid()
        },
        {
            nome: "Sementes de Tomate",
            tipo: "AGRICOLA",
            quantidade: 50,
            valorUnitario: 0.50,
            cod: uid()
        },
        {
            nome: "Mouse",
            tipo: "ELETRONICO",
            quantidade: 80,
            valorUnitario: 18.99,
            cod: uid()
        },
        {
            nome: "Alicate",
            tipo: "FERRAMENTA",
            quantidade: 40,
            valorUnitario: 12.75,
            cod: uid()
        }
]

})


// Variáveis para armazenamento dos itens
const dadosAPI = ref();

// Variáveis da pesquisa

const palavrasChave = ref('');
const estaPesquisando = ref(false);

// Funções da pesquisa 

const iniciarPesquisa = () => {

    const regex = new RegExp(palavrasChave.value, "i"); // "i" torna a correspondência insensível a maiúsculas e minúsculas

    const filteredArray = dadosAPI.value.filter((obj : Item) => regex.test(obj.nome));

    dadosAPI.value = filteredArray;

    estaPesquisando.value = true;

}

const finalizarPesquisa = () => {

    window.location.reload();

}

// Edição de Itens

const editarItem = async (nomeAtualizado: string, tipoAtualizado : string, valorAtualizado : string, quantidadeAtualizada : number, codItem : string) => {

    const data = {
        nome: nomeAtualizado,
        quantidade: quantidadeAtualizada,
        tipo: tipoAtualizado,
        valorUnitario: valorAtualizado,
        cod: codItem
    }

    const response = await fetch('http://localhost:8081/item/edit',
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authentication().token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        }
    );
    
    if(response.status == 200) {
        alert(`Item #${codItem} modificado com sucesso !`);
        window.location.reload();
    }
    else{
        alert(`Erro na modificação do item. Tente novamente.`)
    }

}

// Deleção de items

const deletarItem = async (codItem: string) => {

    const response = await fetch(`http://localhost:8081/item/remove?cod=${codItem}`,
        {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${authentication().token}`,
                'Content-Type': 'application/json'
            }
        }
    );

    if (response.status == 200) {
        alert(`Item #${codItem} deletado com sucesso !`);
        window.location.reload();
    }
    else {
        alert(`Erro na deleção do item. Tente novamente.`)
    }

}

</script>

<style lang="scss" scoped>

#formPesquisa{
    max-width: 400px;
}

#botaoIniciarPesquisa{
    margin-right: 1rem;
}


</style>