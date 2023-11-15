<template>

    <header class="d-flex py-2 bg-light mb-5">
        <div class="container">
            <nav class="row col-12 navbar">
                <div class="marca col-md-6">
                    <h1>STOCK HIVE</h1>
                </div>
                <div class="botoes col-md-6 d-md-flex justify-content-end">
                    <RouterLink to="/telaInicial" class="btn btn-light">Tela Inicial</RouterLink>
                    <RouterLink to="/listarItem" class="btn btn-light">Listar Itens</RouterLink>
                    <RouterLink to="/cadastrarItem" class="btn btn-light">Cadastrar Itens</RouterLink>
                    <RouterLink to="/relatorios" class="btn btn-light">Relatórios</RouterLink>
                </div>
                <div class="botoes col-md-12 d-flex justify-content-end">
                    <p class="pt-3"><strong>Usuário : </strong> {{ authentication().usuario ? authentication().usuario : 'Usuário Logado' }}</p>
                    <button type="button" id="logoutButton" class="btn btn-outline-danger btn-sm" @click="authentication().logout">Sair</button>
                </div>
            </nav>
        </div>
    </header>

</template>

<script lang="ts" setup>
import { authentication } from "@/stores/authentication";

</script>

<style lang="scss" scoped>

header{
    border-bottom: 1px rgb(211, 209, 209) solid;
}

.btn{
    margin-left: 1rem;
    margin-right: 1rem;
    text-decoration: underline;
}

#logoutButton {
    max-height: 30px;
    margin-top: 0.8rem;
}

</style>