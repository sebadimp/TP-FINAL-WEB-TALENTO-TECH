const formulario = document.getElementById('form')
formulario.addEventListener('submit',validarForm)

async function validarForm(evento){
    evento.preventDefault();

    const form = new FormData(this)

    //validacion usuario
    var usuario=form.get('nombre');
    if (usuario.length==0) {
        alert('Ingrese un nombre y apellido.');
        return;    
    }else{
        //validacion email
        var email = form.get('email')
        if (email.length < 4 || email.length==0 ) {
        alert('El mail no tiene el formato correcto');
        return;
        }else{
            //validacion categoria
            if (document.contacto.producto.selectedIndex==0){
                alert("Debe seleccionar un producto para su consulta.")
                document.contacto.categoria.focus()
                return 0;
            }else{
                //validacion consulta
                var consulta = form.get('mensaje')
                if(consulta.length==0){
                    alert('Debe Completar el mensaje');
                    return;  
                }else{
                    const response = await fetch(this.action,{
                        method: this.method,
                        body:form,
                        headers:{
                            'Accept': 'application/json'
                        }
                    })
                    if(response.ok){
                        this.reset()
                        alert('Consulta Enviada! Gracias por comunicarte con nosotros.');
                    }
                }
            }
        }
    }
}