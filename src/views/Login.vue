<template>
    <body>
        
        <header class="d-flex justify-content-center py-3 bg-light">
            <nav class="navbar">
                <RouterLink to="/login" class="btn active">Login</RouterLink>
                <RouterLink to="/faleConosco" class="btn">Fale Conosco</RouterLink>
                <RouterLink to="/projeto" class="btn">Projeto</RouterLink>
            </nav>
        </header>

        <div class="d-flex justify-content-center mt-5 mb-5">
            <h1>STOCK HIVE</h1>
        </div>
        
        <div class="container d-flex justify-content-center">
            <form id="login-form" @submit.prevent="login">

                <div class="form-group">
                    <label for="usernameInput">Usuário</label>
                    <input class="form-control" id="usernameInput" type="text" v-model="loginData.usuario"
                    placeholder="Insira seu usuário ...">
                </div>
            
                <div class="form-group">
                    <label for="passwordInput">Senha</label>
                    <input class="form-control" type="password" id="passwordInput" v-model="loginData.senha"
                    placeholder="Insira a senha ...">
                </div>

                <div class="d-flex justify-content-center pt-4">
                    <button type="submit" class="btn btn-outline-dark">Entrar</button>
                </div>
           
            </form>
        </div>

        <!-- Slogan Com Efeito de Digitação -->
        <div class="d-flex justify-content-center">
            <div class="slogan d-inline-block">
                <p class="text">O mundo não para. Nós também não.</p>
            </div>
        </div>
        

        <div class="rota-entrega d-flex justify-content-center">
           
            <Icon icon="akar-icons:shipping-box-01" 
            width="35" height="35"
            class="item-rota-entrega mt-1"/>

            <Icon icon="fluent:arrow-fit-20-regular" 
            width="35" height="35"
            class="item-rota-entrega mt-1"/>
           
            <Icon icon="la:shipping-fast" 
            width="40" height="40"
            class="item-rota-entrega"/>

            <Icon icon="fluent:arrow-fit-20-regular" 
            width="35" height="35"
            class="item-rota-entrega mt-1"/>
            
            <Icon icon="ph:garage-fill" 
            width="40" height="35"
            class="item-rota-entrega mt-1"/>        
            
        </div>

    </body>
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";
import { Icon } from '@iconify/vue';
import { onMounted, reactive } from "vue";
import { authentication } from "@/stores/authentication";

onMounted(() => {

    //Limpando dados do cache com clear()
    localStorage.clear();

    // Limpando dados de autenticação
    authentication().token = null;
    authentication().usuario = null;
})

// Variáveis que armazenam os dados do login

const loginData = reactive({
    usuario : '',
    senha : ''
});

// Função de login

const login = async () => {

    authentication().login(loginData.usuario, loginData.senha);

}

</script>

<style lang="scss" scoped>

    header{
        border-bottom: 1px rgb(79, 80, 80) solid;
    }

    body{
        
        margin: 0;
        height: 100vh;
        color: rgb(7, 7, 7);
    }

    .navbar{
        .btn{
            color: rgb(2, 2, 2);
            text-decoration: none;
            padding-left: 1rem;
            padding-right: 1rem;
        }
    }

    .container {
        max-width: 1200px;
    }

    .form-control{

        border-color: rgb(190, 190, 190);
        width: 700px;

        @media (max-width: 850px) {
            width: 500px;
        }
        @media (max-width: 600px) {
            width: 400px;
        }
        @media (max-width: 450px) {
            width: 300px;
        }
        @media (max-width: 350px) {
            width: 250px;
        }

        margin-bottom: 1rem;
    }

    .slogan{
        margin-top: 4rem;

    }

    .rota-entrega{

        margin-top: 4rem;

        .item-rota-entrega{
            color: rgb(104, 100, 100);
            margin-left: 2rem;
            margin-right: 2rem;

            @media (max-width: 600px) {
                margin-left: 0.7rem;
                margin-right: 0.7rem;
            }
        }
    }

    .text{
        width: 100%;
        border-right: 2px solid;
        white-space: nowrap;
        overflow: hidden;
        animation: 
            typing 6s steps(33, end) infinite,
            cursor .4s step-end infinite alternate;
    }

    // Cursor Piscando
    @keyframes cursor {
        50% {border-color: transparent;}
    }

    // Efeito de Digitação
   @keyframes typing {
        0% { width: 0 }
        33.33% { width: 100% } /* Digitação acaba */
        100% { width: 100% } /* Pausa (4s) */
    }   

</style>