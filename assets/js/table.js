

 fetch("https://hospdata.herokuapp.com/titulos").then((response) =>
  response.json()).then((json) => {
  
  dataBase(json)    
  }).catch((error) => {

  });

function show(valor){
 
}


function dataBase(valor){
 
  let data = Array.from({ length: valor.length }).map((_, i) => `<a href="#/${valor[i].name.toLowerCase().replaceAll("ã","a").replaceAll("ç","c").replaceAll(" ","_").replaceAll("-","_")}">${valor[i].name.toLowerCase()}</a>`)

  // for(let i = 0; i < json.length; i++){
  //               data = json[i]
  // }

 

  // total de paginas a seres exibidas 
  let perPage = 5;

  

  const state = {
    page: 1,//por onde começa a pagina
    perPage,
    totalPage: Math.ceil(data.length / perPage),//total de paginas
    maxVisibleButtons: 5

  }

  let t = data;



  function search() {

    const searchBar = html.get('.search');


    searchBar.addEventListener('keyup', (e) => {

      const searchString = e.target.value;



      const filterItem = data.filter(item => {


        return item.includes(searchString.trim().toLowerCase());

      });

       t= filterItem;
    


      if (filterItem.length === data.length) {
        controls.goTo(1);
        state.totalPage = Math.ceil(data.length / perPage)
        update();
      }
      if (!filterItem.length) {
        controls.goTo(1);
        state.totalPage = Math.ceil(filterItem.length + 1 / perPage)
        update();
      }

      if (filterItem.length) {
        controls.goTo(1);
        state.totalPage = Math.ceil(filterItem.length / perPage)
        update();

      }


    });

  }

  //retorna o elemento html clicado 
  const html = {

    get(element) {

      return document.querySelector(element);
    }
  }


  function changeScreen() {

    const change = addEventListener('click', () => {

      if ($(window).height() < 500) {
        state.perPage = 1;

        update();

      }
      if ($(window).height() > 600) {
        state.perPage = 5;

        update();
      }


      // 
    })


  }

  //cria e atualiza a lista no front 
  const list = {
    creatItem(item) {

      const div = document.createElement('li');
      div.classList.add('item');
      div.innerHTML = item;

      try {
        html.get('.list').appendChild(div);
      } catch (error) {

      }


    },
    notFound(item) {
      const conjunto = document.createElement('div');
      const div = document.createElement('img');
      div.src = 'imagens/notFound.jpg'

      const h5 = document.createElement('h5');
      h5.innerText = item;

      div.classList.add('notFound');

      conjunto.classList.add('notFoundConj')

      try {
        html.get('.list').appendChild(conjunto);
        html.get('.notFoundConj').appendChild(div);
        html.get('.notFoundConj').appendChild(h5)

      } catch (error) {

      }
    },
    update() {
      try {
        html.get('.list').innerHTML = "";
      } catch (error) {

      }
      let empety = "Nenhum resultado foi encontrado"
      let page = state.page - 1;
      let start = page * state.perPage;
      let end = start + state.perPage;

      const paginatedItems = t.slice(start, end);


      if (!t.length) {

        list.notFound(empety)
      }
      if (t.length) {
        paginatedItems.forEach(list.creatItem);
      }
    }
  }



  //cria os butões de numeros e organiza a quantidade
  const buttons = {
    element: html.get('.pagination .numbers'),

    creat(number) {

      const button = document.createElement('div');

      button.innerHTML = number;

      if (state.page == number) {
        button.classList.add('active');
      }

      button.addEventListener('click', (event) => {
        const page = event.target.innerText;

        controls.goTo(page);
        update();
      })

      buttons.element.appendChild(button);

    },
    update() {
      buttons.element.innerHTML = "";
      const { maxLeft, maxRight } = buttons.calculateMaxVisible();

      for (let page = maxLeft; page <= maxRight; page++) {
        buttons.creat(page)
      }
    },
    calculateMaxVisible() {
      const { maxVisibleButtons } = state;
      let maxLeft = (state.page - Math.floor(maxVisibleButtons / 2));
      let maxRight = (state.page + Math.floor(maxVisibleButtons / 2));


      if (maxLeft < 1) {
        maxLeft = 1;
        maxRight = maxVisibleButtons;
      }

      if (maxRight > state.totalPage) {
        maxLeft = state.totalPage - (maxVisibleButtons - 1);
        maxRight = state.totalPage;

        if (maxLeft < 1) maxLeft = 1;

      }

      return { maxLeft, maxRight };
    }
  }




  //função dos controladores
  const controls = {
    next() {
      state.page++

      const lastPage = state.page > state.totalPage
      if (lastPage) {
        state.page--
      }
    },
    prev() {
      state.page--

      if (state.page < 1) {
        state.page++
      }
    },
    goTo(page) {
      if (page < 1) {
        page = 1;
      }

      state.page = +page;

      if (page > state.totalPage) {
        state.page = state.totalPage;
      }
    },
    creatListeners() {
      html.get('.firts').addEventListener('click', () => {
        controls.goTo(1);
        update();
      }),
        html.get('.last').addEventListener('click', () => {
          controls.goTo(state.totalPage);
          update();
        }),
        html.get('.next').addEventListener('click', () => {
          controls.next();
          update();
        }),
        html.get('.prev').addEventListener('click', () => {
          controls.prev();
          update();
        })

    }
  }




  //atualiza as funcões
  function update() {
    list.update();
    buttons.update();
  }




  //chama todas as funções necessarias
  function init() {

    search();
    update();
    changeScreen()
    controls.creatListeners();

  }

  init();


}













