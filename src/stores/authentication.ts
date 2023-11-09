import router from "@/router";
import { defineStore } from "pinia";

export const authentication = defineStore({
    id: 'auth',
    state: () => {
        return {
            token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : '',
            usuario: localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario')!) : null,
            invalid: false,
        }
    },
    actions: {
        async login(usuario: string, senha: string) {

            const data = {
                usuario : usuario,
                senha: senha
            }

            const response = await fetch('http://localhost:8081/auth/login', { // Endereço da API SpringBoot, para login.
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)

            });

            if (response.status == 200) {

                this.invalid = false;
                this.token = JSON.parse(await response.text());
                this.usuario = usuario;

                localStorage.setItem('token', JSON.stringify(this.token));
                localStorage.setItem('usuario', JSON.stringify(this.usuario));

                router.push("/telaInicial")

            }
            else {
                this.invalid = true;

                const erro = JSON.parse(await response.text());

                if (erro.message && erro.custom) {
                    alert(erro.message);
                }


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