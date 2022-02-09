function populateUFs (){
  const ufSelect = document.querySelector('[name=uf]')
  
  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
  .then( res => res.json() )
  .then( states => {
    for( state of states ){
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    }
  })
}

populateUFs()

function getCities ( event ){
  const citySelect = document.querySelector('[name=city]')
  const stateInput = document.querySelector('[name=state]')
 
  const ufValue = event.target.value

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  citySelect.innerHTML = `<option value="">Selecione a Cidade</option>`
  citySelect.disabled  = true

  fetch( url )
  .then( res => res.json() )
  .then( cities => {
    for( city of cities ){
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    }

    citySelect.disabled = false

  })

}

document.querySelector('[name=uf]')
.addEventListener('change', getCities )

//ITENS DE COLETA
//pegando todos os li
const itensToCollect = document.querySelectorAll('.items-grid li')

for(const item of itensToCollect){
  item.addEventListener('click',handleSelectedItem)
}

let selectedItems = []

// Salva os itens selecionados no input Hidden
const collectedItems = document.querySelector('[name=items]')

function handleSelectedItem(event){
  const itemLi = event.target  

  // adciona ou remove a classe selected da lista de itens
  itemLi.classList.toggle('selected')

  const itemId = itemLi.dataset.id

  // Verificar se existe selecionados, se sim
  // pegar os itens selecionados
  const alreadySelected = selectedItems.findIndex( item => {
    const itemFound = item == itemId
    return itemFound
  })
  
  // Se já estiver selecionado, tirar da seleção
  if (alreadySelected >= 0){
    const filteredItems = selectedItems.filter( item => {
      const itemIsDifferent = item != itemId
      return itemIsDifferent

    })

    selectedItems = filteredItems

  }else {
    // Se não estiver, adcionar à seleção
    selectedItems.push(itemId)

  }

  // Atualizar o campo escondido com os itens selecionados
  collectedItems.value = selectedItems
  
}