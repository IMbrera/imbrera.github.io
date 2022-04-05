## 1c
Переменные.Вставить("TITLE", ЯзыковыеДанные.NEW_TICKET); 
// Получить и выьрать сервисы   
ЗапросСервисы = Новый Запрос();
ЗапросСервисы.Текст =
	"ВЫБРАТЬ
	|	Сервисы.Ссылка КАК Ссылка,
	|	Сервисы.Наименование КАК Наименование
	|ИЗ
	|	Справочник.Сервисы КАК Сервисы
	|ГДЕ
	|	Сервисы.ПометкаУдаления = ЛОЖЬ"
	;
Если Не УправлениеITОтделом8УФПовтИсп.ЭтоСотрудник() Тогда
	ЗапросСервисы.Текст = ЗапросСервисы.Текст + "	И Сервисы.ТипСервиса = ЗНАЧЕНИЕ(Перечисление.ТипыСервисов.ПользовательскийСервис)"
КонецЕсли;
ЗапросСервисы.Текст = ЗапросСервисы.Текст + " УПОРЯДОЧИТЬ ПО	Наименование";
ВыборкаСервисы = ЗапросСервисы.Выполнить().Выбрать();
ТекстСпискаВыбора = "<option id=""00000000-0000-0000-0000-000000000000"" value=""00000000-0000-0000-0000-000000000000"">" + ЯзыковыеДанные.NOT_SELECTED + "</option>";
Пока ВыборкаСервисы.Следующий() Цикл
	ТекстСпискаВыбора = ТекстСпискаВыбора
		+ СтрШаблон("<option id=""%1"" value=""%1"">%2</option>", Строка(ВыборкаСервисы.Ссылка.УникальныйИдентификатор()), ОбработатьТеги(ВыборкаСервисы.Наименование));
КонецЦикла;
Переменные.Вставить("SERVICE_LIST", ТекстСпискаВыбора);   

ЗапросСотрудники = Новый Запрос();
ЗапросСотрудники.Текст = 
			"ВЫБРАТЬ
			|	Сотрудники.Ссылка КАК Ссылка,
			|	Сотрудники.Наименование КАК Наименование
			|ИЗ
			|	Справочник.Сотрудники КАК Сотрудники
			|ГДЕ	
			|	Сотрудники.ПометкаУдаления = ЛОЖЬ"
			;
	ЗапросСотрудники.Текст = ЗапросСотрудники.Текст + " УПОРЯДОЧИТЬ ПО Наименование";
	ВыборкаСотрудников = ЗапросСотрудники.Выполнить().Выбрать();
	ТекстСпискаСотрудников = "<option id="""" value="""">" + ЯзыковыеДанные.NOT_SELECTED + "</option>";
	Пока ВыборкаСотрудников.Следующий() Цикл 
		ТекстСпискаСотрудников = ТекстСпискаСотрудников 
			+ СтрШаблон("<option id=""%1"" value=""%1"">%2</option>", Строка(ВыборкаСотрудников.Ссылка.УникальныйИдентификатор()), ОбработатьТеги(ВыборкаСотрудников.Наименование));
	КонецЦикла;
    Переменные.Вставить("FIO", ТекстСпискаСотрудников);
    *******************************************************************************************************
    <!---include(header.html)--->
<script src="<!---BASE_URL--->/tinymce/tinymce.min.js"></script>
<script>
function onChangeService() {
    var json = {
        query: "uslugalist",
        service: $('#service').val()
    };   
    $.ajax({
        data: json,
        url: '<!---BASE_URL--->/query.html',
        success: function(data){
        	$('#usluga').empty();
        	if ("list" in data && data.list !== undefined){        		
	 			$('#usluga').append(data.list);
	 		} else {
	 			$('#usluga').append('<option id="00000000-0000-0000-0000-000000000000" value="00000000-0000-0000-0000-000000000000"><!---NOT_SELECTED---></option>');
	 		}
            //console.log(data.list);
        },
        fail: function(data){
        	$('#usluga').empty();
        	$('#usluga').append('<option id="00000000-0000-0000-0000-000000000000" value="00000000-0000-0000-0000-000000000000"><!---NOT_SELECTED---></option>');
            console.log(json);
        }        
    });
   }
</script>
<div class="row">
	<div class="col-lg-12">
		<div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title"><!---FILL_FORM---></h3>
            </div>
            <!-- /.box-header -->
				<form id="mainform" name="mainform" enctype="multipart/form-data" method="post" action="<!---BASE_URL--->/ticket_ok.html">
				<div class="box-body">
				            
				<div class="form-group">
					<label for="topic"><!---SUBJECT---><span style="color:red">&nbsp;*</span></label>
					<input type="text" class="form-control" placeholder="<!---PLACE_HOLDER_THEME--->" id="topic" aria-describedby="topic" name="topic" placeholder="" required="true" autofocus>
				</div>	
				<div class="form-group">
				<label>Инициатор заявки</label><span style="color:red">&nbsp;*</span></label>
				<select class="form-control" id='username' name='username' required="true">
				<!---FIO--->
				</select>  
			    </div>
							                     
				<div class="form-group">
	            	<textarea id="editor" class="textarea" placeholder="<!---PLACE_HOLDER_NEWTASK_EDITOR--->" name="editor"></textarea>
	            </div>          
				<div class="row">
					<div class="col-lg-6">
					<div class="form-group">
						<label><!---SERVICE---></label>					 
						<select class="form-control" id='service' name='service' onchange='onChangeService()'>
						<!---SERVICE_LIST--->
						</select>
					</div>
					</div>					
					<div class="col-lg-6">
					<div class="form-group">
						<label><!---USLUGA---></label>
						<select class="form-control" id='usluga' name='usluga' <!---USLUGA_DIABLED--->>
						<option id="00000000-0000-0000-0000-000000000000" value="00000000-0000-0000-0000-000000000000"><!---NOT_SELECTED---></option>
						</select>
					</div>
					</div>
				</div>						            
	            <div class="form-group">
					<div class="fileinput" data-provides="fileinput">
					  <input name="FILE_1" size="30" type="file">
					</div><br />					
					<span id="files_table_2"></span>
					<input type="button" class="btn btn-default" value="<!---YET--->" OnClick="AddFileInput('<!---YET--->')" />
					<input type="hidden" name="files_counter" id="files_counter" value="2" />
				</div>			    		            
			<div class="form-group">
	          <div class="pull-right">
	          	<input type="button" class="btn" onclick="history.back(1)" value="<!---BACK_TO_HISTORY--->" />
	            <input type="submit" id="sumbitbtn" class="btn btn-primary" value="<!---SAVE_TICKET--->" />
	          </div>
	        </div>			              
			</div>  			  
		</form>
    </div>                            	
</div>
</div>    
<script>
formUploader = {
    prepareForm: function(form){
        // Каждая значимая кнопка формы при клике должна создать одноименное hidden поле,
        // чтобы на сервер передалась информация о том, какая кнопка была кликнута
        var allFormFields = form.getElementsByTagName('input');
        for (var i=0; i<allFormFields.length; i++){
            if(allFormFields[i].type == 'submit' && allFormFields[i].name){
                allFormFields[i].onclick = function(){
                    formUploader.createHiddenField(this);
                }
            }
        }

        // Визуализируем форму как отправляемую на сервер на событии onsubmit
        // (в т.ч. делаем все кнопки неактивными)
        form.onsubmit = function(){
            formUploader.setFormLoading(form);
        }

        // Очищаем визуализацию формы (в т.ч. делаем все кнопки вновь активными)
        // при уходе со страницы - по глобальному событию onunload
        window.onunload = function(){
            formUploader.clearFormLoading(form)
        }
    },

    setFormLoading: function(form){
        // Создаем визуализацию загрузки формы и делаем все кнопки неактивными
        document.getElementById("sumbitbtn").disabled=true;
    },
	
    clearFormLoading: function(form){
        // Очищаем форму от визуализации загрузки и возвращаем кнопки в активное состояние
        document.getElementById("sumbitbtn").disabled=false;
    },

    createHiddenField: function(button){
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = button.name;
        input.value = button.value;
        button.parentNode.insertBefore(input, button);
    }
}
</script>

<script>
    formUploader.prepareForm(document.getElementById('mainform'));
</script>

<script>
function AddFileInput()
{
	var counter = document.getElementById("files_counter").value;
	var table = document.getElementById("files_table_"+counter);

	document.getElementById("files_counter").value = ++counter;
	table.innerHTML += '<input name="FILE_'+counter+'" size="30" type="file"><br /><span id="files_table_'+counter+'"></span>';
}  
</script>

<!---include(footer.html)--->

<script>
    window.getInputContent = function()
    {
        return $('#editor').val();
    };

	function CheckForm()
	{
		var el = document.getElementsByName('topic')[0];
		if (el.value.trim()=="") {
			ShowMessage('Укажите тему задачи!', 'TOPIC');
			el.focus();
			return false;
		} else if (getInputContent().trim()=="") {
			ShowMessage('Заполните описание задачи!');
			return false;
		} else {
			return true;
		};	
	};	
</script>

<script>
(function($) {
    $.enhanceFormsBehaviour = function() {
        $('form').enhanceBehaviour();
    }

    $.fn.enhanceBehaviour = function() {
        return this.each(function() {
            var submits = $(this).find(':submit');
            submits.click(function() {
                var hidden = document.createElement('input');
                hidden.type = 'hidden';
                hidden.name = this.name;
                hidden.value = this.value;
                this.parentNode.insertBefore(hidden, this)
            });
            $(this).submit(function() {
                submits.attr("disabled", "disabled");
            });         
            $(window).unload(function() {
                submits.removeAttr("disabled");
            })
         }); 
    }
})(jQuery);
</script>

<script type="text/javascript">
  tinymce.init({
    selector: 'textarea#editor',
    height: 300,
    menubar: false,
    language: 'ru',    
    plugins: "lists media paste image help link imagetools table",
    toolbar: "undo redo | formatselect | bold italic underline blockquote forecolor backcolor | removeformat | bullist numlist outdent indent | link code table media paste image | help",
    contextmenu: "link image imagetools table removeformat",
    paste_data_images: true
  });
 </script>
