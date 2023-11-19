import router from "@/router";
import { defineStore } from "pinia";

export const authentication = defineStore({
    id: 'auth',
    state: () => {
        return {
            token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : '',
            usuario: localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario')!) : null,
        }
    },
    actions: {
        async login(usuario: string, senha: string) {

            const data = {
                nome : usuario,
                senha: senha
            }

            const response = await fetch('http://localhost:8081/stockhive/auth/login', { // Endereço da API SpringBoot, para login.
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)

            });

            if (response.status == 200) {

                const respostaAPI = JSON.parse(await response.text());

                console.log(respostaAPI)

                this.token = respostaAPI.accessToken;
                this.usuario = usuario;

                localStorage.setItem('token', JSON.stringify(this.token));
                localStorage.setItem('usuario', JSON.stringify(this.usuario));

                router.push("/telaInicial")

            }
            else {

               alert('Falha no login. Verifique suas credenciais e tente novamente.')


            }
        },
        logout() {
            //Note que ao chegar na tela de login, os dados em cache já serão limpos pela função "limparDados()" do onMounted().
            router.push('/login');
        },
        limparDados() {
            this.token = '';
            this.usuario = '';
            //Limpa todo o localStorage
            localStorage.clear();
        }
    }
});