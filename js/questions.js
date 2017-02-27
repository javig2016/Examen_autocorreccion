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

 //LEER XML de xml/preguntas.xml
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   gestionarXml(this);
  }
 };
 xhttp.open("GET", "xml/questions.xml", true);
 xhttp.send();

 //Corrección
 formElement.onsubmit=function(){
    inicializar();
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
    corregirCheckbox();
    presentarNota();   
    return false;
 }
}

//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/preguntas.xml
// xmlDOC es el documento leido XML. 
function gestionarXml(datosXml){
 var xmlDoc = datosXml.responseXML; //Parse XML a xmlDoc
 var pregunta_XML; //Acceder a la pregunta del archivo XML
 var pregunta_HTML; //Donde se ha de colocar la pregunta en el HTML
 var radio_HTML; //Obtener los datos de esta pregunta del HTML de esta modalidad
 var select_HTML; //Obtener los datos de la pregunta del HTML de esta modalidad
 var checkbox_HTML; //Obtener los datos de la pregunta del HMTL de esta modalidad
 var opciones; //Cantidad de opciones que tendrán los diferentes tipos de preguntas con esta posibilidad
 var optionsRadio = []; //Opciones radio del XML
 var select_opciones = []; //Multiples opciones de select
 var answers_checkbx; //Respuestas múltiples de modalidad checkbox
 var answer_multiple; //Respuestas múltiples de modadalidad multiple

 //Pregunta 1 texto
  pregunta_XML = xmlDoc.getElementsByTagName("title")[0].innerHTML;
  pregunta_HTML = document.getElementById("preg001");
  ponerDatosInputHtml(pregunta_HTML, pregunta_XML);
  answer1_txt = xmlDoc.getElementById("preg001").getElementsByTagName("answer")[0].innerHTML;

 //Pregunta 2 radio
  pregunta_XML = xmlDoc.getElementsByTagName("title")[1].innerHTML;
  pregunta_HTML = document.getElementById("preg002");
  radio_HTML = document.getElementsByClassName("radio")[0];
  opciones = xmlDoc.getElementById("preg002").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++)  {
    optionsRadio[i] = xmlDoc.getElementById("preg002").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosCheckboxHtml(pregunta_HTML, pregunta_XML, radio_HTML, optionsRadio, "programa", "radio");
  answer2_rad = parseInt(xmlDoc.getElementById("preg002").getElementsByTagName("answer")[0].innerHTML);
  optionsRadio = [];

 //Pregunta 3 texto
  pregunta_XML = xmlDoc.getElementsByTagName("title")[2].innerHTML;
  pregunta_HTML = document.getElementById("preg003");
  ponerDatosInputHtml(pregunta_HTML, pregunta_XML);
  answer3_txt = xmlDoc.getElementById("preg003").getElementsByTagName("answer")[0].innerHTML;

 //Pregunta 4 select
  pregunta_XML = xmlDoc.getElementsByTagName("title")[3].innerHTML;
  pregunta_HTML = document.getElementById("preg004");
  select_HTML = document.getElementsByTagName("select")[0];
  opciones = xmlDoc.getElementById("preg004").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++) {
    select_opciones[i] = xmlDoc.getElementById("preg004").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosSelectHtml(pregunta_HTML, pregunta_XML, select_HTML, select_opciones);
  answer4_sel = parseInt(xmlDoc.getElementById("preg004").getElementsByTagName("answer")[0].innerHTML);

 //Pregunta 5 radio
  pregunta_XML = xmlDoc.getElementsByTagName("title")[4].innerHTML;
  pregunta_HTML = document.getElementById("preg005");
  radio_HTML = document.getElementsByClassName("radio")[1];
  opciones = xmlDoc.getElementById("preg005").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++)  {
    optionsRadio[i] = xmlDoc.getElementById("preg005").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosCheckboxHtml(pregunta_HTML, pregunta_XML, radio_HTML, optionsRadio, "interferencia", "radio");
  answer5_rad = parseInt(xmlDoc.getElementById("preg005").getElementsByTagName("answer")[0].innerHTML);
  optionsRadio = [];

 //Pregunta 6 select
  pregunta_XML = xmlDoc.getElementsByTagName("title")[5].innerHTML;
  pregunta_HTML = document.getElementById("preg006");
  select_HTML = document.getElementsByTagName("select")[1];
  opciones = xmlDoc.getElementById("preg006").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++) {
    select_opciones[i] = xmlDoc.getElementById("preg006").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosSelectHtml(pregunta_HTML, pregunta_XML, select_HTML, select_opciones);
  answer6_sel = parseInt(xmlDoc.getElementById("preg006").getElementsByTagName("answer")[0].innerHTML);
  
 //Pregunta 7 checkbox
  pregunta_XML = xmlDoc.getElementsByTagName("title")[6].innerHTML;
  pregunta_HTML = document.getElementById("preg007");
  checkbox_HTML = document.getElementsByClassName("checkbox")[0];
  opciones = xmlDoc.getElementById("preg007").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++) {
    optionsRadio[i] = xmlDoc.getElementById("preg007").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosCheckboxHtml(pregunta_HTML, pregunta_XML, checkbox_HTML, optionsRadio, "elementos", "checkbox");
  answers_checkbx = xmlDoc.getElementById("preg007").getElementsByTagName("answer").length;
  for(i = 0; i < answers_checkbx; i++)  {
    answer7_check[i] = parseInt(xmlDoc.getElementById("preg007").getElementsByTagName("answer")[i].innerHTML);
  }
  optionsRadio = [];

 //Pregunta 8 multiple
  pregunta_XML = xmlDoc.getElementsByTagName("title")[7].innerHTML;
  pregunta_HTML = document.getElementById("preg008");
  select_HTML = document.getElementsByTagName("select")[2];
  opciones = xmlDoc.getElementById("preg008").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++)  {
    select_opciones[i] = xmlDoc.getElementById("preg008").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosSelectHtml(pregunta_HTML, pregunta_XML, select_HTML, select_opciones);
  answer_multiple = xmlDoc.getElementById("preg008").getElementsByTagName("answer").length;
  for(i = 0; i < answer_multiple; i++)
  {
    answer8_mul[i] = parseInt(xmlDoc.getElementById("preg008").getElementsByTagName("answer")[i].innerHTML);
  }

  //Pregunta 9 checkbox
  pregunta_XML = xmlDoc.getElementsByTagName("title")[6].innerHTML;
  pregunta_HTML = document.getElementById("preg009");
  checkbox_HTML = document.getElementsByClassName("checkbox")[1];
  opciones = xmlDoc.getElementById("preg009").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++) {
    optionsRadio[i] = xmlDoc.getElementById("preg009").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosCheckboxHtml(pregunta_HTML, pregunta_XML, checkbox_HTML, optionsRadio, "exportar", "checkbox");
  answers_checkbx = xmlDoc.getElementById("preg009").getElementsByTagName("answer").length;
  for(i = 0; i < answers_checkbx; i++)  {
    answer9_check[i] = parseInt(xmlDoc.getElementById("preg009").getElementsByTagName("answer")[i].innerHTML);
  }
  optionsRadio = [];
 
 //Pregunta 10 multiple
  pregunta_XML = xmlDoc.getElementsByTagName("title")[7].innerHTML;
  pregunta_HTML = document.getElementById("preg010");
  select_HTML = document.getElementsByTagName("select")[3];
  opciones = xmlDoc.getElementById("preg010").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++)  {
    select_opciones[i] = xmlDoc.getElementById("preg010").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosSelectHtml(pregunta_HTML, pregunta_XML, select_HTML, select_opciones);
  answer_multiple = xmlDoc.getElementById("preg010").getElementsByTagName("answer").length;
  for(i = 0; i < answer_multiple; i++)
  {
    answer10_mul[i] = parseInt(xmlDoc.getElementById("preg010").getElementsByTagName("answer")[i].innerHTML);
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
function ponerDatosInputHtml(texto_HTML, texto_XML){
  texto_HTML.innerHTML = texto_XML;
}

function ponerDatosSelectHtml(texto_HTML, texto_XML, sect_HTML, sect_opciones)
{
  texto_HTML.innerHTML = texto_XML;
  var option;
  for (i = 0; i < sect_opciones.length; i++)
  { 
    option = document.createElement("option");
    option.text = sect_opciones[i];
    option.value = i;
    sect_HTML.options.add(option);
  }  
}

function ponerDatosCheckboxHtml(texto_HTML, texto_XML, checkboxHTML, checkboxOpciones, atributo, tipo)
{
  texto_HTML.innerHTML = texto_XML;
  var input;
  var label;
  for (i = 0; i < checkboxOpciones.length; i++)
  {
    input = document.createElement("input");
    label = document.createElement("label");
    label.innerHTML = checkboxOpciones[i];
    label.setAttribute("for", atributo+i)
    input.type = tipo;
    input.name = atributo;
    input.id = atributo+i;
    checkboxHTML.appendChild(input);
    checkboxHTML.appendChild(label);
    checkboxHTML.appendChild(document.createElement("br"));
  }
}


//****************************************************************************************************
//Gestionar la presentación de las respuestas
function darRespuestaHtml(solucion){
 var p = document.createElement("p");
 var node = document.createTextNode(solucion);
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