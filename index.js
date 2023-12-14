const clientId = 'insira aqui seu id';
const clientSecret = 'insira aqui seu segredo';
const merchantId = 'id da loja '; //id da minha loja

// GET conseguindo o código de acesso
const getToken = async () => {
    const result = await fetch('https://merchant-api.ifood.com.br/authentication/v1.0/oauth/token', {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grantType=client_credentials&clientId=${clientId}&clientSecret=${clientSecret}`,
     
    });
    const data =await result.json();
    return data;

};
// GET conseguindo informações da minha loja 
const getMerchant = async (token)=>{
    const result = await fetch(`https://merchant-api.ifood.com.br/merchant/v1.0/merchants/${merchantId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Bearer ${token}`
        },
      
    });
    const data =await result.json();
    return data;

};
//GET conseguindo o catalogo da minha loja
const getMerchantCatalog = async (token)=>{
    const result = await fetch(`https://merchant-api.ifood.com.br/catalog/v2.0/merchants/${merchantId}/catalogs`, {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Bearer ${token}`
        },
      
    });
    const data =await result.json();
    return data;

};
//POST criando uma categoria no meu catalogo
const postCatalogCategory = async (token,catalogId)=>{
    const result = await fetch(`https://merchant-api.ifood.com.br/catalog/v2.0/merchants/${merchantId}/catalogs/${catalogId}/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body:{
                "id": "1",
                "name": "Geladinhos",
                "externalCode": "string",
                "status": "AVAILABLE",
                "index": 0,
                "template": "DEFAULT"
          }
    });
    const data =await result.json();
    return data;
};

(async ()=>{
const token= await getToken();
console.log(token);

const loja = await getMerchant(token.accessToken);
console.log(loja);

const Catalogo = await getMerchantCatalog(token.accessToken)
console.log (Catalogo);

const catalogId = Catalogo[0].catalogId;
console.log(catalogId);

const criandoCategoria = await postCatalogCategory(token.accessToken,catalogId);
console.log (criandoCategoria);

})();









    

