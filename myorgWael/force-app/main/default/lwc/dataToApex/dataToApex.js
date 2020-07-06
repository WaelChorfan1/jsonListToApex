import { LightningElement, track } from 'lwc';
import insertList from '@salesforce/apex/dataToApex.insertList';
import deleteAll from '@salesforce/apex/dataToApex.deleteAll';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class DataToApex extends LightningElement {

    // POST https://data-faker.herokuapp.com/collection
    // POST REQ BODY
    // {"amountOfRecords":5
    // ,"recordMetadata" : {
    //     "name": "name",
    //     "amount": "amount",
    //   "email": "email"
    // }
    // }
    @track myMap = [];

    @track data = [{
        "name": "Benny Marguerite",
        "email": "Marguerite7@gmail.com",
        "id": "66c48660-96f8-4fcc-b95f-92c2d4b9702e"
    }, {
        "name": "Aniyah Bode",
        "email": "Ethelyn91@gmail.com",
    }, {
        "name": "Aniyah Bode",
        "email": "Ethelyn91@gmail.com",
    }, {
        "name": "Oceane Koch",
        "email": "Keagan48@gmail.com",
    }, {
        "name": "Clyde Conn",
        "email": "Willy_Witting85@hotmail.com",
    }, {
        "name": "Talon Wolff",
        "email": "Irma.Marquardt@gmail.com",
    }]
    columns = [
        { label: 'Name', fieldName: 'name' },
        { label: 'Email', fieldName: 'email' }
    ];




    handleSave() {
        let selectedRows = this.template.querySelector('lightning-datatable').getSelectedRows()
        console.log(selectedRows);
        let myList = selectedRows.map(obj => {
            return {
                Name: (obj.name).replace(' ', ''),
                Name__c: obj.name,
                Email__c: obj.email,
            }
        })
        console.log(myList);

        insertList({ myList: myList })
            .then(result => {
                this.showToast(true, 'inserted successfully')
            })
            .catch(error => {
                this.showToast(false, error.body.message)
            })
    }

    handleDelete() {
        deleteAll()
            .then(result => {
                this.showToast(true, 'deleted successfully')
            })
            .catch(error => {
                this.showToast(false, error.body.message)
            })
    }

    // handleDelete() {
    //     let selectedRows = this.template.querySelector('lightning-datatable').getSelectedRows()
    //     this.data = this.data.filter(p => !selectedRows.map(x => x.name).includes(p.name))
    // }



    showToast(ok, msg) {
        const event = new ShowToastEvent({
            "title": ok ? "Success!" : "Failure!",
            "message": msg,
            "variant": ok ? "success" : "error",
            "mode": 'sticky'//dismissable
        });
        this.dispatchEvent(event);
    }


}