import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont:"mdi"
    },
    theme: {
        themes: {
            light: {
                primary: "#37474F",
                secondary: "#CFD8DC",
                botones: "#0277BD"
            }
        }
    }
});
