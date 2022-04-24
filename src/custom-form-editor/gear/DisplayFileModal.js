import React from "react";
import {Modal} from "react-bootstrap";

export default function DisplayFileModal(props) {
	return (
			<Modal show={props.show} onHide={props.hide} size='lg'>
				<Modal.Header closeButton />

				<Modal.Body>
					<iframe style={{width: '100%', minWidth: '440px', minHeight: '600px'}} src={props.file.data}/>
				</Modal.Body>

			</Modal>
	)
}