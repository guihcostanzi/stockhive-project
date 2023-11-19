<template>
    <div class="container">

        <h2>Cadastro de Itens</h2>
        <hr>

         <form @submit.prevent="cadastrarItem" class="mt-4">

                <div class="form-group">
                    <label for="nome">Nome</label>
                    <input type="text" class="form-control" id="nome" placeholder="Insira o nome do item ..."
                        v-model="dadosCadastro.nome" @input="upperCaseNome" required>
                </div>

                <div class="form-group">
                    <label for="quantidade">Quantidade</label>
                    <input type="number" class="form-control" id="quantidade"
                        v-model="dadosCadastro.quantidade" required>
                </div>

                <div class="form-group">
                    <label for="valorUnitario">Valor Unitário (R$)</label>
                    <input type="text" class="form-control" id="valorUnitario" @input="formatarValor" placeholder="0.00"
                        v-model="dadosCadastro.valorUnitario" required>
                </div>

                <div class="form-group">
                    <label for="tipoItem">Tipo</label>
                    <select id="tipoItem" class="form-control" v-model="dadosCadastro.tipo">
                        <option :value="null">Selecione o tipo do item ...</option>
                        <option value="PAPELARIA">Escritório</option>
                        <option value="ELETRONICO">Eletrônico</option>
                        <option value="FERRAMENTA">Ferramenta</option>
                    </select>
                </div>
                
                <button type="submit" class="btn btn-secondary">Confirmar Cadastro</button>
            </form>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { uid } from 'uid'
import { authentication } from '@/stores/authentication';


const dadosCadastro = reactive({
    cod: null,
    nome: '',
    quantidade: 0,
    tipo: null,
    valorUnitario: ''
});

const cadastrarItem = async() => {

    const data = {
        nome: dadosCadastro.nome,
        quantidade: dadosCadastro.quantidade,
        tipo: dadosCadastro.tipo,
        valorUnitario: dadosCadastro.valorUnitario,
        codigo: uid(),
        usuario: authentication().usuario
    }

    const response = await fetch('http://localhost:8081/stockhive/item/create',
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authentication().token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        }
    );

    if(response.status == 200){
        alert(`O Item #${response.text()} foi cadastrado com sucesso !`)

        dadosCadastro.nome = '';
        dadosCadastro.tipo = null;
        dadosCadastro.quantidade = 0;
        dadosCadastro.valorUnitario = '';

    }
    else{
        alert(`Erro no cadastro. Verifique os dados e tente novamente.`)
    }


}

const upperCaseNome = () => {
    dadosCadastro.nome = dadosCadastro.nome.toUpperCase();
}

const formatarValor = () => {

    // Remova todos os caracteres não numéricos, exceto vírgula e ponto
    let valorFormatado = dadosCadastro.valorUnitario.replace(/[^0-9,.]/g, "");

    // Verifique se há mais de uma vírgula ou ponto e remova os extras
    valorFormatado = valorFormatado.replace(/([,.])\1+/g, "$1");

    // Substitua vírgula por ponto para ter um valor decimal válido
    valorFormatado = valorFormatado.replace(",", ".");

    // Verifique se o valor começa com zero e não é apenas "0."
    if (/^0[^.]/.test(valorFormatado)) {
        valorFormatado = valorFormatado.substring(1); // Remove o zero inicial
    }

    // Garantir que haverá apenas 2 casas decimais
    if (valorFormatado.indexOf(".") !== -1) {
        const partes = valorFormatado.split(".");
        partes[1] = partes[1].substring(0, 2);
        valorFormatado = partes.join(".");
    }

    // Verifique se há mais de um ponto decimal e remova os extras
    const decimalCount = valorFormatado.split(".").length - 1;
    if (decimalCount > 1) {
        valorFormatado = valorFormatado.replace(/\.+$/, ''); // Remove pontos adicionais no final
    }

    // Atualize o valor no campo de entrada
    dadosCadastro.valorUnitario = valorFormatado;

};

</script>

<style lang="scss" scoped>

.form-control{
    margin-bottom: 1rem;
    border-color: rgb(163, 163, 163);
}

#nome{
    max-width: 700px;
}

#tipoItem{
    max-width: 600px;
}

#valorUnitario{
    max-width: 300px;
}

#quantidade{
    max-width: 300px;
}

</style>