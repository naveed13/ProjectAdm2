
function myClick(clickId)
{
  return displayOption(clickId);
};

function log(obj) {
  var response = document.getElementById("response");
  response.innerHTML=(JSON.stringify(obj));
};

function createElement(element){
  return document.createElement(element);
}

function each(arr, type){
  for (var i =0; i < arr.length; i ++){
    document.getElementById(arr[i]).style.display=type;
  }
}

function displayOption(clickId){
  if (clickId == 'myPic'){
    var arrN1 = [ 'sub-text', 'email', 'emailSubmit',
                  'albumSubmit','inputAlbum','album',
                  'music', 'inputMusic', 'musicSubmit',
                  'inputDocs', 'docsSubmit', 'docs', 'response'
                ];
    var arrB1 = [ 'picSubmit', 'input' ];
    each (arrN1, 'none');
    each (arrB1, 'block');
  } else if (clickId == 'myAlbum'){
      var arrN2 = [ 'sub-text', 'email', 'emailSubmit',
                    'music', 'inputMusic', 'musicSubmit',
                    'inputDocs', 'docsSubmit', 'docs',
                    'picSubmit', 'input', 'response'
                  ];
      var arrB2 = [ 'albumSubmit', 'album', 'inputAlbum' ];
      each (arrN2, 'none');
      each (arrB2, 'block');
    } else if (clickId == 'myMusic'){
        var arrN3 = [ 'sub-text', 'email', 'emailSubmit',
                      'inputDocs','docsSubmit', 'docs',
                      'picSubmit', 'input', 'response',
                      'albumSubmit', 'album', 'inputAlbum',
                    ];
        var arrB3 = [ 'music', 'inputMusic','musicSubmit' ];
        each (arrN3, 'none');
        each (arrB3, 'block');
      } else if (clickId == 'myEmail'){
          if (document.getElementById('eSubject').value.length > 0){ document.getElementById('eSubject').value = '';}
          if (document.getElementById('eText').value.length > 0) {document.getElementById('eText').value = '';}
            var arrN4 = [ 'music', 'inputMusic','musicSubmit',
                          'docsSubmit', 'docs', 'inputDocs',
                          'input', 'picSubmit',
                          'albumSubmit', 'album', 'inputAlbum',
                        ];
            var arrB4 = [ 'email', 'emailSubmit', 'sub-text', 'response'];
            each (arrN4, 'none');
            each (arrB4, 'block');

        } else if (clickId == 'myDocs'){
            var arrN5 = [ 'music', 'inputMusic','musicSubmit',
                          'picSubmit','input', 'response',
                          'albumSubmit', 'album','inputAlbum',
                          'email', 'emailSubmit', 'sub-text',
                        ];
            var arrB5 = [ 'docsSubmit','docs', 'inputDocs'];
            each (arrN5, 'none');
            each (arrB5, 'block');
          }
};

if (localStorage.loginDatabase && localStorage.loginDatabase.length > 0){
  var userName = localStorage.loginDatabase;
  userName = userName.substr(2, userName.length-4).toUpperCase();
  var str = 'Welcome to your personal dashboard'+' '+userName;
} else {
    var str = 'Welcome to your personal dashboard';
  }
var myArr = str.split('');
function autoType(){
  if (myArr.length > 0){
    document.getElementById('autoType').innerHTML += myArr.shift();
  }
  setTimeout('autoType()', 70);
};
autoType();

function profilePic() {
  var selectedFile = document.getElementById('input').files[0];
  localStorage.setItem('selectedFile', JSON.stringify(selectedFile));
  var divPic = document.getElementById('divPic');
  var img = createElement('img')
  img.setAttribute('id', 'profilePic');
  img.src = window.URL.createObjectURL(selectedFile);
  img.onload = function() {
    window.URL.revokeObjectURL(this.src);
  }
  divPic.appendChild(img);
  imageSize();
};

function album(){
  var selectedFiles = document.getElementById('inputAlbum');
  var picCount = selectedFiles.files.length;
  document.getElementById('picCount').innerHTML = picCount;

  var addAlbum = document.getElementById('album')
  var list = createElement('ul')
  addAlbum.appendChild(list);
  list.setAttribute('style', 'list-style: none; padding:10px;');

  for (var i=0; i < selectedFiles.files.length; i++) {
    var li = createElement('li');
    list.appendChild(li);

    var img = createElement('img');
    img.src = window.URL.createObjectURL(selectedFiles.files[i]);
    img.onload = function() {
      window.URL.revokeObjectURL(this.src);
    }
    img.setAttribute('class', 'albumPic');
    li.appendChild(img);
    var info = createElement('span');
    info.setAttribute('id', 'picInfo');
    info.innerHTML = selectedFiles.files[i].name + ": " + selectedFiles.files[i].size + " bytes";
    // li.appendChild(info);
  }
  imageSize();
};

function imageSize(){
  var images = document.getElementsByTagName('img');
  for (var i =0; i < images.length; i ++){
    images[i].addEventListener('mouseover', function(e){
      this.setAttribute('style', 'width: 400px; height: 300px;');
    }, false);
    images[i].addEventListener('mouseout', function(e){
      this.setAttribute('style', 'width: 150px; height: 150px;');
    }, false);
    images[i].addEventListener('dblclick', function(e){
      this.remove();
    }, false);
  }
};

function music(){
  var selectedFiles = document.getElementById('inputMusic');
  var musicCount = selectedFiles.files.length;
  document.getElementById('musicCount').innerHTML = musicCount;

  var addAlbum = document.getElementById('music');
  var list = createElement('ul');
  addAlbum.appendChild(list);

  list.setAttribute('style', 'list-style: none; padding:10px;');
  for (var i=0; i < selectedFiles.files.length; i++) {
    var li = createElement('li');
    list.appendChild(li);
    var audio = createElement('audio');
    li.appendChild(audio);
    fileURL = window.URL.createObjectURL(selectedFiles.files[i]);
    audio.src = fileURL;
    audio.setAttribute('controls', 'controls');
    audio.onload = function() {
      window.URL.revokeObjectURL(this.src);
    }
    var info = createElement('span');
    info.innerHTML = selectedFiles.files[i].name + ": " + selectedFiles.files[i].size + " bytes";
    li.appendChild(info);
  }
};

function docs(){
  var selectedFiles = document.getElementById('inputDocs');
  var docsCount = selectedFiles.files.length;
  document.getElementById('docsCount').innerHTML = docsCount;

  var addDocs = document.getElementById('docs');
  var list = createElement('ul');
  addDocs.appendChild(list);

  list.setAttribute('style', 'list-style: none; padding:10px;');
  for (var i=0; i < selectedFiles.files.length; i++) {
    var li = createElement('li');
    list.appendChild(li);
    var doc = createElement('a');
    li.appendChild(doc);
    doc.download = selectedFiles.files[i];
    doc.innerHTML = "Download File  ";
    fileURL = window.URL.createObjectURL(selectedFiles.files[i]);
    doc.setAttribute('href', fileURL);
    doc.click();
    doc.onload = function() {
      window.URL.revokeObjectURL(this.src);
    }
    var info = createElement('span');
    info.innerHTML = selectedFiles.files[i].name + " : " + selectedFiles.files[i].size + " bytes";
    li.appendChild(info);
  }
};

function sendEmail (){
  var sendEmailList = [];
  var subject = document.getElementById('eSubject').value;
  var text = document.getElementById('eText').value;
  userDatabase = JSON.parse(localStorage.getItem('userDatabase'));
  loginDatabase = JSON.parse(localStorage.getItem('loginDatabase'));
  for (var j = 0 ; j < userDatabase.length; j ++){
    if (loginDatabase.userName == localStorage.userDatabase[j].userName){
          var myEmail = userDatabase[j].userEmail;
    }
  };
  var sendEmails = document.getElementsByClassName('emaillistClass');
  for (var i =0; i < sendEmails.length; i ++){
    var sendEmail = sendEmails[i].value;
    var m = new mandrill.Mandrill('J3cJBUaW9LE4n11rHdt7qw');
    var params = {
      "message": {
        "from_email":myEmail,
        "to":[{"email":sendEmail}],
        "subject": subject,
        "text": text
      }
    };
    m.messages.send(params, function(res) {
      log(res);
    }, function(err) {
        log(err);
      });
    }
    var e = document.getElementsByClassName('ediv');
    var s = document.getElementsByClassName('emaillistClass');
    for (var l = 0; l < e.length; l++){
      for (var a=0; a< s.length; a++){
        e[l].parentNode.removeChild(s[a]);
      }
    }

    document.getElementById('sub-text').style.display='none';
    document.getElementById('email').style.display='none';
    document.getElementById('emailSubmit').style.display='none';
};

function createFriendsList(){
  var estat = document.getElementById('response').innerHTML;
  if (estat.length > 0){
      document.getElementById('response').innerHTML = '';
    }
  document.getElementById('eSubject').value = '';
  document.getElementById('eText').value = '';

  var elist = document.getElementById("email");
  var div = createElement('div');
  div.setAttribute('class', 'ediv');
  elist.appendChild(div);
  var input = createElement('input');
  elist.appendChild(input);
  input.setAttribute('type', 'text');
  input.setAttribute('class', 'emaillistClass')
  input.setAttribute('placeholder', 'Enter Email');
  input.setAttribute('style', 'margin-left:10px; background-color:#F2F1EF;')

  var butt = createElement('button');
  butt.textContent='Send';
  butt.setAttribute('class', 'emailListSubmit btn btn-info')
  butt.setAttribute('style', 'margin-left:10px;')
  butt.setAttribute('id', 'eListSubmit')
  elist.appendChild(butt);

  var inputEmail = document.getElementsByClassName('emailListSubmit');
  for (var i = 0; i < inputEmail.length - 1; i ++){
    document.getElementsByClassName('ediv')[i].parentNode.removeChild(inputEmail[i]);
  }
document.getElementById("eListSubmit").addEventListener("click", sendEmail, false);
};
document.getElementById("musicSubmit").addEventListener('click', music, false);
document.getElementById("emailSubmit").addEventListener("click", createFriendsList, false);
document.getElementById("albumSubmit").addEventListener("click", album, false);
document.getElementById("picSubmit").addEventListener("click", profilePic, false);
document.getElementById("docsSubmit").addEventListener("click", docs, false);
document.getElementById('myPic').addEventListener('click', myClick, false);
document.getElementById('myAlbum').addEventListener('click', myClick, false);
document.getElementById('myMusic').addEventListener('click', myClick, false);
document.getElementById('myEmail').addEventListener('click', myClick, false);
document.getElementById('myDocs').addEventListener('click', myClick, false);


