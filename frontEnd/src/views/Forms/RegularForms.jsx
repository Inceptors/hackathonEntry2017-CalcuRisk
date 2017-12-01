import React, { Component } from 'react';
import{
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, HelpBlock, Form, InputGroup
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';

// import Checkbox from 'elements/CustomCheckbox/CustomCheckbox.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
// import Radio from 'elements/CustomRadio/CustomRadio.jsx';
import axios from 'axios';

class RegularForms extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    onSubmitForm(e) {
        e.preventDefault()
        const values = {
            lname: this.lname.value,
            fname: this.fname.value,
            mname: this.mname.value,
            ebname: this.ebname.value,
            ywork: this.ywork.value,
            nob: this.nob.value,
            id: this.id.value
        }
        axios({
          method: 'post',
          url: 'https://cors-anywhere.herokuapp.com/https://calcurisk-backend.herokuapp.com/add',
          data: {
            key: 'calcurisk',
            mode: 'update',
            update: values
          }
        }).then(res => {
            const data = res.data
            console.log(res.data)
        });
    }

    render(){
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Enter customer details"
                                content={
                                    <Form horizontal onSubmit={this.onSubmitForm.bind(this)}>
                                        <FormGroup className="col-md-12">
                                            <ControlLabel  className="col-md-2">
                                                Last Name
                                            </ControlLabel>
                                            <Col md={2}>
                                                <FormControl inputRef={ref => { this.lname = ref; }}
                                                    placeholder="Last Name"
                                                    type="text"
                                                />
                                            </Col>
                                            <ControlLabel className="col-md-2">
                                                First Name
                                            </ControlLabel>
                                            <Col md={2}>
                                                <FormControl inputRef={ref => { this.fname = ref; }}
                                                    placeholder="First Name"
                                                    type="text"
                                                />
                                            </Col>
                                            <ControlLabel className="col-md-2">
                                                Middle Name
                                            </ControlLabel>
                                            <Col md={2}>
                                                <FormControl inputRef={ref => { this.mname = ref; }}
                                                    placeholder="Middle Name"
                                                    type="text"
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup className="col-md-12">
                                            <ControlLabel  className="col-md-4">
                                                Employer / Business Name
                                            </ControlLabel>
                                            <Col md={4}>
                                                <FormControl inputRef={ref => { this.ebname = ref; }}
                                                    placeholder="Employer / Business Name"
                                                    type="text"
                                                />
                                            </Col>
                                            <ControlLabel className="col-md-2">
                                                Years at work
                                            </ControlLabel>
                                            <Col md={2}>
                                                <FormControl inputRef={ref => { this.ywork = ref; }}
                                                    placeholder="Years at work"
                                                    type="text"
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup className="col-md-12">
                                            <ControlLabel  className="col-md-4">
                                                Nature of Business
                                            </ControlLabel>
                                            <Col md={4}>
                                                <FormControl inputRef={ref => { this.nob = ref; }}
                                                    placeholder="Nature of Business"
                                                    type="text"
                                                />
                                            </Col>
                                            <ControlLabel className="col-md-2">
                                                ID Presented
                                            </ControlLabel>
                                            <Col md={2}>
                                                <FormControl inputRef={ref => { this.id = ref; }}
                                                    placeholder="ID Presented"
                                                    type="text"
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <Col md={4} mdOffset={5}>
                                                <Button bsStyle="info" fill type="submit">
                                                    Submit
                                                </Button>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default RegularForms;



// WEBPACK FOOTER //
// ./src/views/Forms/RegularForms.jsx
