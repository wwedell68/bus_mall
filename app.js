'use strict';


var imgArray = [];
var totalClicks;

function Product(name, path) {
  this.name = name;
  this.path = path;
  this.votes = 0;
  this.views = 0;
  imgArray.push(this);
}

new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/chair.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');

// add an array to store objects

//imgArray = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

// need a constructor

var imgContainer = document.getElementById('image_container');
Product.justViewed = [];
Product.pics = [document.getElementById('left'), document.getElementById('center'), document.getElementById('right')];
Product.tally = document.getElementById('tally');
totalClicks = 0;

function randomPics() {
  return Math.floor(Math.random() * imgArray.length);
}

function displayPics() {
  var currentlyShowing = [];
  //make left image unique
  currentlyShowing[0] = randomPics();
  while (Product.justViewed.indexOf(currentlyShowing[0]) !== -1) {
    console.error('Duplicate, rerun!');
    currentlyShowing[0] = randomPics();
  }
  //make center image unique
  currentlyShowing[1] = randomPics();
  while (currentlyShowing[0] === currentlyShowing[1] || Product.justViewed.indexOf(currentlyShowing[1]) !== -1) {
    console.error('Duplicate at center or in prior view! Re run!');
    currentlyShowing[1] = randomPics();
  }
  //make right image unique
  currentlyShowing[2] = randomPics();
  while (currentlyShowing[0] === currentlyShowing[2] || currentlyShowing[1] === currentlyShowing[2] || Product.justViewed.indexOf(currentlyShowing[2]) !== -1) {
    console.error('Duplicate at right! re run it.');
    currentlyShowing[2] = randomPics();
  }
  console.log(currentlyShowing);

  //take it to the DOM
  for (var i = 0; i < 3; i++) {
    Product.pics[i].src = imgArray[currentlyShowing[i]].path;
    Product.pics[i].id = imgArray[currentlyShowing[i]].name;
    imgArray[currentlyShowing[i]].views += 1;
    Product.justViewed[i] = currentlyShowing[i];
  }
}
//event listener for keeping track of total clicks on images

function showTally() {
  for (var i = 0; i < imgArray.length; i++) {


    var tally = document.getElementById('tally');
    var liEl = document.createElement('li');
    liEl.textContent = imgArray[i].name + ' has ' + imgArray[i].votes + ' votes in ' + imgArray[i].views + ' views.';
    tally.appendChild(liEl);
  }

}

//this is the name for each product
function chart() {

  var data = [];
  var labels = [];

  for (var i = 0; i < imgArray.length; i++) {
    data[i] = imgArray[i].votes;
    labels[i] = imgArray[i].name;
  }

  //this is the name for each product
  var colors = ['red', 'blue', 'yellow', 'hotpink', 'purple', 'orange' , 'white' , 'cyan' , 'magenta' , 'salmon', 'gold' , 'greenyellow' , 'magenta' , 'silver' , 'black' , 'skyblue' , 'maroon' , 'pink' , 'limegreen' , 'violet'];

  var ctx = document.getElementById('chart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '# of Votes',
        data: data,
        backgroundColor: colors,
        borderColor: 'black',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}


function handleClick(event) {
  console.log(totalClicks, 'total clicks');
  //make the clicks stop at 25
  if (totalClicks > 24) {
    //show the list after the last click
    chart();
    console.log('survey complete');

  } else {
    totalClicks += 1;
    var setImgArray = JSON.stringify(imgArray);
    localStorage.setItem('imgArray' , setImgArray);
    var clickTotal = JSON.stringify(totalClicks);
    localStorage.setItem('clicks' , clickTotal);

    for (var i = 0; i < imgArray.length; i++) {
      if (event.target.id === imgArray[i].name) {
        imgArray[i].votes += 1;
        console.log(event.target.id + ' has ' + imgArray[i].votes + ' votes in ' + imgArray[i].views + ' views.');
      }
    }
    displayPics();
  }
  //this is how we direct the user to click on a specific image
  if (event.target.id === 'image_container') {
    return alert('Need to click on an image.');
  }
  //start to add up the total clicks and log it to the console

}

if(localStorage.imgArray) {
  var getImgArray = localStorage.getItem('imgArray');
  imgArray = JSON.parse(getImgArray);
  var clickTotal = localStorage.getItem('clicks');
  totalClicks = JSON.parse(clickTotal);
}

//event listener
imgContainer.addEventListener('click', handleClick);
displayPics();

var reset = document.getElementById('start-new');
reset.onclick = function() {
  localStorage.clear();
  totalClicks = 0;
  console.log('new survery');
};