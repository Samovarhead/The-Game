let blocks = [];
let activated = [];
let colors = ['red', 'blue', 'green', 'karmine', 'yellow', 'orange', 'purple', 'sea'];
let sucsess = 0;

// --------------------------------------------------- Преобразование коллекции в массив

let tmp = document.getElementsByClassName('block');

for (let i = 0; i < tmp.length; i++) {
  blocks.push(tmp[i]);
}

for (let col = 0; col < 8; col++) {
  for (let i = 0; i < 2; i++) {
    var num = randomInteger(0, 15);

// --------------------------------------------------- Назначение цвета и скрытие
    if (blocks[num].classList.length < 2) {
      blocks[num].classList.add(colors[col]);
    } else {
      i--;
    }
  }
}

function hideAll() {
  for (let y = 0; y < blocks.length; y++) {
    blocks[y].classList.add('hidden');
  }
}

setTimeout(hideAll, 1000);

// --------------------------------------------------------- Вешаем событие клик

for (let x = 0; x < blocks.length; x++) {
  blocks[x].addEventListener('click', function() {
    this.classList.remove('hidden'); // Открываем блок
	this.classList.add('opened'); // Добавляем класс-метку 

	let temp = document.getElementsByClassName('opened'); //При каждом клике проверяем сколько меток повешено

	if (temp.length == 2) { // Если повешено две метки запускаем проверку
	  for(let i = 0; i < temp.length; i++){
        activated.push(temp[i]); // Преобразование коллекции меток в массив
	  }
    
      activated[0].classList.remove('opened'); //Убираем классы-метки
	  activated[1].classList.remove('opened');

	  let firstColor = activated[0].classList[1]; //Записываем повешенные классы цветаы в переменные для дальнейшего сравнения
	  let secondColor = activated[1].classList[1];

	  if (firstColor != secondColor) { // "Если цвет у открытых блоков разный"
        let firstBlock = activated[0]; // Записываем обьекты в переменные для дальнейшей обработки
	    let secondBlock = activated[1];

	    setTimeout(function(activated) {
		  firstBlock.classList.add('hidden'); // Скрываем пару с разным цветом
		  secondBlock.classList.add('hidden');
	    }, 500);
	    		
	  } else {
        sucsess++; // Если цвета одинаковые - оставляем их открытыми и добавляем 1 к счетчику успешных открытий

	    if(sucsess == 8){ // Когда значение 8 - значит все блоки открыты, предлагаем перезапустить
          setTimeout(function(activated) {
            let vin = confirm('Поздавляшки! Вы молодец! \nЖелаете повторить?');
            if (vin) {
            	location.reload();
            }
		  }, 100); 
	    }
	  }

	  activated = []; // Сбрасываем все счетчики при каждой открытой проверенной паре блоков
	  temp = [];
	}
  });
}

// ----------------------------------------------------Выдача рандомного числа

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}