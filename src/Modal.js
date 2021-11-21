import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

function ModalExampleModal(props) {
    const [open, setOpen] = React.useState(false)

    if (props.name == "hospitals") {
        return (
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<p>Hospitals Near Me</p>}
            >
                <Modal.Header>Hospitals found withind 3 km radius are listed below</Modal.Header>
                <Modal.Content>
                    {/* <Modal.Description> */}
                    {props.hosp.map((hospital, i) => {
                        return ( 
                            <div>
                                <li key={i}>
                                    <strong>{i + 1}</strong>
                                    <p>{hospital.name}</p>
                                    <p><u>Address : </u>{hospital.address}</p>
                                    <p><u>Contact : </u>{hospital.contact}</p>
                                </li>
                                {/* {hospital} */}
                            </div>
                        )
                    })}
                    {/* </Modal.Description> */}
                </Modal.Content>
                <Modal.Actions>
                    <button class="ui primary button" onClick={() => setOpen(false)}>
                        okay
                    </button>
                </Modal.Actions>
            </Modal>
        )
    } else if(props.name == "diet"){
        return (
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<p>Diet Recommended</p>}
            >
                {/* <Modal.Header>Hospitals found withind 3 km radius are listed below</Modal.Header> */}
                <Modal.Content>
                  {props.diet}
                </Modal.Content>
                <Modal.Actions>
                    <button class="ui primary button" onClick={() => setOpen(false)}>
                        okay
                    </button>
                </Modal.Actions>
            </Modal>
        )
    }
}
export default ModalExampleModal