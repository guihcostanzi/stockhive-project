<template>
    <div class="card" :class="{'card-Fixo' : !estaEditando}">
        <div class="card-header p-1">
            <div class="row">
                <div class="col-md-8">
                    <p class="mb-0"><strong>Item : </strong>
                    <h4 class="mb-0">{{ item.nome }}</h4>
                    </p>
                </div>
            </div>

        </div>
        <div class="card-body d-sm-flex justify-content-start pb-0">
            <div class="card-item" v-if="!estaEditando">
                <div class="row">
                    <div class="col-md-6">
                        <p class="mt-2"><strong>Quantidade : </strong>
                        <h4>{{ item.quantidade }}</h4>
                        </p>
                    </div>
                    <div class="col-md-6">
                        <p class="mt-2"><strong>Valor Unitário(R$) : </strong>
                        <h4>{{ item.valorUnitario ? item.valorUnitario.toFixed(2) : "--/--" }}</h4>
                        </p>
                    </div>
                    <div class="col-md-12">
                        <p class="mt-2"><strong>Tipo : </strong>
                        <h4>{{ item.tipo }}</h4>
                        </p>
                    </div>
                    <div class="col-md-12 d-flex justify-content-start">
                        <div class="d-flex pb-3" v-if="!estaEditando">
                            <!-- Editar -->
                            <button type="button" class="btn btn-outline-secondary ml-2 mt-2" id="editarButton"
                                @click="iniciarEdicaoItem">
                                <Icon icon="ph:pencil-thin" width="22" height="22" />
                            </button>
                            <!-- Deletar o Item. -->
                            <button type="button" class="btn btn-outline-danger ml-2 mt-2" id="deletarButton"
                                @click="$emit('deletar-item', item)">
                                <Icon icon="ph:trash-light" width="22" height="22" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <form v-if="estaEditando" class="edicaoitem-container col-10">
                <div class="card-item mb-3">
                    <!-- Input de edição.-->
                    <div class="inputEdicaoItem mr-2">
                        <label for="nomeItemAtualizado"><strong>Nome :</strong></label>
                        <input type="text" class="form-control" v-model="dadosAtualizados.nome" @input="upperNomeitem" required
                            id="nomeItemAtualizado">
                    </div>
                    <div class="inputEdicaoItem mr-2">
                        <label for="quantidadeItemAtualizado"><strong>Quantidade :</strong></label>
                        <input type="number" class="form-control" v-model="dadosAtualizados.quantidade" required
                            id="quantidadeItemAtualizado">
                    </div>
                    <div class="inputEdicaoItem mr-2">
                        <label for="valorItemAtualizado"><strong>Valor Unitário :</strong></label>
                        <input type="text" class="form-control" v-model="dadosAtualizados.valorUnitario" @input="formatarValor"
                        :placeholder="dadosAtualizados.valorUnitario ? dadosAtualizados.valorUnitario : '0.00'" required 
                            id="valorItemAtualizado">
                    </div>
                    <div class="inputEdicaoItem">
                        <label for="tipoItemAtualizado"><strong>Tipo :</strong></label>
                        <select class="form-control" v-model="dadosAtualizados.tipo" required 
                            id="tipoitemAtualizado">
                            <option value="ESCRITORIO">Escritório</option>
                            <option value="ELETRONICO">Eletrônico</option>
                            <option value="FERRAMENTA">Ferramenta</option>
                            <option value="PAPELARIA">Papelaria</option>
                        </select>
                    </div>


                    <div class="d-flex">
                        <!-- Confirmar edição. -->
                        <button type="button" class="btn btn-outline-success mr-2 ml-2 mt-4" v-if="estaEditando"
                            @click="efetivarEdicao" id="botaoConfirmarEdicao">
                            <Icon icon="line-md:confirm-circle" width="22" height="26" />
                        </button>
                        <!-- Cancelar. -->
                        <button type="button" class="btn btn-outline-danger mr-2 mt-4" @click="cancelarEdicao">
                            <Icon icon="icons8:cancel" width="22" height="26" />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { reactive, ref } from 'vue';

const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    index: {
        type: Number,
        required: true
    }
});

const emits = defineEmits(['editar-item', 'deletar-item']);

// Variáveis que controlam a edição

let estaEditando = ref(false);

const dadosAtualizados = reactive({
    nome: '',
    quantidade: null,
    valorUnitario: '',
    tipo: ''
})

// UpperCase para o nome editado

const upperNomeitem = () => {
    dadosAtualizados.nome = dadosAtualizados.nome.toUpperCase();
}

// Iniciar Edição do Item

const iniciarEdicaoItem = () => {

    dadosAtualizados.nome = props.item.nome;
    dadosAtualizados.tipo = props.item.tipo;
    dadosAtualizados.valorUnitario = props.item.valorUnitario ? props.item.valorUnitario.toFixed(2) : '0.00';
    dadosAtualizados.quantidade = props.item.quantidade;

    estaEditando.value = true;

}

// Efetivação da edição

const efetivarEdicao = () => {

    emits("editar-item", dadosAtualizados.nome, dadosAtualizados.tipo, dadosAtualizados.valorUnitario, dadosAtualizados.quantidade, props.item.codigo);

}

// Cancelamento da edição

const cancelarEdicao = () => {
    estaEditando.value = false;
    dadosAtualizados.nome = '';
    dadosAtualizados.tipo = '';
    dadosAtualizados.valorUnitario = '';
    dadosAtualizados.quantidade = null;
   
}

const formatarValor = () => {

    // Remova todos os caracteres não numéricos, exceto vírgula e ponto
    let valorFormatado = dadosAtualizados.valorUnitario.replace(/[^0-9,.]/g, "");

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
    dadosAtualizados.valorUnitario = valorFormatado;

};
</script>

<style lang="scss" scoped>
.card {
    background-color: rgb(243, 243, 243);
    max-width: 440px;
    margin: 1rem;
    padding-left: 0;
    padding-right: 0;
}

.card-Fixo {
    max-height: 300px;
}

.form-control {
    border-color: rgb(150, 149, 149);
}

.inputEdicaoItem {
    margin-bottom: 1rem;
    width: 100%;
}

#editarButton{
    margin-right: 1rem;
}

#botaoConfirmarEdicao{
    margin-right: 1rem;
}

</style>