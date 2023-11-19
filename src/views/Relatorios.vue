<template>
    <div class="container">
        <h2>Geração de relatórios : </h2>
        <hr>

        <form @submit.prevent="gerarRelatorio">

            <div class="form-group">
                <label for="tipoRelatorio"> Tipo de Relatório</label>
                <select id="tipoRelatorio" class="form-control tipoRelatorio">
                    <option value="MeusItensCadastrados" selected>Meus Itens Cadastrados</option>
                    <option :value="null">Novas opções disponíveis em breve ...</option>
                </select>
            </div>

            <button type="submit" class="btn btn-secondary" :disabled="gerandoRelatorio">Gerar Relatório</button>

        </form>

        <h4>Entendendo o relatório gerado :</h4>
        <hr>

        <p>Cada linha do relatório é referente a um item cadastrado, trazendo seus dados associados.</p>
        <p>O formato do arquivo é ".csv". Para melhor visualização, escolha apenas o separador " ; " (ponto e vírgula) para
            abrir o arquivo.</p>

    </div>
</template>

<script lang="ts" setup>
import { authentication } from '@/stores/authentication';
import { ref } from 'vue';

// Variáveis para armazenamento dos itens
const dadosAPI = ref();

// Geração do Relatório

const gerarRelatorio = async () => {

    gerandoRelatorio.value = true;

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

        gerarCSV(dadosAPI.value);

}

const gerarCSV = (dadosAPI: Array<Object>) => {

    // Verificando os dados recebidos

    if (dadosAPI == null || !dadosAPI || !dadosAPI.length) {
        alert('Não há registros disponíveis.');
        gerandoRelatorio.value = false;
        return;
    }

    // Obtendo as colunas do CSV (Alterando vírgula por ';')

    const colunas = Object.keys(dadosAPI[0]).toString().replace(/,/g, ";");

    // Obtendo as linhas(conteúdo) do CSV (Alterando vírgula por ';', trocando '.' por vírgula, para ser considerado um número decimal)

    const linhas = dadosAPI.map((item: any) => {
        return Object.values(item).toString().replace(/,/g, ";").replace(/\./g, ",");
    })

    // Juntando os dois

    const csv = [colunas, ...linhas].join('\n');

    // Download

    downloadCSV(csv);

}

const downloadCSV = (csv: string) => {

    const blob = new Blob([csv], { type: 'application/csv' })

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');

    let nomeArquivo = 'relatorio.csv';

    a.download = nomeArquivo;
    a.href = url;
    a.style.display = 'none';

    document.body.appendChild(a);

    a.click();

    a.remove();

    URL.revokeObjectURL(url);

    gerandoRelatorio.value = false;

}

// Variável de indicação que o relatório está sendo feito.

const gerandoRelatorio = ref(false);

</script>

<style lang="scss" scoped>
h4 {
    margin-top: 4rem;
}

.container {
    max-width: 1280px;
}

.form-control {
    margin-bottom: 1rem;
    border-color: rgb(150, 149, 149);
}

.periodoRelatorio {
    max-width: 200px;
}

.consorcioRelatorio {
    max-width: 500px;
}

.cidadeRelatorio {
    max-width: 600px;
}

.tipoRelatorio {
    max-width: 350px;
}

.agendadorRelatorio {
    max-width: 600px;
}

.container:last-child {
    padding-bottom: 3rem;
}

.dataInvalida {
    border-color: rgb(216, 45, 45);
}</style>