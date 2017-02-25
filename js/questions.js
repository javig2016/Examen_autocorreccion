var formElement=null;
var answer1_txt=null;
var answer2_rad=null;
var answer3_txt=null;
var answer4_sel=null;
var answer5_rad=null;
var answer6_sel=null;
var answer7_check = [];
var answer8_mul= [];
var answer9_check = [];
var answer10_mul= [];
var nota = 0;  //nota de la prueba sobre 10 puntos (tenemos 10  preguntas)

//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function(){ 

 //Se carga el formulario
 formElement=document.getElementById("examen");
 formElement.onsubmit=function(){
    inicializar();
    corregirNumber();
    corregirCheckbox();
    //Corregir pregunta 1
    corregirTexto(formElement.getElementsByClassName("texto")[0].value,
    answer1_txt, "Pregunta1: Correcta", 
    "Pregunta1: Incorrecta, la respuesta correcta es: " + answer1_txt);
    //Corregir pregunta 3
    corregirTexto(formElement.getElementsByClassName("texto")[1].value, 
    answer3_txt, "Pregunta3: Correcta", 
    "Pregunta3: Incorrecta, la respuesta correcta es: " + answer3_txt);
    //Corregir pregunta 4
    corregirSelectSimple(formElement.getElementsByTagName("select")[0], 
    answer4_sel, "Pregunta4: Correcta", 
    "Pregunta4: Incorrecta, la respuesta correcta es: ");
    //Corregir pregunta 6
    corregirSelectSimple(formElement.getElementsByTagName("select")[0], 
    answer6_sel, "Pregunta6: Correcta", 
    "Pregunta6: Incorrecta, la respuesta correcta es: ");
    presentarNota();   
    return false;
 }
 
 //LEER XML de xml/preguntas.xml
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   gestionarXml(this);
  }
 };
 xhttp.open("GET", "xml/questions.xml", true);
 xhttp.send();
}

//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/preguntas.xml
// xmlDOC es el documento leido XML. 
function gestionarXml(dadesXml){
 var xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc
 var pregunta_XML; //Acceder a la pregunta del archivo XML
 var pregunta_HTML; //Donde se ha de colocar la pregunta en el HTML
 var radio_HTML; //Obtener los datos de esta pregunta del HTML de esta modalidad
 var select_HTML; //Obtener los datos de la pregunta del HTML de esta modalidad
 var opciones; //Las opciones que tendrán los diferentes tipos de preguntas con esta posibilidad
 var optionsRadio = []; //Opciones radio del XML
 var select_opciones = []; //Multiples opciones de select
 var checkbox_HTML; //Obtener los datos de la pregunta del HMTL de esta modalidad
 var answers_checkbx; //Respuestas múltiples de modalidad checkbox
 var answer_multiple; //Respuestas múltiples de modadalidad multiple

 //Pregunta 1
  pregunta_XML = docXML.getElementsByTagName("title")[0].innerHTML;
  pregunta_HTML = document.getElementById("preg001");
  ponerDatosInputHtml(pregunta_HTML, pregunta_XML);
  answer1_txt = docXML.getElementById("preg001").getElementsByTagName("answer")[0].innerHTML;

 //Pregunta 2
  pregunta_XML = docXML.getElementsByTagName("title")[1].innerHTML;
  pregunta_HTML = document.getElementById("preg002");
  radio_HTML = document.getElementsByClassName("radioq")[0];
  opciones = docXML.getElementById("preg002").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++)  {
    optionsRadio[i] = docXML.getElementById("preg002").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosCheckboxHtml(pregunta_HTML, pregunta_XML, radio_HTML, optionsRadio, "tiempo", "radio");
  answer2_rad = parseInt(docXML.getElementById("preg002").getElementsByTagName("answer")[0].innerHTML);
  optionsRadio = [];

 //Pregunta 3
  pregunta_XML = docXML.getElementsByTagName("title")[2].innerHTML;
  pregunta_HTML = document.getElementById("preg003");
  ponerDatosInputHtml(pregunta_HTML, pregunta_XML);
  answer3_txt = docXML.getElementById("preg003").getElementsByTagName("answer")[0].innerHTML;

 //Pregunta 4
  pregunta_XML = docXML.getElementsByTagName("title")[3].innerHTML;
  pregunta_HTML = document.getElementById("preg004");
  select_HTML = document.getElementsByTagName("select")[0];
  opciones = docXML.getElementById("preg004").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++) {
    select_opciones[i] = docXML.getElementById("preg004").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosSelectHtml(pregunta_HTML, pregunta_XML, select_HTML, select_opciones);
  answer4_sel = parseInt(docXML.getElementById("preg004").getElementsByTagName("answer")[0].innerHTML);

 //Pregunta 5
  pregunta_XML = docXML.getElementsByTagName("title")[4].innerHTML;
  pregunta_HTML = document.getElementById("preg005");
  radio_HTML = document.getElementsByClassName("radioq")[0];
  opciones = docXML.getElementById("preg005").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++)  {
    optionsRadio[i] = docXML.getElementById("preg005").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosCheckboxHtml(pregunta_HTML, pregunta_XML, radio_HTML, optionsRadio, "radio");
  answer5_rad = parseInt(docXML.getElementById("preg005").getElementsByTagName("answer")[0].innerHTML);
  optionsRadio = [];

 //Pregunta 6
  pregunta_XML = docXML.getElementsByTagName("title")[5].innerHTML;
  pregunta_HTML = document.getElementById("preg006");
  select_HTML = document.getElementsByTagName("select")[0];
  opciones = docXML.getElementById("preg006").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++) {
    select_opciones[i] = docXML.getElementById("preg006").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosSelectHtml(pregunta_HTML, pregunta_XML, select_HTML, select_opciones);
  answer6_sel = parseInt(docXML.getElementById("preg006").getElementsByTagName("answer")[0].innerHTML);
  
 //Pregunta 7
  pregunta_XML = docXML.getElementsByTagName("title")[6].innerHTML;
  pregunta_HTML = document.getElementById("preg007");
  checkbox_HTML = document.getElementsByClassName("checkbox")[0];
  opciones = docXML.getElementById("preg007").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++) {
    optionsRadio[i] = docXML.getElementById("preg007").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosCheckboxHtml(pregunta_HTML, pregunta_XML, checkbox_HTML, optionsRadio, "checkbox");
  answers_checkbx = docXML.getElementById("preg007").getElementsByTagName("answer").length;
  for(i = 0; i < answers_checkbx; i++)  {
    answer7_check[i] = parseInt(docXML.getElementById("preg007").getElementsByTagName("answer")[i].innerHTML);
  }
  optionsRadio = [];

 //Pregunta 8
  pregunta_XML = docXML.getElementsByTagName("title")[7].innerHTML;
  pregunta_HTML = document.getElementById("preg008");
  select_HTML = document.getElementsByTagName("select")[3];
  opciones = docXML.getElementById("preg008").getElementsByTagName("option").length;
  for(i = 0; i < nopciones; i++)  {
    select_opciones[i] = docXML.getElementById("preg008").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosSelectHtml(pregunta_HTML, pregunta_XML, select_HTML, select_opciones);
  answer_multiple = docXML.getElementById("preg008").getElementsByTagName("answer").length;
  for(i = 0; i < answer_multiple; i++)
  {
    answer8_mul[i] = parseInt(docXML.getElementById("preg008").getElementsByTagName("answer")[i].innerHTML);
  }

  //Pregunta 9
  pregunta_XML = docXML.getElementsByTagName("title")[8].innerHTML;
  pregunta_HTML = document.getElementById("preg009");
  checkbox_HTML = document.getElementsByClassName("checkbox")[0];
  opciones = docXML.getElementById("preg009").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++) {
    optionsRadio[i] = docXML.getElementById("preg009").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosCheckboxHtml(pregunta_HTML, pregunta_XML, checkbox_HTML, optionsRadio, "checkbox");
  answers_checkbx = docXML.getElementById("preg009").getElementsByTagName("answer").length;
  for(i = 0; i < answers_checkbx; i++)  {
    answer9_check[i] = parseInt(docXML.getElementById("preg009").getElementsByTagName("answer")[i].innerHTML);
  }
  optionsRadio = [];
 
 //Pregunta 10
  pregunta_XML = docXML.getElementsByTagName("title")[7].innerHTML;
  pregunta_HTML = document.getElementById("preg010");
  select_HTML = document.getElementsByTagName("select")[3];
  opciones = docXML.getElementById("preg010").getElementsByTagName("option").length;
  for(i = 0; i < nopciones; i++)  {
    select_opciones[i] = docXML.getElementById("preg010").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosSelectHtml(pregunta_HTML, pregunta_XML, select_HTML, select_opciones);
  answer_multiple = docXML.getElementById("preg010").getElementsByTagName("answer").length;
  for(i = 0; i < answer_multiple; i++)
  {
    answer10_mul[i] = parseInt(docXML.getElementById("preg010").getElementsByTagName("answer")[i].innerHTML);
  }

}

//****************************************************************************************************
//implementación de la corrección

function corregirTexto(valor, correcto, mensajeAcierto, mensajeFallo){
  if (valor.toLowerCase() == correcto.toLowerCase()) {
   darRespuestaHtml(mensajeAcierto);
   nota +=1;
  }
  else {
   darRespuestaHtml(mensajeFallo);
  }
}


function corregirSelect(correcto, mensajeAcierto, mensajeFallo){
  //Compara el índice seleccionado con el valor del íncide que hay en el xml (<answer>2</answer>)
  //para implementarlo con type radio, usar value para enumerar las opciones <input type='radio' value='1'>...
  //luego comparar ese value con el value guardado en answer
  var sel = formElement.elements[1];  
  if (sel.selectedIndex==respuestaSelect) {
   darRespuestaHtml("P2: Correcto");
   nota +=1;
  }
  else darRespuestaHtml("P2: Incorrecto");
}

//Si necesitáis ayuda para hacer un corregirRadio() decirlo, lo ideal es que a podáis construirla modificando corregirCheckbox
function corregirCheckbox(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.color[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox.length; j++) {
     if (i==respuestasCheckbox[j]) escorrecta[i]=true;
    }
   } 
  }
  //Por cada opción que está chequedada, si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
  for (i = 0; i < f.color.length; i++) {   
   if (f.color[i].checked) {
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P3: "+i+" correcta");    
    } else {
     nota -=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P3: "+i+" incorrecta");
    }   
   }
  }
}

//****************************************************************************************************
// poner los datos recibios en el HTML
function ponerDatosInputHtml(t){
 document.getElementById("tituloInput").innerHTML = t;
}

function ponerDatosSelectHtml(t,opt){
  document.getElementById("tituloSelect").innerHTML=t;
  var select = document.getElementsByTagName("select")[0];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}

function ponerDatosCheckboxHtml(t,opt){
 var checkboxContainer=document.getElementById('checkboxDiv');
 document.getElementById('tituloCheckbox').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "color_"+i);
    input.type="checkbox";
    input.name="color";
    input.id="color_"+i;;    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
 }  
}

//****************************************************************************************************
//Gestionar la presentación de las respuestas
function darRespuestaHtml(r){
 var p = document.createElement("p");
 var node = document.createTextNode(r);
 p.appendChild(node);
 document.getElementById('resultadosDiv').appendChild(p);
}

function presentarNota(){
   darRespuestaHtml("Nota: "+nota+" puntos sobre 10");
}

function inicializar(){
   document.getElementById('resultadosDiv').innerHTML = "";
   nota=0.0;
}