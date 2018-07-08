import React, {Component} from 'react';

class Searchbar extends Component{
    constructor(){
        super();
        this.state  = {text:""}
    }

     handleTextChange (event) {
      console.log("textchange",event.target.value)
       this.setState({text:event.target.value});
     }

    render(){
        
        
        return(
            <div className="row">
            <div className="col-md-12">
                <h2>search field</h2>
                <div id="custom-search-input">
                    <div className="input-group col-md-12">
                        <input type="text" className="form-control input-lg" placeholder="search here product by SKU" onChange={this.handleTextChange.bind(this)} />
                        <span className="input-group-btn">
                            <button className="btn btn-info btn-lg" type="button" onClick={this.props.handleTextSearch(this.state.text)}>
                                <i className="glyphicon glyphicon-search"></i>
                            
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>    
        )
    }
}

export default Searchbar;

