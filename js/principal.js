const inputName = document.getElementById('InputName');
const textComment = document.getElementById('InputText');
const form = document.getElementById('formulario');
const commentPost = document.getElementById('ComentPost');
let dadosArmazenados = JSON.parse(localStorage.getItem("dadosLocalizados")) || [];

dadosArmazenados.forEach((elemento) => {
  criaElemento(elemento);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  armazenaDados();

  let p = document.createElement('p');
  p.classList = 'p-2 d-flex text-wrap flex-wrap';
  p.innerHTML = `<strong>${inputName.value}: </strong> &nbsp ${textComment.value}`;
  const id = dadosArmazenados.length; // Atribui um ID baseado no tamanho do array
  p.appendChild(deletaBotao(id));
  commentPost.appendChild(p);
  inputName.focus();

  const existe = dadosArmazenados.find(elemento => elemento.nome === inputName.value);

  if (existe) {
    existe.comentario = textComment.value;
    atualizaElemento(existe);
  } else {
    const auxilioRegistro = {
      id: id,
      nome: inputName.value,
      comentario: textComment.value
    };

    criaElemento(auxilioRegistro);

    dadosArmazenados.push(auxilioRegistro);
  }

  localStorage.setItem("dadosLocalizados", JSON.stringify(dadosArmazenados));
});

function armazenaDados() {
  const nomeDados = inputName.value;
  const comentarioDados = textComment.value;

  dadosArmazenados = JSON.parse(localStorage.getItem("dadosLocalizados")) || [];

  const auxilioRegistro = {
    id: dadosArmazenados.length,
    nome: nomeDados,
    comentario: comentarioDados
  };

  dadosArmazenados.push(auxilioRegistro);

  localStorage.setItem("dadosLocalizados", JSON.stringify(dadosArmazenados));
}

function criaElemento(item) {
  let p = document.createElement('p');
  p.classList = 'p-2 d-flex text-wrap flex-wrap';
  p.innerHTML = `<strong>${item.nome}: </strong> &nbsp ${item.comentario}`;
  p.appendChild(deletaBotao(item.id));
  commentPost.appendChild(p);
  inputName.focus();
}

function deletaBotao(id) {
  const botaoDeleta = document.createElement("button");
  botaoDeleta.innerText = "X";
  botaoDeleta.addEventListener("click", function() {
    deletaElemento(this.parentNode, id);
  });
  return botaoDeleta;
}

function deletaElemento(tag, id) {
  tag.remove();

  dadosArmazenados = dadosArmazenados.filter(elemento => elemento.id !== id);

  localStorage.setItem("dadosLocalizados", JSON.stringify(dadosArmazenados));
};