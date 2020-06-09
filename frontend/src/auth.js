import { VueEasyJwt } from 'vue-easy-jwt';
const jwt = new VueEasyJwt();

function isAuth() {
	try {
        let token = jwt.decodeToken(localStorage.getItem("token"));
        return jwt.isExpired(token);
	} catch (error) {
		return false;
	}
}

function isStudent(){
    let token = jwt.decodeToken(localStorage.getItem("token"));
    return token.tipUsuario === 2;
}

export {isAuth, isStudent};