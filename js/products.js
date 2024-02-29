class Product {
    constructor(id, img, name, description, price) {
      this.id = parseInt(id);
      this.img = img;
      this.name = name;
      this.description = description;
      this.price = parseFloat(price);
      this.quantity = 1;
    }
    addQty(value){
        this.quantity+= value;
    }
    subTotal(){
        return this.price * this.quantity;                
    }
  }
  

