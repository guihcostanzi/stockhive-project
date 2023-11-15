import router from "@/router";
import { defineStore } from "pinia";

export const itemAlvo = defineStore({
    id: 'itemAlvo',
    state: () => {
        return {
            item: localStorage.getItem('itemAlvo') ? JSON.parse(localStorage.getItem('itemAlvo')!) : '',
        }
    },
    actions: {
        editarItem(itemAlvo : any) {

            this.item = itemAlvo;

            router.push('/editarItem');
           
        },
        voltar() {
            this.item = null;
            router.back()
        }
    }
});