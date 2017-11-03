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
			var lista = '<option value="">Disciplina Optativas</option> '+
			' 	<option value="Cálculo 1">Cálculo 1</option> '+
			' 	<option value="Cálculo 2">Cálculo 2</option> '+
			' 	<option value="Cálculo 3">FMC 1</option> '+
			' 	<option value="Cálculo 4">FMC 2</option> '+
			' 	<option value="Cálculo 5">FMC 3</option> ';

		}else{
			var lista = '<option value="">Disciplina Obrigatória</option> '+
			' 	<option value="Cálculo 1">Cálculo 1</option> '+
			' 	<option value="Cálculo 2">Cálculo 2</option> '+
			' 	<option value="Cálculo 3">FMC 1</option> '+
			' 	<option value="Cálculo 4">FMC 2</option> '+
			' 	<option value="Cálculo 5">FMC 3</option> ';
		}


		return lista;
	}

	num_semestre = 1
	function add_semestre(){
		// função que adicionar um semestre
		// ela usa a função de get_list_disciplinas para gerar a lista da lateral de adicionar disciplinas 


		var semestre = '	<!-- item semestre --> '+
    		' <div id="semestre_num_'+num_semestre+'" class="box_semestre box_semestre_repeat"> '+
    			' <div class="col_semestre1 col_semestre1_repeat"> '+
    			' 	<p class="num_semestre"><span>'+num_semestre+'°</span> semestre</p> '+
    			' <div class="aux_add_disciplina"></div> '+
    		' 	</div> '+
    		' 	<div class="col_semestre2"> '+
    		'		<form onsubmit="return false" class="form_submit_add_disciplina" > ' +
    		'			<input type="hidden" class="input_num_semestre" name="num_semestre" value="'+num_semestre+'" >	'+
	    	' 			<select id="select_obrigatoria_'+num_semestre+'" class="selec_disc selec_disc_obrigatoria"> '+
	    						get_list_disciplinas(0) +
	    	' 			</select> '+
			' 			<button onclick="btn_add_disciplina('+num_semestre+', 0)" class="add_disc add_disc_obrigatoria">Adicionar</button>' +
	    	'       </form>' +
    		'		<form onsubmit="return false" class="form_submit_add_disciplina" > ' +
    		'			<input type="hidden" class="input_num_semestre" name="num_semestre" value="'+num_semestre+'" >	'+
    		' 			<select id="select_optativa_'+num_semestre+'" class="selec_disc selec_disc_optativa"> '+
    							get_list_disciplinas(1) +
    		' 			</select> '+
			' 			<button onclick="btn_add_disciplina('+num_semestre+', 1)" class="add_disc add_disc_optativa">Adicionar</button>' +
	    	'       </form>' +
    		' 	</div> '+
    		' </div> '+
    		' <!-- fim item semestre -->';

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

		add_disciplina(id_disciplina, num_semestre); // função que adiciona o html da disciplinas 
	}


	function add_disciplina(id_disciplina, id_semestre){
		// tem que formatar esse html de acordo com o id da disciplina, vai ter o array/json com os dados, tem que ir nesse array e pegar as 
		// informações da disciplina.

		       var disciplina = ' <!-- item disciplina --> '+
               '      <div id="dis_id_'+id_disciplina+'" class="item_disc"> '+
               '          <p class="infs_topo_disc">obrigatória - <span>90h</span></p> '+
               '          <p class="nome_disc">Fundamentos Matemáticos da Computação - FMC</p> '+
               '         <div class="subs_disc_list"> '+
               '               <p>Pré requisitos:</p> '+
               '               <span>Cálculo 1 - IMD00123</span> '+
               '              <span>FMC 1 - IMD00222</span> '+
               '         </div>' +
               '          <div class="subs_disc_list"> '+
               '             <p>Pré requisitos:</p> '+
               '             <span>Cálculo 1 - IMD00123</span> '+
               '           <span>FMC 1 - IMD00222</span> '+
               '         </div> '+
               '         <div class="subs_disc_list"> '+
               '             <p>Equivalência:</p> '+
               '             <span>MAT 1 - IMD2342</span> '+
               '         </div> '+
               '         <p onclick="remove_disciplina('+id_disciplina+')" class="rem_disciplina">remover</p> '+
               '      </div> '+
               '       <!-- fim item disciplina --> ';

        $("#semestre_num_"+id_semestre+" .aux_add_disciplina").before(disciplina);
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


	$("#modo_vis_0, #modo_vis_1").change(function(){
		if($(this).val() == 0){
			$('.subs_disc_list').css({"max-height":"300px"});
		}else{
			$('.subs_disc_list').css({"max-height":"0px"});
		}
	})


	
	
	add_semestre();
	add_semestre();
	add_semestre();
    
    add_disciplina(243, 1)
    add_disciplina(234, 1)
    add_disciplina(156, 1)
    add_disciplina(78, 1)

    add_disciplina(543, 2)
    add_disciplina(443, 2)
    add_disciplina(523, 2)

    add_disciplina(123, 3)
    add_disciplina(523, 3)


// })