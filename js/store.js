let criterios=["Sin ordenar","Ascendente por precio", "Descendente por precio"]
let objetoCarro;
function creaListaCriterios(){
	let selectId =document.getElementById("criteriosOrdenacion");
	selectId.onchange = pintaArticulos;
	let casilla , texto;
	criterios.forEach((e , index) => {
		casilla = document.createElement('option');
		casilla.value = "opcion" + index;
		texto = document.createTextNode(e);
		casilla.appendChild(texto);
		selectId.appendChild(casilla);
	});
}


function pintaArticulos(){		
	let copiaArticulos = listaArticulos.slice(0);
	if(this.value == "opcion1") {
		copiaArticulos.sort((a , b) => a.precio - b.precio);
	} else if(this.value == "opcion2") {
		copiaArticulos.sort((a , b) => b.precio - a.precio);
	}
	let texto ="";
	let containerArticulos = document.getElementById('container');
	containerArticulos.innerHTML="";		
	copiaArticulos.forEach(e => {			
		texto += `<div class="col80">
					<div class="card">
						<img src="./assets/${e.codigo}.jpg" class="foto">
						<div class="card-body">
							<h5 class="card-title">${e.nombre}</h5>
							<p class="card-text">${e.descripcion}</p>
							<b>
								<p class="card-text text-center">${e.precio}$</p>
							</b>
						</div>
						<button id="${e.codigo}" class="btn-success">comprar</button>
					</div>
				</div>`;						
	})
	containerArticulos.innerHTML =  texto;
	Array.from(containerArticulos.getElementsByTagName('button')).forEach(e=> e.addEventListener("click",ponArticuloEnCarrito));

}


function ponArticuloEnCarrito(){
	objetoCarro.anyadeArticulo(listaArticulos[listaArticulos.findIndex(e=> e.codigo == this.id)]);
}


function verCarro(){
	let dialogo = document.getElementById('miDialogo');
	if(dialogo.open) dialogo.close();
	 dialogo.showModal();
	let tabla = document.getElementById('dialogContent');
	tabla.innerHTML = "";
	document.getElementById('total').innerHTML ="";
	let texto ="";
	let total = 0;
	if(objetoCarro.verCarrito().length == 0) {
		texto+= "<h2>Carrito vacío</h2><p>Añade articulos a tu carrito</p>"
		tabla.innerHTML = texto;
		document.getElementById('total').innerHTML = total + " $";
	} else {
		texto ="<table><tbody><tr><td>nombre<td>descripcion<td>precio<td>unidades<td>total<td>";
		objetoCarro.verCarrito().forEach((e, i)=> {
		texto += `<tr>
					<td><img src="./assets/${e.codigo}.jpg" style="width:62px">
					<td>${e.nombre}
					<td>${e.descripcion}
					<td>${e.precio}
					<td>${e.unidades}
					<td>${e.unidades*e.precio}
					<td id="${i}">
						<button class="sumar">+</button>
						<button class="restar">-</button>
						<button class="borrar" style="background-color:indianred">Borrar</button></td>`;
		total += e.unidades * e.precio;
		});
	texto+= `</tbody></table>`;
	tabla.innerHTML = texto;
	document.getElementById('total').innerHTML = total + " $";
	Array.from(tabla.getElementsByClassName('sumar')).forEach(e=> e.addEventListener('click', evento => {
		objetoCarro.modificaUnidades(parseInt(evento.target.parentNode.id), 1);
	}));		
	Array.from(tabla.getElementsByClassName('restar')).forEach(e=>e.onclick = () => objetoCarro.modificaUnidades(parseInt(e.parentNode.id), -1));		
	Array.from(tabla.getElementsByClassName('borrar')).forEach(e=>e.onclick = () => objetoCarro.borraArticulo(parseInt(e.parentNode.id)));
	}
}

function efectuaPedido(){
	console.log(JSON.stringify(objetoCarro));
	document.getElementById('miDialogo').close();
	objetoCarro.articulos.length = 0;	
}

window.onload=()=>{
	creaListaCriterios();
	objetoCarro = new Carrito(444444);
	let navCollection = document.getElementsByClassName('navbar');
	let imgCollection = navCollection[0].getElementsByTagName('img');		
	imgCollection[0].onclick = verCarro;
	pintaArticulos("opcion0");
	document.getElementById('idPedido').innerHTML = objetoCarro.id;
	document.getElementById('btnCierraDialog').onclick = ()=> {document.getElementById('miDialogo').close()};
	document.getElementById('btnEfectuaPedido').onclick = efectuaPedido;
}