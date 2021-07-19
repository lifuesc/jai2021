// Importa módulo web3
import web3 from "web3";
// Busca o provider do metamask onde quer que esteja
const _web3 = new web3(web3.givenProvider);
// Ativa o ethereum no navegador
window.ethereum.enable();
// Exporta o web3 com o provider
export default _web3;
