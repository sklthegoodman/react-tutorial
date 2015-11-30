/**
 * Created by wrynnsun on 15/11/29.
 */
var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
var ProductCategoryRow = React.createClass({
  render:function(){
    return (
      <tr>
        <th colSpan="2">{this.props.category}</th>
      </tr>
    )
  }
});
var ProductRow = React.createClass({
  render:function(){
    var name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color:'red'}}>
        {this.props.product.name}
      </span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    )
  }
});
var ProductTable = React.createClass({
  render:function(){
    var row = [];
    var lastCategory = null;
    this.props.products.forEach(function(product){
      if(product.category != lastCategory){
        row.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      row.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    });
    return (
      <table>
        <thead>
          <th>Name</th>
          <th>Price</th>
        </thead>
        <tbody>{row}</tbody>
      </table>
    )
  }
});
var SearchBar = React.createClass({
  handleClick:function(){
    var checkbox = document.getElementById('checkBox');
    var checked = checkbox.checked;
    this.props.onchange(checked);
  },
  render:function(){
    return(
      <form>
        <input type="text" placeholder="please enter some information" />
        <p>
          <input type="checkbox" id="checkBox" onClick={this.handleClick}/>
          {' '}
          Only show product in stock
        </p>
      </form>
    );
  }
});
var FilterableProductTable = React.createClass({
  changeHandle:function(checked){
    if(checked){
      var products = [];
      this.props.products.forEach(function(product){
        if(product.stocked){
          products.push(product);
        }
      });
      this.setState({
        products:products
      });
    }else{
      this.setState({
        products:this.props.products
      });
    }
  },
  getInitialState:function(){
    return {
      products:this.props.products
    }
  },
  render: function() {
    return (
      <div>
        <SearchBar onchange={this.changeHandle}/>
        <ProductTable products={this.state.products} />
      </div>
    );
  }
});
ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('container')
);
