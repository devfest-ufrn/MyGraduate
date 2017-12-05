var token_type ='to';
var access_token = 'ac';
var codeDiscente = '';

var AuthorizationPtoken  = '';
getCodeLoginURL();
var url_base = "https://apitestes.info.ufrn.br/";
	

var ajax = new XMLHttpRequest();



function carregar_turmas(){
	var ajax = new XMLHttpRequest();
	var urlGET = url_base+"curso/v0.1/cursos?nivel=G&limit=20&offset=20";	
	ajax.open("GET", urlGET, true);
	ajax.setRequestHeader("Authorization",AuthorizationPtoken);
	ajax.setRequestHeader("x-api-key", "ArUQKho0i6QWlP6xCQGDCw6G4TfogmYLi6iiq3Jp");

	$.ajax({
	  type: "GET",
	  beforeSend: function(request) {
	    request.setRequestHeader("Authorization",AuthorizationPtoken );
	    request.setRequestHeader("x-api-key", "ArUQKho0i6QWlP6xCQGDCw6G4TfogmYLi6iiq3Jp");
	  },
	  url: url_base+"curso/v0.1/cursos?nivel=G&limit=20&offset=20",
	  success: function(data) {
	    console.log("The result =" + data[1].nivel);
	  }
	});
	
	// Envia a requisição
	ajax.send();
	// Cria um evento para receber o retorno.
}

function getCodeLoginURL(){

	var query = location.search.slice(1);
	var partes = query.split('&');
	var data = {};
	partes.forEach(function(parte) {
		var chaveValor = parte.split('=');
		var chave = chaveValor[0];
		valor = chaveValor[1];
		data[chave] = valor;
	});
	codeDiscente = data.code;
}


function logar(){

	// Seta tipo de requisição: Post e a URL da API
	var urlPOST = url_base
			+ "authz-server/oauth/token?client_id=grade-curricular-interativa-id"
			+ "&client_secret=segredo&"
			+ "redirect_uri=http://localhost/app.html&"
			+ "grant_type=authorization_code&code=" + codeDiscente;

	ajax.open("POST", urlPOST, true);
	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	ajax.onreadystatechange = function() {

			// Caso o state seja 4 e o http.status for 200, é porque a requisiçõe deu certo.
			if (ajax.readyState == 4 && ajax.status == 200 && access_token == 'ac') {

				var data = ajax.responseText;
				var json = JSON.parse(data);
				access_token = json.access_token;
				token_type = json.token_type;
				AuthorizationPtoken  = token_type + " " + access_token;

			carregar_turmas();
			}
	}
	// Seta paramêtros da requisição e envia a requisição
	ajax.send();
}

logar();

