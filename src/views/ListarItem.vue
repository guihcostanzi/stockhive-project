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
import { onMounted, ref } from 'vue';
import { Icon } from '@iconify/vue';
import { authentication } from '@/stores/authentication';

class Item {

    nome : string;
    
    constructor(nome : string) {
       this.nome = nome;
    }
}

onMounted(async() => {
    
   // Trazendo os items da API

   const response = await fetch(`http://localhost:8081/stockhive/item/getItemByUser/${authentication().usuario}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${authentication().token}`,
                'Content-Type': 'application/json'
            }
            

        }
    );

    dadosAPI.value = JSON.parse(await response.text());

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
        codigo: codItem,
        nome: nomeAtualizado,
        quantidade: quantidadeAtualizada,
        tipo: tipoAtualizado,
        valorUnitario: valorAtualizado
    }

    const response = await fetch('http://localhost:8081/stockhive/item/update',
        {
            method: 'PUT',
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

    const response = await fetch(`http://localhost:8081/stockhive/item/delete/${codItem}`,
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