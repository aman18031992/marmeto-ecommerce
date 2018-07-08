import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Products from './components/Products';
import Searchbar from './components/Searchbar'
import './scss/style.scss';
import QuickView from './components/QuickView';
import ReactPaginate from 'react-paginate';

class App extends Component{
	constructor(){
		super();
		this.state = {
			products: [], 
			quickViewProduct:{},
			totalpage:0,
			limit:20
		};
	   this.openModal = this.openModal.bind(this);
	  this.closeModal = this.closeModal.bind(this);	
	  this.handlePageChange =this.handlePageChange.bind(this);
	  this.handleSearch   = this.handleSearch.bind(this);
	} 
	// F     etch Initial Set of Products from external API
	getProducts(page){
	
		axios.get("http://localhost:3002/api/v1/marmeto/products?limit="+this.state.limit+"&page="+page)
			.then(response => {
				console.log("getting response", response.data);
				this.setState({
					products : response.data.products,
					totalpage:response.data.count
				})
			}).catch((err)=>{
				console.log("error while fetching data : ",err);
			})
	}
	componentWillMount(){
		this.getProducts(1);
	}
   
     openModal(product){
		this.setState({
			quickViewProduct: product,
			modalActive: true
		})
	}
	// Close Modal
	closeModal(){
		this.setState({
			modalActive: false
		})
	}
	
   handlePageChange(page) {
   // this.getProducts(page,100);
      
      console.log("page===",page.selected)
      this.getProducts(page.selected+1);
   }

   handleSearch(searchText) {
   	
      console.log("searchText",searchText);
      axios.get('/find/product',{},)
   }

   

	render() {
	
		return (
			      
			<div className="container">
				<Searchbar handleTextSearch={this.handleSearch}/>
				<Products productsList={this.state.products} openModal={this.openModal}  />
				<QuickView product={this.state.quickViewProduct} openModal={this.state.modalActive} closeModal={this.closeModal} />	
				
		 

        <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageCount={Math.ceil(this.state.totalpage/this.state.limit)}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={4}
                       onPageChange={this.handlePageChange}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
					
			</div>
		)
	}

}

ReactDOM.render(
	<App />,
  	document.getElementById('root')
);

