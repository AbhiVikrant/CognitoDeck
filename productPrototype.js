// WAP to create a product prototype for a product object with name, quantity and price. Add a method to product prototype to cal
// culate total value

function Product(name,price,quantity)
{
    this.name=name;
    this.price=price;
    this.quantity=quantity;
}

Product.prototype.getValue= function()
{
    return this.quantity*this.price;
}

const product1=new Product('rr',5,10);
console.log(product1.getValue());

