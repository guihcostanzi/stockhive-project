<template>
    <body>

        <header class="d-flex justify-content-center py-3 bg-light">
            <nav class="navbar">
                <RouterLink to="/login" class="btn">Login</RouterLink>
                <RouterLink to="/faleConosco" class="btn active">Fale Conosco</RouterLink>
                <RouterLink to="/projeto" class="btn">Projeto</RouterLink>
            </nav>
        </header>

        <div class="d-flex justify-content-center mt-5 mb-5">
            <h1>STOCK HIVE</h1>
        </div>

        <div class="container d-flex justify-content-center">
            <p>Caso precise entrar em contato conosco, utilize um dos canais fornecidos abaixo :</p>
        </div>

        <div class="d-flex justify-content-center mt-5">
            <p><Icon icon="ion:call-sharp" class="d-inline"/> (43) 3345-00XX</p>
        </div>
        <div class="d-flex justify-content-center">
            <p><Icon icon="ri:whatsapp-fill" class="d-inline"/> (41) 99978-00XX</p>
        </div>
        <div class="d-flex justify-content-center mb-5">
            <p><Icon icon="majesticons:mail" class="d-inline"/> suporte@stockhive.com.br</p>
        </div>

        <div class="d-flex justify-content-center">
            <small><p>Horário Atendimento : Seg. - Sex. | 07h00 - 18h00</p></small>
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
}

</style>