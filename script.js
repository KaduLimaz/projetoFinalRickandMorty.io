const charactersContainer = document.querySelector(".chars-container");
const searchCharacterByName = document.getElementById("searchCharacter");
const searchCharacters = document.getElementById("searchCharacter");
let currentPage = 1;

async function getCharacters(page, name = "") {
  try {
    const params = { page, name };
    const response = await api.get(`/character`, { params });
    
    const characters = response.data.results;
    const info = response.data.info;
    

    charactersRickMorty(characters);
    updatePaginationText(info.pages)
    
  } catch (error) {
    console.log("Erro ao buscar", error);
  }
}


// função para buscar as informações da API e lançar no HTML com CSS
function charactersRickMorty(characters) {

  charactersContainer.innerHTML = "";

  characters.forEach((character) => {
    const cardCharacters = document.createElement("div");
    cardCharacters.classList.add("card");
    cardCharacters.innerHTML = `<img
            src="${character.image}"
            alt="perfil"
          />
          <h2>${character.name}</h2>
          <p>${character.status}</p>
          <p>${character.species}</p>
          <div id='status'>
            <span id="spanStatus" >Status: ${character.status}</span>
            <div class='statusColor ${
              character.status == "Dead"
                ? "dead"
                : character.status == "Alive"
                ? "alive"
                : "unknown"
            }'>
            </div>
            
        </div>
          `;
    charactersContainer.appendChild(cardCharacters);
  });
}

// botao para proxima pagina - linkado pelo onclick no HTML
function PaginationNext() {
    
  if (currentPage < 42) {
    currentPage++; // Incrementar para a próxima página
    getCharacters(currentPage);
    updatePaginationText(info.pages)
  }
  
}

// botao para voltar pagina - linkado pelo onclick no HTML
function PaginationPrev(){
    if (currentPage > 1){
        currentPage--
        getCharacters(currentPage);
        

    }
}

//contador de paginas 
function updatePaginationText(totalPages) {
    const currentPageElement = document.getElementById("currentPage");
    const totalPagesElement = document.getElementById("totalPages");
  
    currentPageElement.textContent = currentPage;
    totalPagesElement.textContent = 42;
  }


// Pesquisar personagem
searchCharacters.addEventListener("input", () => {
  currentPage = 1;
  getCharacters(currentPage, searchCharacters.value);
});

getCharacters();
