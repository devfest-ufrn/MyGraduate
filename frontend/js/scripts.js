// $(document).ready(function(){
		//var semestre_html = $(".box_semestre_repeat")[0].outerHTML;
	//	for (var i = 0; i < 1; i++) {
	//		$(".box_semestre_repeat").after(semestre_html );
	//	};

	function get_list_disciplinas(tipo){ 
		// gera a lista de disciplinas disponíveis
		// tem que testar o tipo, se for 0 gera as obrigatória
		// se for 1 gera as optativas
		if(tipo ==1){
			var lista = '<option value="0">Optativas</option> ';
			for (var i = 0; i < data.componentes.length; i++) {
		  		var componente = data.componentes[i];
		  		if(componente.semestre_oferta == 0){
		  			lista += '<option value="'+componente.id+'">'+componente.codigo+'</option> ';
		  		}
	    		
	    	}
			
		}else{
			var lista = '<option value="0">Obrigatória</option> ';
			for (var i = 0; i < data.componentes.length; i++) {
		  		var componente = data.componentes[i];
		  		if(componente.semestre_oferta != 0){
		  			lista += '<option value="'+componente.id+'">'+componente.semestre_oferta+'ºS -'+componente.codigo+'</option> ';
		  		}
	    		
	    	}
		}


		return lista;
	}

	function get_componente_by_id(id_componente){
		var componente_encontrado = null;
		for (var i = 0; i < data.componentes.length; i++) {
	  		var componente = data.componentes[i];
	  		if(componente.id == id_componente){
	  			componente_encontrado = componente;
	  			
	  		}
    		
		}
		return componente_encontrado;
	}

	num_semestre = 1
	function add_semestre(){
		// função que adicionar um semestre
		// ela usa a função de get_list_disciplinas para gerar a lista da lateral de adicionar disciplinas 


		var semestre = '	<!-- item semestre --> '+
    		' <div id="semestre_num_'+num_semestre+'" class="box_semestre box_semestre_repeat"> '+
    		
    			' <div class="col_semestre1 col_semestre1_repeat"> '+
    			' 	<p class="num_semestre"><span>'+num_semestre+'°</span> semestre</p> '+
    			' <div class=""></div> '+
    			'<div  class="aux_add_disciplina item_disc_nova"> '+
    			'	<input type="image" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal" src="img/add.svg" style="width:50px"/>'+
    			'</div> '+
    			
    			
    		' </div> '+
    		' <!-- fim item semestre -->';
    		var modal = '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'+
    		'		<form onsubmit="return false" class="form_submit_add_disciplina" > ' +
    		'			<input type="hidden" class="input_num_semestre" name="num_semestre" value="'+num_semestre+'" >	'+
    		'		<table>'+
    		' 			<tr>'+
    		' 			<td><select id="select_obrigatoria_'+num_semestre+'" class="selec_disc selec_disc_obrigatoria"> '+
    		get_list_disciplinas(0) +
    		' 			</select> </td>'+
    		' 			<td><input type="image" onclick="btn_add_disciplina('+num_semestre+', 0)" src="img/add.svg" style="width:20px"/></td>' +
    		'			</tr>'+
    		'		</table>'+
    		'       </form>' +
    		'		<form onsubmit="return false" class="form_submit_add_disciplina" > ' +
    		'			<input type="hidden" class="input_num_semestre" name="num_semestre" value="'+num_semestre+'" >	'+
    		'		<table>'+
    		' 			<tr>'+
    		'				<td><select id="select_optativa_'+num_semestre+'" class="selec_disc selec_disc_optativa"> '+
    		get_list_disciplinas(1) +
    		' 				</select> </td>'+
    		'				<td><input type="image" onclick="btn_add_disciplina('+num_semestre+', 1)" src="img/add.svg" style="width:20px"/></td>'+
    		'			</tr>'+
    		'		</table>'+	    	
    		'       </form>'+
    		'</div>';
    		
    		
			
    		num_semestre = num_semestre+1;

    		$('.div_aux_semestre').before(semestre); // adiciona o html
	}


	function btn_add_disciplina(num_semestre, tipo){
		// quando clica no botão de adicionar disciplinas, chama a funcao e passa o semestre, tipo e id da disciplinas

		if(tipo == 1){
			var id_disciplina = $("#select_optativa_"+num_semestre).val();
		}else{
			var id_disciplina = $("#select_obrigatoria_"+num_semestre).val();
		}
		var componente = get_componente_by_id(id_disciplina);
		add_disciplina(componente, num_semestre); // função que adiciona o html da disciplinas 
	}


	function add_disciplina(componente,semestre){
		// tem que formatar esse html de acordo com o id da disciplina, vai ter o array/json com os dados, tem que ir nesse array e pegar as 
		// informações da disciplina.
			if(semestre == null)
				semestre = componente.semestre_oferta;
		       var disciplina = ' <!-- item disciplina --> '+
               '      <div id="dis_id_'+componente.id+'" class="item_disc"> '+
               '          <p class="infs_topo_disc">'+get_descricao_modalidade(componente.tipo_vinculo_componente)+' - <span>'+componente.ch_total+'h</span></p> '+
               '          <p class="nome_disc">'+componente.codigo+'</p> ';
               if (componente.pre_requisito != null) {
	               disciplina +='<div class="subs_disc_list"> '+
	               '               <p>Pré requisitos:</p> '+
	               '               <span>'+componente.pre_requisito+'</span> '+
	               '         	</div>';
           		}
           		if (componente.co_requisito != null) {
              		disciplina +='<div class="subs_disc_list"> '+
               '             <p>Co requisitos:</p> '+
               '             <span>'+componente.co_requisito+'</span> '+
               '         </div> ';
           		}
           		if (componente.equivalencia != null) {
               		disciplina +='<div class="subs_disc_list"> '+
               '             <p>Equivalência:</p> '+
               '             <span>'+componente.equivalencia+'</span> '+
               '         </div> ';
               	}
               disciplina +='         <p onclick="remove_disciplina('+componente.id+')" class="rem_disciplina">remover</p> '+
               '      </div> '+
               '       <!-- fim item disciplina --> ';

        $("#semestre_num_"+semestre+" .aux_add_disciplina").before(disciplina);
	}
	
	function get_descricao_modalidade(tipo_vinculo_componente){
		
		if(tipo_vinculo_componente == 1)
			return 'Obrigatoria';
		if(tipo_vinculo_componente == 2)
			return 'Optativa';
	
	}

	function remove_disciplina(id_disciplina){
		$("#dis_id_"+id_disciplina).css({"opacity":"0"});
		
		setTimeout(function() {
			$("#dis_id_"+id_disciplina).remove();
		}, 900);


	}


	$('.add_semestre').click(function(){
		add_semestre();
	});

	var expandir = true;
	$("#switchExpandir").change(function(){
		
		if(expandir){
			$('.subs_disc_list').css({"max-height":"300px"});
			$('.item_disc').css({"min-height": "160px"});
		}else{
			$('.subs_disc_list').css({"max-height":"0px"});
			$('.item_disc').css({"min-height": "60px"});
		}
		expandir = !expandir;
	})

	var data = {
		"componentes":[
	{
		"id" : 1,
		"nome" : "PRÁTICAS DE LEITURA E ESCRITA EM PORTUGUÊS I",
		"ch_total" : 30,
		"tipo_vinculo_componente" : 1,
		"codigo" : "IMD0017",
		"equivalencia" : "( 52657 OU 2051002 ) ",
		"co_requisito" : null,
		"pre_requisito" : null,
		"semestre_oferta" : 1
	},
	{
		"id" : 2,
		"nome" : "PRÁTICAS DE LEITURA EM INGLÊS",
		"ch_total" : 30,
		"tipo_vinculo_componente" : 1,
		"codigo" : "IMD0018",
		"equivalencia" : "( 52782 OU 2051708 ) ",
		"co_requisito" : null,
		"pre_requisito" : null,
		"semestre_oferta" : 1
	},
	{
		"id" : 3,
		"nome" : "RESOLUÇÃO DE PROBLEMAS MATEMÁTICOS PARA TI",
		"ch_total" : 180,
		"tipo_vinculo_componente" : 1,
		"codigo" : "IMD0019",
		"equivalencia" : "( 52656 ) ",
		"co_requisito" : null,
		"pre_requisito" : null,
		"semestre_oferta" : 1
	},
	{
		"id" : 4,
		"nome" : "TECNOLOGIA DA INFORMAÇÃO E SOCIEDADE",
		"ch_total" : 30,
		"tipo_vinculo_componente" : 1,
		"codigo" : "IMD0020",
		"equivalencia" : "( 52535 ) ",
		"co_requisito" : null,
		"pre_requisito" : null,
		"semestre_oferta" : 1
	},
	{
		"id" : 5,
		"nome" : "INTRODUÇÃO ÀS TÉCNICAS DE PROGRAMAÇÃO",
		"ch_total" : 90,
		"tipo_vinculo_componente" : 1,
		"codigo" : "IMD0012",
		"equivalencia" : "( 2022850 ) OU ( 61131 ) ",
		"co_requisito" : null,
		"pre_requisito" : "( 55031 ) ",
		"semestre_oferta" : 2
	},
	{
		"id" : 6,
		"nome" : "CÁLCULO DIFERENCIAL E INTEGRAL I",
		"ch_total" : 90,
		"tipo_vinculo_componente" : 1,
		"codigo" : "IMD0024",
		"equivalencia" : null,
		"co_requisito" : null,
		"pre_requisito" : "( 55031 ) ",
		"semestre_oferta" : 2
	},
	{
		"id" : 7,
		"nome" : "PRÁTICAS DE LEITURA E ESCRITA EM PORTUGUÊS II",
		"ch_total" : 30,
		"tipo_vinculo_componente" : 1,
		"codigo" : "IMD0027",
		"equivalencia" : "( 52784 OU 2051700 OU 57603 ) ",
		"co_requisito" : null,
		"pre_requisito" : "( 55019 ) ",
		"semestre_oferta" : 2
	},
	{
		"id" : 8,
		"nome" : "FUNDAMENTOS MATEMÁTICOS DA COMPUTAÇÃO I",
		"ch_total" : 90,
		"tipo_vinculo_componente" : 1,
		"codigo" : "IMD0028",
		"equivalencia" : "( 52653 OU 2040665 ) ",
		"co_requisito" : null,
		"pre_requisito" : "( 55031 ) ",
		"semestre_oferta" : 2
	},
	{
		"id" : 9,
		"nome" : "VETORES E GEOMETRIA ANALÍTICA",
		"ch_total" : 60,
		"tipo_vinculo_componente" : 1,
		"codigo" : "IMD0034",
		"equivalencia" : "( 48581 E 48583 ) OU ( 2051005 ) ",
		"co_requisito" : null,
		"pre_requisito" : "( 55031 ) ",
		"semestre_oferta" : 2
	},
	{
		"id" : 10,
		"nome" : "ESTRUTURA DE DADOS BÁSICAS I",
		"ch_total" : 60,
		"tipo_vinculo_componente" : 1,
		"codigo" : "IMD0029",
		"equivalencia" : "( 2022856 ) OU ( 52778 ) ",
		"co_requisito" : "( 55024 ) ",
		"pre_requisito" : "( 52650 ) ",
		"semestre_oferta" : 3
	},
	{
		"id" : 11,
		"nome" : "LINGUAGEM DE PROGRAMAÇÃO I",
		"ch_total" : 60,
		"tipo_vinculo_componente" : 1,
		"codigo" : "IMD0030",
		"equivalencia" : "( 2022856 ) OU ( 52785 ) ",
		"co_requisito" : "( 55023 ) ",
		"pre_requisito" : "( 52650 ) ",
		"semestre_oferta" : 3
	},
	{
		"id" : 12,
		"nome" : "PROBABILIDADE",
		"ch_total" : 60,
		"tipo_vinculo_componente" : 1,
		"codigo" : "IMD0033",
		"equivalencia" : null,
		"co_requisito" : "( 55025 ) ",
		"pre_requisito" : "( 52662 ) ",
		"semestre_oferta" : 3
	},
	{
		"id" : 13,
		"nome" : "FUNDAMENTOS MATEMÁTICOS DA COMPUTAÇÃO II",
		"ch_total" : 90,
		"tipo_vinculo_componente" : 1,
		"codigo" : "IMD0038",
		"equivalencia" : "( 2040951 OU 52659 ) ",
		"co_requisito" : null,
		"pre_requisito" : "( 55022 ) ",
		"semestre_oferta" : 3
	},
	{
		"id" : 14,
		"nome" : "ESTRUTURAS DE DADOS BÁSICAS II",
		"ch_total" : 60,
		"tipo_vinculo_componente" : 1,
		"codigo" : "IMD0039",
		"equivalencia" : "( 2022900 ) OU ( 52787 ) ",
		"co_requisito" : "( 55027 ) ",
		"pre_requisito" : "( 55023 ) ",
		"semestre_oferta" : 4
	},
	{
		"id" : 15,
		"nome" : "LINGUAGEM DE PROGRAMAÇÃO II",
		"ch_total" : 60,
		"tipo_vinculo_componente" : 1,
		"codigo" : "IMD0040",
		"equivalencia" : "( 2022900 ) OU ( 52786 ) ",
		"co_requisito" : "( 55026 ) ",
		"pre_requisito" : "( 55024 ) ",
		"semestre_oferta" : 4
	},
	{
		"id" : 16,
		"nome" : "PROGRAMAÇÃO EM HARDWARE DE REDES",
		"ch_total" : 60,
		"tipo_vinculo_componente" : 2,
		"codigo" : "IMD0708",
		"equivalencia" : null,
		"co_requisito" : null,
		"pre_requisito" : "55023 E 55030 E 55028 ",
		"semestre_oferta" : 0
	},
	{
		"id" : 17,
		"nome" : "PROJETO INTEGRADOR DE REDES I",
		"ch_total" : 60,
		"tipo_vinculo_componente" : 2,
		"codigo" : "IMD0709",
		"equivalencia" : null,
		"co_requisito" : null,
		"pre_requisito" : null,
		"semestre_oferta" : 0
	},
	{
		"id" : 18,
		"nome" : "GERÊNCIA DE REDES",
		"ch_total" : 60,
		"tipo_vinculo_componente" : 2,
		"codigo" : "IMD0712",
		"equivalencia" : null,
		"co_requisito" : null,
		"pre_requisito" : "55028 ",
		"semestre_oferta" : 0
	},
	{
		"id" : 19,
		"nome" : "DESENVOLVIMENTO DE PROJETOS DE REDES DE COMPUTADORES",
		"ch_total" : 60,
		"tipo_vinculo_componente" : 2,
		"codigo" : "IMD0725",
		"equivalencia" : null,
		"co_requisito" : null,
		"pre_requisito" : null,
		"semestre_oferta" : 0
	},
	{
		"id" : 20,
		"nome" : "MECÂNICAS E BALANCEAMENTO DE JOGOS",
		"ch_total" : 60,
		"tipo_vinculo_componente" : 2,
		"codigo" : "IMD0801",
		"equivalencia" : null,
		"co_requisito" : null,
		"pre_requisito" : null,
		"semestre_oferta" : 0
	},
	{
		"id" : 21,
		"nome" : "PROJETO DE INOVAÇÃO TECNOLÓGICA",
		"ch_total" : 60,
		"tipo_vinculo_componente" : 2,
		"codigo" : "IMD0822",
		"equivalencia" : null,
		"co_requisito" : null,
		"pre_requisito" : "55027 ",
		"semestre_oferta" : 0
	},
	{
		"id" : 22,
		"nome" : "TECNOLOGIA DA INFORMAÇÃO NA SAÚDE",
		"ch_total" : 60,
		"tipo_vinculo_componente" : 2,
		"codigo" : "IMD0920",
		"equivalencia" : null,
		"co_requisito" : null,
		"pre_requisito" : null,
		"semestre_oferta" : 0
	}
		]

	}

	function loadCurriculosComponentes() {
		var periodo = 0;
	  for (var i = 0; i < data.componentes.length; i++) {
	  		var componente = data.componentes[i];
	  		console.log(componente.id);
	  		console.log(componente.nome);
	  		console.log(componente.ch_total);
	  		if(componente.semestre_oferta != periodo){
	  			periodo = componente.semestre_oferta;
	  			add_semestre();
	  		}
    		add_disciplina(componente);
			
	 
	}
}

	loadCurriculosComponentes();

