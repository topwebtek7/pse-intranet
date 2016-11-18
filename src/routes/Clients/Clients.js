import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import ClientsList from './Components/DataList'
import SearchForm from './Components/SearchForm'
import ClientInfo from './Components/ClientInfo'

import {getClientsList, showModalFunc} from './Modules/module'

class ClientsTab extends React.Component {

  static propTypes = {
    getClientsList: PropTypes.func.isRequired,
    showModalFunc: PropTypes.func.isRequired,
    client_id: PropTypes.string,
    before_client_id: PropTypes.number
  };

  constructor(props) {
    super(props)

    this.submitSearch = this.submitSearch.bind(this)
    this.addNewClient = this.addNewClient.bind(this)
  }

  submitSearch(param){
    let parameters = {}
    param.map(function(p){
      if(p.value != '') {
        parameters[p.key] = p.value
      }
    })
    this.props.getClientsList(parameters)
  }

  addNewClient(e){
    if (e){
      e.preventDefault()
    }

    this.props.showModalFunc('new')
  }

  render () {
    return (
      <div className='clients-page'>
        <div className='container-fluid'>
          <div className='panel panel-default'>
            <div className='panel-body'>

              <div className='add-new-client-btn visible-xs visible-sm'>
                <a href='' onClick={e => this.addNewClient(e)} className='pull-right text-right'>
                  <h3><span>+</span><span className='add-new-client-text'>Add New</span></h3>
                </a>
              </div>

              <div className='col-md-3 left-column'>
                <SearchForm searchSubmitFunc={this.submitSearch} />
                <ClientsList />
              </div>

              <div className='col-md-9 right-column'>
                { this.props.client_id ? <ClientInfo client_id={parseInt(this.props.client_id)} /> : null }
              </div>

            </div>
          </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, {params}) => ({
  client_id: params.ClientId ? params.ClientId : null,
  before_client_id: state.clients.client_id
})

export default withRouter(connect((mapStateToProps), {
  getClientsList,
  showModalFunc
})(ClientsTab))
