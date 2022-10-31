const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
	mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

const campos = {
	apellido: false,
    nombre: false,
	mail: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "apellido":
			validarCampo(expresiones.apellido, e.target, 'apellido');
		break;
		case "mail":
			validarCampo(expresiones.mail, e.target, 'mail');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo-${campo}`).classList.remove('formulario-grupo-incorrecto');
		document.getElementById(`grupo-${campo}`).classList.add('formulario-grupo-correcto');
		document.querySelector(`#grupo-${campo} i`).classList.add('fa-circle-check');
		document.querySelector(`#grupo-${campo} i`).classList.remove('fa-circle-xmark');
		document.querySelector(`#grupo-${campo} .formulario-input-error`).classList.remove('formulario-input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo-${campo}`).classList.add('formulario-grupo-incorrecto');
		document.getElementById(`grupo-${campo}`).classList.remove('formulario-grupo-correcto');
		document.querySelector(`#grupo-${campo} i`).classList.add('fa-circle-xmark');
		document.querySelector(`#grupo-${campo} i`).classList.remove('fa-circle-check');
		document.querySelector(`#grupo-${campo} .formulario-input-error`).classList.add('formulario-input-error-activo');
		campos[campo] = false;
	}
}


inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();
	if(campos.nombre && campos.apellido && campos.mail){
		formulario.reset();

		document.getElementById('formulario-menzaje-exito').classList.add('formulario-menzaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario-menzaje-exito').classList.remove('formulario-menzaje-exito-activo');
		}, 5000);

		document.querySelectorAll('formulario-grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario-grupo-correcto');
		});
	} else {
		document.getElementById('formulario-menzaje').classList.add('formulario-menzaje-activo');
	}
});