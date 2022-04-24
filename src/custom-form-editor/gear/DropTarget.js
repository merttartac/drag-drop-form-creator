import React, {useState} from "react";
import PropTypes from "prop-types";
import * as dropEffects from "./dropEffects";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const insideStyle = {
	backgroundColor: "#cccccc",
	opacity: 0.5,
};

const DropTarget = props => {
	const [isOver, setIsOver] = useState(false);

	const dragOver = ev => {
		ev.preventDefault();
		ev.dataTransfer.dropEffect = props.dropEffect;
	};

	const drop = ev => {
		const droppedItem = ev.dataTransfer.getData("drag-item");
		if (droppedItem) {
			props.onItemDropped(droppedItem);
		}
		setIsOver(false);
	};

	const dragEnter = ev => {
		ev.dataTransfer.dropEffect = props.dropEffect;
		setIsOver(true);
	};

	const dragLeave = () => setIsOver(false);

	return (
			<>
				<div className='drop-list-header'>

					<div style={{position: 'absolute'}}>
						{props.alert &&
						<div className='alert-box fade-out'>
							{props.alert.message}
						</div>}
					</div>

					<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
						<FontAwesomeIcon icon='search' color='#ffffff' size='2x'
										 style={{padding: '3px', margin: '0 10px', cursor: 'pointer'}}
										 onClick={() => props.previewForm()}/>
						<button onClick={() => props.onSubmitForm()}>Kaydet</button>
					</div>
				</div>

				<div
						onDragOver={dragOver}
						onDrop={drop}
						onDragEnter={dragEnter}
						onDragLeave={dragLeave}
						style={{width: "100%", height: "100%", ...(isOver ? insideStyle : {})}}
				>
					{props.children}
				</div>
			</>
	);
};

DropTarget.propTypes = {
	onItemDropped: PropTypes.func.isRequired,
	dropEffect: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

DropTarget.defaultProps = {
	dropEffect: dropEffects.All,
};

export default DropTarget;