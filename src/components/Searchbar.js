import React, {Component} from 'react';
import axios from 'axios';

class Searchbar extends Component{
    constructor(){
        super();
        this.state  = {text:""}                    
    }

     handleTextChange (event) {
      const searchtxt=this.refs.seachsku.value
      const url='http://localhost:3002/api/v1/marmeto/products/search?searchtext='+searchtxt;
      axios.get(url).then(res =>{
        this.setState({
          searchresult:res.data
        })
      this.props.handles(this.state.searchresult);
      alert(JSON.stringify(this.state.searchresult));
      })
    }
     render(){
        const parentstyle={
            float:'none',
            backgroundColor:'#e7e7e7'
        }
        return (
            <div className="row" style={parentstyle}>
                <div className="search-container">
                  <div className="form-inline">
                      <div className="form-group">
                        <input type="text" ref='seachsku' className="form-control seachsku"  placeholder="Search By SKU" />
                      </div>
                      <button type="submit" className="btn btn-default submitbtn" onClick={this.handleTextChange.bind(this)}>Submit</button>
                  </div>

                  </div>
                  </div>
               );
        
      
    }
}

export default Searchbar;

