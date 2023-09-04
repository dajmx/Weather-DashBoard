var cityFormEl = document.querySelector('#city-form');
var serchContainer = document.querySelector('#serch-elements');
var inputCity = document.getElementById("city-search");
var proviceEl= document.querySelector('#province');
var tempEl= document.querySelector('#temp');
var windEl= document.querySelector('#wind');
var humidityEl= document.querySelector('#humidity');
var containerForcast= document.querySelector('#container-forecast');

var ciudades=[];

var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var city = inputCity.value.trim();
  
    if (city) {
      getUserRepos(city);
        
      containerForcast.textContent='';
      serchContainer.textContent = '';
      inputCity.value = '';
    } else {
      alert('Please enter a city');
    }
  };

  var getUserRepos = function (city) {
    var APIKey="a81a5d7542520d11b9cf315fabe2b6e8";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
  
    fetch(queryURL)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          
          response.json().then(function (data) {
            console.log(data);
            
            displayRepos(city);
            displayWeather(data);
            getForescastRepo(city);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to Weather');
      });
  };

 
  
  function displayRepos(city) {
    
    ciudades.push(city);
    if (ciudades.length > 7) {
      ciudades.splice(0, ciudades.length - 7); 
    }
    serchContainer.innerHTML = '';
    ciudades.forEach(function(ciudad) {
      var repoEl = document.createElement('a');
      repoEl.textContent = ciudad;
      repoEl.classList = 'list-item flex-row  align-center';
      serchContainer.insertBefore(repoEl, serchContainer.firstChild);

      repoEl.addEventListener('click', function() {
        containerForcast.textContent='';
        inputCity.value= ciudad;
        getUserRepos(ciudad);
      });
    });
  
    localStorage.setItem('ciudades', JSON.stringify(ciudades));
  }
  
  function displayWeather(data){
    var name = data.name;
    province.textContent=name;
    var temp = data.main.temp;
    tempEl.textContent= "Temperature: "+(temp-273.15).toFixed(1) + " °C";

    var wind = data.wind.speed;
    windEl.textContent="Wind: "+ wind + " MPH";

    var humidity = data.main.humidity;
    humidityEl.textContent= "Humidity: " + humidity+ "%"
    
  }
 
  var getForescastRepo = function (city) {
      var APIKeyWeather = "4363691a743e38306e0510db48b17cab"
      var queryURLW = "https://api.openweathermap.org/data/2.5/forecast?q="+ city +"&appid="+APIKeyWeather;
    
      fetch(queryURLW)
        .then(function (response) {
          if (response.ok) {
            console.log(response);
            
            response.json()
            .then(function (data) {
                console.log(data);
                
             
              
            for(i=0; i<6;i++){
                if (i=== 0){
                    var dayEl1 = document.createElement("div");   
                    dayEl1.textContent = data.list[i].dt_txt.split(" ")[0];
                    var imgEl1= document.createElement("img");
                    imgEl1.src = "https://openweathermap.org/img/wn/"+ data.list[i].weather[0].icon + "@2x.png";

                    proviceEl.appendChild(dayEl1)
                    proviceEl.appendChild(imgEl1)
                }else{
                    var card = document.createElement("div")
                    card.classList.add("cardDay");
                    var dayEl = document.createElement("div");   
                    var imgEl= document.createElement("img");   
                    var temperEl = document.createElement("div");   
                    var windEl = document.createElement("div");   
                    var humEl = document.createElement("div"); 
                    
                    dayEl.textContent = data.list[i].dt_txt;
                    imgEl.src = "https://openweathermap.org/img/wn/"+ data.list[i].weather[0].icon + "@2x.png";
                    temperEl.textContent = ((data.list[i].main.temp)-273.15).toFixed(1) + " °C";
                    windEl.textContent = data.list[i].wind.speed + " MPH";
                    humEl.textContent = data.list[i].main.humidity + " %";
                    
        
                    card.appendChild(dayEl);
                    card.appendChild(imgEl);
                    card.appendChild(temperEl);
                    card.appendChild(windEl);
                    card.appendChild(humEl);
        
                    containerForcast.appendChild(card);

                }
            }
            });
          } else {
            alert('Error: ' + response.statusText);
          }
        })
        .catch(function (error) {
          alert('Unable to connect to  Second Weather');
        });
    };

  cityFormEl.addEventListener("submit", formSubmitHandler);
