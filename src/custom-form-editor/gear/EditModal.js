import React from "react";
import {Modal} from "react-bootstrap";

export default function EditModal(props) {
	return (
			<Modal show={props.show} onHide={props.hide}>
				<Modal.Header closeButton>
					{props.selectedItem.item.properties.title + ' Özellikleri'}
				</Modal.Header>

				<Modal.Body>
					{props.children}
				</Modal.Body>

			</Modal>
	)
}