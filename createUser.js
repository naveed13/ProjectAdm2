function createElement(element){
  return document.createElement(element);
}

function UserAccount(userName, userEmail, userPassword ){
  this.userName = userName;
  this.userEmail = userEmail;
  this.userPassword = userPassword;
};

var str = 'This is your personal DASHBOARD Simple & Yet Powerful';
var myArr = str.split('');
function autoType(){
  if (myArr.length > 0){
    document.getElementById('autoTypeFP').innerHTML += myArr.shift();
  }
  setTimeout('autoType()', 70);
}
autoType();

function createFormUser(){
  document.getElementById('createForm').style.display='none';
  document.getElementById('signIn').style.display='none';

  var newAcc = document.getElementById('newAcc');
  var newDiv = createElement('div');
  newDiv.setAttribute('id','1');
  var newInput = createElement('input');
  newAcc.appendChild(newDiv).appendChild(newInput);
  newInput.setAttribute('type', 'text');
  newInput.setAttribute('placeholder', 'Create user name');
  newInput.setAttribute('id', 'name');

  var newDiv2 = createElement('div');
  newDiv2.setAttribute('id','2');
  var newInput2 = createElement('input');
  newAcc.appendChild(newDiv2).appendChild(newInput2);
  newInput2.setAttribute('type', 'text');
  newInput2.setAttribute('placeholder', 'Create Password');
  newInput2.setAttribute('id', 'password');

  var newBr = createElement('br');
  var newDiv3 = createElement('div');
  newDiv3.setAttribute('id','3');
  var newInput3 = createElement('input');
  newAcc.appendChild(newDiv3).appendChild(newInput3);
  newInput3.setAttribute('type', 'text');
  newInput3.setAttribute('placeholder', 'Create Email');
  newInput3.setAttribute('id', 'email');
  newDiv3.appendChild(newBr);

  var newDiv4 = createElement('div');
  newDiv4.setAttribute('id','4');
  var newButt = createElement('button');
  newAcc.appendChild(newDiv4).appendChild(newButt);
  newButt.setAttribute('type', 'button');
  newButt.textContent='Submit';
  newButt.setAttribute('id', 'newAccSubmit');

  document.getElementById('newAccSubmit').addEventListener('click', createUser, false);
};

function createUser(){
  var userDatabase = [];
  document.getElementById('createForm').style.display='block';
  document.getElementById('signIn').style.display='block';

  var userName = document.getElementById('name').value;
  if (userName.length < 4){
    alert ("userName should be 4 or more charaters");
    userName = '';
  }
  var userPassword = document.getElementById('password').value;
  if (userPassword.length < 4 ){
    alert ("Password should be 4 or more characters");
    userPassword = '';
  }

  var userEmail = document.getElementById('email').value;
  // if (userEmail === '/[@]/') {

  //   console.log(userEmail);
  //   alert ("invalid email.");
  //   userEmail = '';
  // }

  if (userName == "" || userPassword == "" || userEmail == ""){
    alert("Your fields are empty - Fill in to create Account");
  } else {
    if (userDatabase.length == 0){
      var newUser = new UserAccount(userName, userEmail, userPassword);
      userDatabase.push(newUser);
    } else if (userDatabase.length > 0) {
        for (var i =0; i < userDatabase.length; i ++){
          if (userDatabase[i].userName == userName){
            alert ("Please pick another name!!")
            return 0;
          }
        }
        var newUser = new UserAccount(userName, userEmail, userPassword);
        userDatabase.push(newUser);
      }
    }
    localStorage.setItem('userDatabase', JSON.stringify(userDatabase));

    document.getElementById('newAcc').removeChild(document.getElementById('4'));
    document.getElementById('newAcc').removeChild(document.getElementById('3'));
    document.getElementById('newAcc').removeChild(document.getElementById('2'));
    document.getElementById('newAcc').removeChild(document.getElementById('1'));

    document.getElementById('createForm').style.display='block';
};

function userLogin(){
  var loginDatabase =[];
  userDatabase = JSON.parse(localStorage.getItem('userDatabase'));
  var userName = document.getElementById('signName').value;
  var userPassword = document.getElementById('signPassword').value;
  if (userDatabase == null){
    alert("Create Account first");
  } else {
      for (var i =0; i < userDatabase.length; i ++){
        if (userDatabase[i].userName == userName && userDatabase[i].userPassword == userPassword){
          if (loginDatabase.length > 0){
            JSON.parse(localStorage.getItem('loginDatabase'));
            localStorage.removeItem('loginDatabase');
          }
            loginDatabase.push(userName);
            localStorage.setItem('loginDatabase', JSON.stringify(loginDatabase));
          window.open("dashboard.html");
          return 0;
        }
      }
    }
  alert("Do you have an account? ....");
};
document.getElementById('createForm').addEventListener('click', createFormUser, false);
document.getElementById('signIn').addEventListener('click', userLogin, false);





