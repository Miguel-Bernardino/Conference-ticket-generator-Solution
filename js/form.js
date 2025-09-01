// Elementos DOM
const fileInput   =  document.getElementById('file-input');
const formulario  =  document.getElementById('form');

const nomeInput   =  document.getElementById('name-input');
const emailInput  =  document.getElementById('email-input');
const githubInput =  document.getElementById('github-input');

const fileInputIncompleted = document.getElementById('dragtxt');
const fileInputCompleted   = document.getElementsByClassName('upload-completed')[0];

const fileInfo    =  document.getElementsByClassName('normal-info' )[0];

const fileError   =  document.getElementsByClassName('invalid-info')[0];
const nomeError   =  document.getElementsByClassName('invalid-msg' )[0];
const emailError  =  document.getElementsByClassName('invalid-msg' )[1];
const githubError =  document.getElementsByClassName('invalid-msg' )[2];


// Expressões regulares
const emailRegex = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,63}$/;
const githubRegex = /^@([a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38})$/i;


// Função para validar email
function validarEmail(email) {
    return emailRegex.test(email);
}

// Função para validar usuário GitHub
function validarGitHub(usuario) {
    return githubRegex.test(usuario);
}

// Função para validar nome
function validarNome(nome) {
    return nome.trim().length >= 2;
}

// Função para validar arquivo
function validarFile(file){

    if(file == null){
        return false;
    }
    if(!file.type.startsWith("image/")){
        return false;
    }

    let size = file.size / (512 * 1024);
    return size <= 5; 
}

// Função para mostrar erro
function mostrarErroInput(elementoErro) {
    elementoErro.style.display = 'flex';
}

// Função para mostrar erro para arquivo
function mostrarErroInputFile() {
    fileInfo.style.display = 'none';
    fileError.style.display = 'flex';
}


// Função para limpar erro
function limparErroInput(elementoErro) {
    elementoErro.style.display = 'none';
}

// Função para limpar erro para arquivo
function limparErroInputFile() {
    fileInfo.style.display = 'flex';
    fileError.style.display = 'none';
}

let imagem;

function onRemoveFile(){   

    const avatar = document.getElementById('avatar-img');

    fileInputIncompleted.style.display = 'flex';
    fileInputCompleted.style.display = 'none';

    imagem = avatar;
    avatar.src = '';
    // Resetar o input de arquivo
    fileInput.value = '';

}

function onChangeFile(){

    const avatar = document.getElementById('avatar-img');

    const fileInput = document.getElementById('change-file-input');

    avatar.src = URL.createObjectURL(fileInput.files[0]);

}


// Validação do arquivo
function onFileUploaded() {
    // Validar arquivo
    let file = fileInput.files[0];
    if (!validarFile(file)) {
        mostrarErroInputFile();
        return;
    }else {
        limparErroInputFile();
    }

    fileInputIncompleted.style.display = 'none';
    fileInputCompleted.style.display = 'flex';

    const avatar = document.getElementById('avatar-img');
    avatar.src = URL.createObjectURL(file);
}

fileInputIncompleted.addEventListener('dragover', (e) => {
    e.preventDefault(); 
});

fileInputIncompleted.addEventListener('drop', (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    if (file.type.startsWith('image/')) {
        if (!validarFile(file)) {
            mostrarErroInputFile();
            return;
        }
        limparErroInputFile();
        
    } 

    fileInputIncompleted.style.display = 'none';
    fileInputCompleted.style.display = 'flex';

    const avatar = document.getElementById('avatar-img');
    avatar.src = URL.createObjectURL(file);

})

fileInputCompleted.addEventListener('dragover', (e) => {
    e.preventDefault(); 
});

fileInputCompleted.addEventListener('drop', (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    if (file.type.startsWith('image/')) {
        if (!validarFile(file)) {
            mostrarErroInputFile();
            return;
        }
        limparErroInputFile();
        
    } 

    fileInputIncompleted.style.display = 'none';
    fileInputCompleted.style.display = 'flex';

    const avatar = document.getElementById('avatar-img');
    avatar.src = URL.createObjectURL(file);

})

form.addEventListener('submit', function(event) {
    
    event.preventDefault(); 
    let isValid = true;

    // Validar nome
    if (!validarNome(nomeInput.value)) {
        mostrarErroInput(nomeError);
        isValid = false;
    } else {
        fullname = nomeInput.value
        limparErroInput(nomeError);
    }

    // Validar email
    if (!validarEmail(emailInput.value)) {
        mostrarErroInput(emailError);
        isValid = false;
    } else {
        limparErroInput(emailError);
    }

    // Validar GitHub
    if (!validarGitHub(githubInput.value)) {
        mostrarErroInput(githubError);
        isValid = false;
    } else {
        limparErroInput(githubError);
    }

    // Se tudo estiver válido
    if (isValid) {

        localStorage.setItem('nome', nomeInput.value);
        localStorage.setItem('email', emailInput.value);
        localStorage.setItem('github', githubInput.value);

        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function () {
            localStorage.setItem('foto', reader.result);
            window.location.href = '../pages/ticket.html';
        };

        reader.readAsDataURL(file);

    }
});



