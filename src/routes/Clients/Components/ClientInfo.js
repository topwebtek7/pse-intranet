import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import AddNewClientForm from '../../../components/ModalForm/addNewClientForm'
import { createClient, closeModalFunc, getClientInfo, showModalFunc } from '../Modules/module'

class ClientInfo extends React.Component {

  static propTypes = {
    'client_id': PropTypes.number,
    'before_client_id': PropTypes.number,
    'client_info': PropTypes.object,
    'loading_client': PropTypes.bool,
    'showModalFlag': PropTypes.bool,
    'formData': PropTypes.object,
    'readOnly': PropTypes.bool,
    'showModalFunc': PropTypes.func.isRequired,
    'createClient': PropTypes.func.isRequired,
    'closeModalFunc': PropTypes.func.isRequired,
    'getClientInfo': PropTypes.func.isRequired
  };

  componentWillReceiveProps(newProps){
    if (newProps.client_id && (newProps.client_id != newProps.before_client_id) && !isNaN(newProps.client_id)){
      newProps.getClientInfo(newProps.client_id)
    }
  }

  constructor(props) {
    super(props)

    this.addNewClient = this.addNewClient.bind(this)
    this.closeModalHandler = this.closeModalHandler.bind(this)
    this.submitModal = this.submitModal.bind(this)

    if (props.client_id && ((Object.keys(props.client_info).length === 0) || (props.before_client_id != props.client_id)) && !isNaN(props.client_id)){
      this.props.getClientInfo(props.client_id)
    }
  }

  closeModalHandler(){
    this.props.closeModalFunc()
  }

  addNewClient(e) {
    if (e){
      e.preventDefault()
    }

    this.props.showModalFunc('new')
  }

  submitModal(name) {

    this.props.createClient(name)

  }

  render () {
    const loading = this.props.loading_client ? <div className='contacts-loading loading-container' >
      <i className='fa fa-spinner fa-pulse fa-3x fa-fw' /><span className='sr-only'>Loading...</span></div> : null
    let phoneNumbers, emailAddresses, addresses, notes

    if (Object.keys(this.props.client_info).length > 0){

      phoneNumbers = this.props.client_info.phones ? (<div className='phone-number-container info-container'>
        <h4>Client Phone Numbers</h4>
        {this.props.client_info.phones.map((one, index) => (
          <div key={index} id={one.id}>{one.number} - {one.type.type}</div>
        ))}
      </div>) : null
      emailAddresses = this.props.client_info.emails ? (<div className='email-addresses-container info-container'>
        <h4>Client Email Addresses</h4>
        {this.props.client_info.emails.map((one, index) => (
          <div key={index} id={one.id}>{one.email} - {one.type.type}</div>
        ))}
      </div>) : null

      addresses = this.props.client_info.addresses ? (<div className='addresses-container info-container'>
        <h4>Client Addresses</h4>
        {this.props.client_info.addresses.map((one, index) => (
          <div key={index} id={one.id}>{one.address_line0} {one.address_line1} {one.city}, {one.state} {one.zip_code} - {one.type.type}</div>
        ))}
      </div>) : null

      console.log(this.props.client_info.notes)

      notes = this.props.client_info.notes ? (<div className='notes-container info-container'>
        <h4>Client Notes</h4>
        {this.props.client_info.notes.map((one, index) => (
          <div key={index} id={one.id}>
            <div className='row'>
              <div className='col-sm-7 col-md-auto'>
                <textarea type='text' className='' placeholder='Note' value={one.note} readOnly={this.props.readOnly} />
              </div>
              <div className='col-sm-5 col-md-auto'>
                <input type='text' className='' placeholder='Type' value={one.type.type} readOnly={this.props.readOnly} />
              </div>
            </div>
          </div>
        ))}
      </div>) : null

    }

    return (
      <div id='client_info_section'>
        <div className='top-right-section row'>
          <div className='client-name col-sm-6'>
            { this.props.client_info.name &&
            <h3 className='name'>{this.props.client_info.name}</h3>
            }
          </div>
          <div className='add-new-client-btn col-sm-6 hidden-sm hidden-xs'>
            <a href='' onClick={e => this.addNewClient(e)}>
              <h3><span>+</span><span className='add-new-client-text'>Add New</span></h3>
            </a>
          </div>
          <AddNewClientForm show={this.props.showModalFlag} formData={this.props.formData}
                            submitFunc={this.submitModal} closeFunc={this.closeModalHandler} />
        </div>

        { loading }
        { Object.keys(this.props.client_info).length > 0 &&
        <div className='right-middle-section'>
          <div>

            { notes }

            { phoneNumbers }

            { emailAddresses }

            { addresses }

          </div>
        </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  'client_info': state.clients.client_info,
  'showModalFlag': state.clients.showModalFlag,
  'formData': state.clients.formData,
  'loading_client': state.clients.loading_client,
  'before_client_id': state.clients.client_id,
  'readOnly': state.clients.readOnly
})

export default connect((mapStateToProps), {
  showModalFunc,
  createClient,
  closeModalFunc,
  getClientInfo
})(ClientInfo)
