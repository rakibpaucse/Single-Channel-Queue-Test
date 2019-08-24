var customer ;


document.querySelector('.button').addEventListener('click', function(e){
    customer = document.querySelector('.input').value;
   

    // animation;

    document.querySelector('.first_cont').classList.add('.fadeout');
    document.querySelector('.first_cont').style.display = 'none';

    

    document.querySelector('.second_cont').classList.add('.fadein');
    document.querySelector('.second_cont').style.display = 'block';


//  maintain table height


 customer > 15 ? document.querySelector('.mainTable').style.height = '450px' : 
                 document.querySelector('.mainTable').style.height = 'inherit';



// mathmatical term;


function randomNumberGenerator(){
    return Math.floor(Math.random()*customer)+1;
}

const arrivalTime = [] , serviceTime = [] , timeServiceLogin = [] , timeServiceEnd = [] ,
    timeCustomerWaitsInQueue = [] , timeCustomerSpendsInSystem = [] , IdelTimeOfServer = [];




for(let i = 0 ; i<customer ; i++){
    i==0 ? arrivalTime[i]=0 : arrivalTime.push(randomNumberGenerator());

    serviceTime.push(randomNumberGenerator());
} 


arrivalTime.sort();

for (let i = 0; i < customer; i++) {

    if(i==0){

        timeServiceLogin[i] = arrivalTime[i];
        IdelTimeOfServer[i] = 0;

    }else{

        if(arrivalTime[i] > timeServiceEnd[i-1]){
            timeServiceLogin.push(arrivalTime[i]);
            IdelTimeOfServer.push(arrivalTime[i] - timeServiceEnd[i-1]);
        }else{
            timeServiceLogin.push(timeServiceEnd[i-1]);
            IdelTimeOfServer.push(0);
        }
    }
    


      timeServiceEnd.push(serviceTime[i] + timeServiceLogin[i]);
      timeCustomerWaitsInQueue.push(timeServiceLogin[i] - arrivalTime[i]);
      timeCustomerSpendsInSystem.push(timeServiceEnd[i] - arrivalTime[i]);

}


var test = [];
var final = [];
let q = 0;

while(1){

    for(let i = 0 ; i<arrivalTime.length ; i++){
        if( q == arrivalTime[i]){  
            test.push(arrivalTime[i] + serviceTime[i]);
        }
    }

        final.push(test.length);

        test = test.map(val=> --val) 
        test = test.filter(val => val!=0)
        
        if(!test.length && (final.length > customer)){ 
        	break;
        } 

        q++;
    }











// 
// table
// 



let tableContent = '';


arrivalTime.forEach((content , index) => {
    tableContent += (
        '<tr><td>'+
        (index+1)
        +'</td><td>'+
        arrivalTime[index]
        +'</td><td>'+
        serviceTime[index]

        +'</td><td>'+
        timeServiceLogin[index]
        +'</td><td>'+
        timeServiceEnd[index]
        +'</td><td>'+
        timeCustomerWaitsInQueue[index]
        +'</td><td>'+
        timeCustomerSpendsInSystem[index]
        +'</td><td>'+
        IdelTimeOfServer[index]
        +'</td></tr>'
        );
        
});


document.querySelector('.mainTable tbody').innerHTML = tableContent;











// 
// graph 
// 







var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [...final , 0].map((a,index) => index),
        datasets: [{

            label: 'Customer serving',
            data: [...final , 0] ,  


            backgroundColor:  '',
            borderColor: 'green',
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true, margin : 0
                },

            }],
            xAxes: [{
                categoryPercentage: 1.0,
                barPercentage: 1.0
            }]
        }
    }
});


function addElement(arr){
    return arr.reduce((a, b) => a + b, 0);
}


let avgWaitingTime  =  (addElement(timeCustomerWaitsInQueue) / customer).toFixed(2);
let avgServicetime = (addElement(serviceTime) / customer).toFixed(2);



document.querySelector(".avgWaitingTime").innerHTML="Average Waiting Time : "+addElement(timeCustomerWaitsInQueue)+"/"+customer+" = "+avgWaitingTime;
document.querySelector(".avgServicetime").innerHTML="Average Service TIme : "+addElement(serviceTime)+"/"+customer+" = "+avgServicetime;




document.querySelector('.input').value  = '';



})
