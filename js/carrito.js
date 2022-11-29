class Carrito{
	constructor(id){	
		this.id = id;
		this.articulos = [];
	}
	
	indiceArticulo(codigo) {
		return this.articulos.findIndex(e => 
			codigo == e.codigo);
	}

	anyadeArticulo(articulo){
		let indice = this.indiceArticulo(articulo.codigo);
		if(indice >= 0) {
			this.articulos[indice].unidades++;
		} else {
			articulo.unidades = 1;
			this.articulos.push(articulo);
		};
	}			
				
	borraArticulo(indice){				
		this.articulos.splice(indice, 1);
		verCarro();
	}
	
	modificaUnidades(indice, n){	
		let unidadesRestantes = this.articulos[indice].unidades;
		if(n == 1) {
			this.articulos[indice].unidades += n;
		}
		else if(n == -1) {
			if(unidadesRestantes == 1) {
				this.borraArticulo(indice);
			} 
			else {
				this.articulos[indice].unidades += n;
			}
		}
		verCarro();
	}	
	
	verCarrito(){
		return this.articulos;
	}		
	
	
}
