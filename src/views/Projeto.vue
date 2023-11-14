<template>
    <body>

        <header class="d-flex justify-content-center py-3 bg-light">
            <nav class="navbar">
                <RouterLink to="/login" class="btn">Login</RouterLink>
                <RouterLink to="/faleConosco" class="btn">Fale Conosco</RouterLink>
                <RouterLink to="/projeto" class="btn active">Projeto</RouterLink>
            </nav>
        </header>

        <div class="d-flex justify-content-center mt-5 mb-5">
            <h1>STOCK HIVE</h1>
        </div>

        <div class="container d-flex justify-content-center">
            <p>O projeto StockHive busca desenvolver um software que seja capaz de lidar com o
                armazenamento de itens e a distribuição deles, seja para um ambiente interno,
                como os limites de uma empresa de edifício único, seja para um ambiente
                fragmentado, tal qual em uma empresa que possui diversas ramificações.</p>
        </div>

        <div class="d-flex justify-content-center mt-5">
            <p><strong>Integrantes do Projeto : </strong></p>
        </div>

        <div class="d-flex justify-content-center mt-5">
            <p>
                <Icon icon="ion:person" class="d-inline mb-1" /> Guilherme Costanzi Do
            </p>
        </div>
        <div class="d-flex justify-content-center">
            <p>
                <Icon icon="ion:person" class="d-inline mb-1" /> Bruno Pelliciari Barduco
            </p>
        </div>
        <div class="d-flex justify-content-center mb-5">
            <p>
                <Icon icon="ion:person" class="d-inline mb-1" /> Gabriel Nogueira dos Santos
            </p>
        </div>

        <div class="d-flex justify-content-center">
            <small>
                <p>FIAP - ADS | 2023</p>
            </small>
        </div>


    </body>
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";
import { Icon } from '@iconify/vue';

</script>

<style lang="scss" scoped>
header {
    border-bottom: 1px rgb(79, 80, 80) solid;
}

body {

    margin: 0;
    height: 100vh;
    color: rgb(7, 7, 7);
}

.navbar {
    .btn {
        color: rgb(2, 2, 2);
        text-decoration: none;
        padding-left: 1rem;
        padding-right: 1rem;
    }
}

.container {
    max-width: 1200px;
}</style>