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

 //Corrección cuando se pulsa el botón del formulario
 formElement.onsubmit=function(){
    inicializar();
    //Corregir pregunta 1 texto
    corregirTXT(formElement.getElementsByClassName("texto")[0].value, answer1_txt, "Pregunta 1: correcta", "Pregunta 1: Incorrecta, la respuesta correcta es: " + answer1_txt);
    //Corregir pregunt 2 radio
    corregirRadio(formElement.programa, answer2_rad, "Pregunta 2: correcta", "Pregunta 2: Incorrecta, la respuesta correcta es: ", "programa");
    //Corregir pregunta 3 texto
    corregirTXT(formElement.getElementsByClassName("texto")[1].value, answer3_txt, "Pregunta 3: correcta", "Pregunta 3: Incorrecta, la respuesta correcta es: " + answer3_txt);
    //Corregir pregunta 4 select
    corregirSelect(formElement.getElementsByTagName("select")[0], answer4_sel, "Pregunta 4: correcta", "Pregunta 4: Incorrecta, la respuesta correcta es: ");
    //Corregir pregunta 5 radio
    corregirRadio(formElement.programa, answer5_rad, "Pregunta 5: correcta", "Pregunta 5: Incorrecta, la respuesta correcta es: ", "interferencia");
    //Corregir pregunta 6 select
    corregirSelect(formElement.getElementsByTagName("select")[1], answer6_sel, "Pregunta 6: correcta", "Pregunta 6: Incorrecta, la respuesta correcta es: ");
    //Corregir pregunta 7 checkbox
    corregirCheckbox1(formElement.elementos, answer7_check, "Pregunta 7: correcto", "Pregunta 7: Incorrecta(s), las respuestas correctas son: ", "elementos");
    //Corregir pregunta 8 multiple
    corregirMultiple(formElement.getElementsByTagName("select")[2], answer8_mul, "Pregunta 8: correcta(s)", "Pregunta 8: Incorrecta, las respuestas correctas son: ");
    //Corregir pregunta 9 checkbox
    function ponera0checkbox (){var acertadas = 0};
    corregirCheckbox2(formElement.formatos, answer9_check, "Pregunta 9: correcta", "Pregunta 9: Incorrecta(s), las respuestas correctas son: ", "formatos");
   //Corregir pregunta 10 multiple
    corregirMultiple(formElement.getElementsByTagName("select")[3], answer10_mul, "Pregunta 10: correcta", "Pregunta 10: Incorrecta, las respuestas correctas son: ");
    presentarNota();
    return false;
 }
}


//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/preguntas.xml
// xmlDOC es el documento leido XML. 
function gestionarXml(datosXml){
  var xmlDoc = datosXml.responseXML; //Parse XML a xmlDoc
  var preg_XML; //Acceder a la pregunta del archivo XML
  var preg_HTML;//Donde se ha de colocar la pregunta en el HTML
  var rad_HTML;//Obtener datos del HTML de pregunta radio
  var sel_HTML;///Obtener los datos de la pregunta del HTML de esta modalidad
  var chkbx_HTML;//Obtener los datos de la pregunta del HMTL de esta modalidad
  var opciones;//Cantidad de opciones que tendrán los diferentes tipos de preguntas con esta posibilidad
  var sel_mul_opciones = [];//Opciones de preguntas tipo select o multiple
  var chkbx_radi_opciones = [];//Opciones de preguntas tipo checkbox o radio
  var res_chkbx;//Cantidad de respuestas en checkbox
  var res_mul;//Cantidad de respuestas en multiple

 //Pregunta 1 texto
  pregXML = xmlDoc.getElementsByTagName("title")[0].innerHTML;
  preg_HTML = document.getElementById("preg001");
  ponerdatosTXT(preg_HTML, pregXML);
  answer1_txt = xmlDoc.getElementById("preg001").getElementsByTagName("answer")[0].innerHTML;

 //Pregunta 2 radio
  pregXML = xmlDoc.getElementsByTagName("title")[1].innerHTML;
  preg_HTML = document.getElementById("preg002");
  rad_HTML = document.getElementsByClassName("radio")[0];
  opciones = xmlDoc.getElementById("preg002").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++)  {
    chkbx_radi_opciones[i] = xmlDoc.getElementById("preg002").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosCheckboxHtml(preg_HTML, pregXML, rad_HTML, chkbx_radi_opciones, "programa", "radio");
  answer2_rad = parseInt(xmlDoc.getElementById("preg002").getElementsByTagName("answer")[0].innerHTML);
  chkbx_radi_opciones = [];

 //Pregunta 3 texto
  pregXML = xmlDoc.getElementsByTagName("title")[2].innerHTML;
  preg_HTML = document.getElementById("preg003");
  ponerdatosTXT(preg_HTML, pregXML);
  answer3_txt = xmlDoc.getElementById("preg003").getElementsByTagName("answer")[0].innerHTML;

 //Pregunta 4 select
  pregXML = xmlDoc.getElementsByTagName("title")[3].innerHTML;
  preg_HTML = document.getElementById("preg004");
  select_HTML = document.getElementsByTagName("select")[0];
  opciones = xmlDoc.getElementById("preg004").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++) {
    sel_mul_opciones[i] = xmlDoc.getElementById("preg004").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosSelectHtml(preg_HTML, pregXML, select_HTML, sel_mul_opciones);
  answer4_sel = parseInt(xmlDoc.getElementById("preg004").getElementsByTagName("answer")[0].innerHTML);

 //Pregunta 5 radio
  pregXML = xmlDoc.getElementsByTagName("title")[4].innerHTML;
  preg_HTML = document.getElementById("preg005");
  rad_HTML = document.getElementsByClassName("radio")[1];
  opciones = xmlDoc.getElementById("preg005").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++)  {
    chkbx_radi_opciones[i] = xmlDoc.getElementById("preg005").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosCheckboxHtml(preg_HTML, pregXML, rad_HTML, chkbx_radi_opciones, "interferencia", "radio");
  answer5_rad = parseInt(xmlDoc.getElementById("preg005").getElementsByTagName("answer")[0].innerHTML);
  chkbx_radi_opciones = [];

 //Pregunta 6 select
  pregXML = xmlDoc.getElementsByTagName("title")[5].innerHTML;
  preg_HTML = document.getElementById("preg006");
  select_HTML = document.getElementsByTagName("select")[1];
  opciones = xmlDoc.getElementById("preg006").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++) {
    sel_mul_opciones[i] = xmlDoc.getElementById("preg006").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosSelectHtml(preg_HTML, pregXML, select_HTML, sel_mul_opciones);
  answer6_sel = parseInt(xmlDoc.getElementById("preg006").getElementsByTagName("answer")[0].innerHTML);
  
 //Pregunta 7 checkbox
  pregXML = xmlDoc.getElementsByTagName("title")[6].innerHTML;
  preg_HTML = document.getElementById("preg007");
  chkbx_HTML = document.getElementsByClassName("checkbox")[0];
  opciones = xmlDoc.getElementById("preg007").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++) {
    chkbx_radi_opciones[i] = xmlDoc.getElementById("preg007").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosCheckboxHtml(preg_HTML, pregXML, chkbx_HTML, chkbx_radi_opciones, "elementos", "checkbox");
  res_chkbx = xmlDoc.getElementById("preg007").getElementsByTagName("answer").length;
  for(i = 0; i < res_chkbx; i++)  {
    answer7_check[i] = parseInt(xmlDoc.getElementById("preg007").getElementsByTagName("answer")[i].innerHTML);
  }
  chkbx_radi_opciones = [];

 //Pregunta 8 multiple
  pregXML = xmlDoc.getElementsByTagName("title")[7].innerHTML;
  preg_HTML = document.getElementById("preg008");
  select_HTML = document.getElementsByTagName("select")[2];
  opciones = xmlDoc.getElementById("preg008").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++)  {
    sel_mul_opciones[i] = xmlDoc.getElementById("preg008").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosSelectHtml(preg_HTML, pregXML, select_HTML, sel_mul_opciones);
  res_mul = xmlDoc.getElementById("preg008").getElementsByTagName("answer").length;
  for(i = 0; i < res_mul; i++)
  {
    answer8_mul[i] = parseInt(xmlDoc.getElementById("preg008").getElementsByTagName("answer")[i].innerHTML);
  }

  //Pregunta 9 checkbox
  pregXML = xmlDoc.getElementsByTagName("title")[8].innerHTML;
  preg_HTML = document.getElementById("preg009");
  chkbx_HTML = document.getElementsByClassName("checkbox")[1];
  opciones = xmlDoc.getElementById("preg009").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++) {
    chkbx_radi_opciones[i] = xmlDoc.getElementById("preg009").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosCheckboxHtml(preg_HTML, pregXML, chkbx_HTML, chkbx_radi_opciones, "formatos", "checkbox");
  res_chkbx = xmlDoc.getElementById("preg009").getElementsByTagName("answer").length;
  for(i = 0; i < res_chkbx; i++)  {
    answer9_check[i] = parseInt(xmlDoc.getElementById("preg009").getElementsByTagName("answer")[i].innerHTML);
  }
  chkbx_radi_opciones = [];
 
 //Pregunta 10 multiple
  pregXML = xmlDoc.getElementsByTagName("title")[9].innerHTML;
  preg_HTML = document.getElementById("preg010");
  select_HTML = document.getElementsByTagName("select")[3];
  opciones = xmlDoc.getElementById("preg010").getElementsByTagName("option").length;
  for(i = 0; i < opciones; i++)  {
    sel_mul_opciones[i] = xmlDoc.getElementById("preg010").getElementsByTagName("option")[i].innerHTML;
  }
  ponerDatosSelectHtml(preg_HTML, pregXML, select_HTML, sel_mul_opciones);
  res_mul = xmlDoc.getElementById("preg010").getElementsByTagName("answer").length;
  for(i = 0; i < res_mul; i++)
  {
    answer10_mul[i] = parseInt(xmlDoc.getElementById("preg010").getElementsByTagName("answer")[i].innerHTML);
  }

}


//****************************************************************************************************
//implementación de la corrección

function corregirTXT(valor, correcto, mAcierto, mFallo) {
  if(valor.toLowerCase() == correcto.toLowerCase()) {
    darRespuestaHTML(mAcierto);
    nota += 1;
  }
  else {
    darRespuestaHTML(mFallo);
  }
}


function corregirRadio(radio, correcto, mAcierto, mFallo, atributo) {
  var value = -1;//Este valor se debe a que no hay selección para comparar
  for(i = 0; i < radio.length; i++) {
    if(radio[i].checked) {//si se encuentra lo seleccionado, se cambia value y se sale
      value = i;
      break;
    }
  }
  if(value == correcto) {
    darRespuestaHTML(mAcierto);
    nota += 1;
  }
  else {
    darRespuestaHTML(mFallo + document.getElementById(atributo+correcto).innerHTML);
  }
}


function corregirMultiple(multi, correcto, mAcierto, mFallo) {
  var respuestas = [];
  var acertadas = [];
  for(i = 0; i < correcto.length; i++) {//se usa para el mFallo
    acertadas[i] = multi[correcto[i]].innerHTML;
  }
  for(j = 0; j < multi.length; j++) {//se recogen las respuestas del usuario
    if(multi[j].selected) {
      respuestas[respuestas.length] = j;
    }
  }
  if(respuestas.length == correcto.length) {
    for(k = 0; k < respuestas.length; k++) {
      if(respuestas[k] != correcto[k]) {
        darRespuestaHTML(mFallo + acertadas.join(", "));
        break;
      }
      darRespuestaHTML(mAcierto);
    }
  }
  else {
    darRespuestaHTML(mFallo + acertadas.join(", "));
  }
}


function corregirSelect(select, correcto, mAcierto, mFallo) {
  if(select.value == correcto) {
    darRespuestaHTML(mAcierto);
    nota += 1;
  }
  else {
    darRespuestaHTML(mFallo + select[correcto].innerHTML);
  }
}


function corregirCheckbox1(checkbox, correcto, mAcierto, mFallo, atributo) {
  var respuestas = [];
  var acertadas = [];
  for(i = 0; i < correcto.length; i++) {//se usa para el mFallo
    acertadas[i] = document.getElementById(atributo+correcto[i]).innerHTML;
  }
  for(j = 0; j < checkbox.length; j++){//se recogen las respuestas del usuario
    if(checkbox[j].checked) {
      respuestas[respuestas.length] = j;
    }
  }
  if(respuestas.length == correcto.length) {
    for(k = 0; k < respuestas.length; k++) {
      if(respuestas[k] != correcto[k]) {
        darRespuestaHTML(mFallo + acertadas.join(", "));
        break;
      }
      darRespuestaHTML(mAcierto);
    }
  }
  else {
    darRespuestaHTML(mFallo + acertadas.join(", "));
  }
}


function corregirCheckbox2(checkbox, correcto, mAcierto, mFallo, atributo) {
  var respuestas = [];
  var acertadas = [];
  for(i = 0; i < correcto.length; i++) {//se usa para el mFallo
  }
  for(j = 0; j < checkbox.length; j++){//se recogen las respuestas del usuario
    if(checkbox[j].checked) {
      respuestas[respuestas.length] = j;
    }
  }
  if(respuestas.length == correcto.length) {
    for(k = 0; k < respuestas.length; k++) {
      if(respuestas[k] != correcto[k]) {
        darRespuestaHTML(mFallo + acertadas.join(", "));
        break;
      }
      darRespuestaHTML(mAcierto);
    }
  }
  else {
    darRespuestaHTML(mFallo + acertadas.join(", "));
  }
}


//****************************************************************************************************
// poner los datos recibidos en el HTML


function ponerdatosTXT(elementoHTML, elementoXML) {
  elementoHTML.innerHTML = elementoXML;
}

function ponerDatosSelectHtml(elementoHTML, elementoXML, sel_HTML, selectOpciones) {
  elementoHTML.innerHTML = elementoXML;
  var option;
  for (i = 0; i < selectOpciones.length; i++) { 
    option = document.createElement("option");
    option.text = selectOpciones[i];
    option.value = i;
    sel_HTML.options.add(option);
  }  
}


function ponerDatosCheckboxHtml(elementoHTML, elementoXML, chkbx_HTML, checkboxOpciones, atributo, tipo) {
  elementoHTML.innerHTML = elementoXML;
  var input;
  var label;
  for (i = 0; i < checkboxOpciones.length; i++) {
    input = document.createElement("input");
    label = document.createElement("label");
    label.innerHTML = checkboxOpciones[i];
    label.setAttribute("id", atributo+i);
    input.type = tipo;
    input.name = atributo;
    chkbx_HTML.appendChild(input);
    chkbx_HTML.appendChild(label);
    chkbx_HTML.appendChild(document.createElement("br"));
  }
}


//****************************************************************************************************
//Gestionar la presentación de las respuestas


function darRespuestaHTML(texto)
{
  var parrafo = document.createElement("p");
  var contenido = document.createTextNode(texto);
  parrafo.appendChild(contenido);
  document.getElementById("resultados").appendChild(parrafo);
}

function presentarNota()
{
  darRespuestaHTML("Tu nota es de "+nota+" sobre 10 puntos.");
}
function inicializar()
{
  document.getElementById("resultados").innerHTML = "";
  nota = 0;
}
