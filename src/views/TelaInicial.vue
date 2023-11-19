<template>
    <div class="container">

        <div class="d-flex justify-content-center pt-5">
            <h1>
                Bem-vindo, {{ authentication().usuario }} !
            </h1>
        </div>

        <div class="d-flex justify-content-center pt-5 pb-5">
            <Icon icon="solar:user-bold" width="100" />
        </div>

        <div class="metricas-usuario pt-5">
            <h5>Métricas do Usuário :</h5>
            <hr>

            <p><strong> Quantidade de itens cadastrados : </strong> {{ quantidadeItensCadastrados }}</p>
            <p><strong>Último Item cadastrado : </strong> {{ ultimoItemCadastrado }}</p>
            <p><strong>Existem itens sem estoque : </strong> {{ tradutorBoolean(itensSemEstoque) }}</p>
        </div>
       

    </div>

 
    
</template>

<script lang="ts" setup>
import { authentication } from "@/stores/authentication";
import { Icon } from '@iconify/vue';
import { onBeforeMount, ref } from 'vue';

onBeforeMount(async () => {

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

    ultimoItemCadastrado.value = (dadosAPI.value[dadosAPI.value.length - 1] as any).nome;
    quantidadeItensCadastrados.value = dadosAPI.value.length;

    let verifItensSemEstoque = dadosAPI.value.filter((item : {quantidade : number}) => item.quantidade = 0);

    if(verifItensSemEstoque.length != 0) itensSemEstoque.value = true;

})


// Variáveis para armazenamento dos itens
const dadosAPI = ref([]);

let ultimoItemCadastrado = ref('');
let quantidadeItensCadastrados = ref(0);
let itensSemEstoque = ref(false);

// Tradutor boolean

const tradutorBoolean = (boolean : boolean) => {

    if(boolean == true) return 'SIM';
    else return 'NÃO';
}

</script>

<style lang="scss" scoped>

hr{
    padding-bottom: 1rem;
}

</style>