import React from "react";
import PropTypes from "prop-types";
import * as dropEffects from "./dropEffects";

const draggingStyle = {
	opacity: 0.50,
};

const Drag = props => {
	const [isDragging, setIsDragging] = React.useState(false);

	const startDrag = ev => {
		setIsDragging(true);
		ev.dataTransfer.setData("drag-item", props.dataItem);
		ev.dataTransfer.effectAllowed = props.dropEffect;
	};

	const dragEnd = () => setIsDragging(false);

	return (
		<div style={isDragging ? draggingStyle : {}} draggable onDragStart={startDrag} onDragEnd={dragEnd} className='drag'>
			{props.children}
		</div>
	);
};

Drag.propTypes = {
	dataItem: PropTypes.string.isRequired,
	dropEffect: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

Drag.defaultProps = {
	dropEffect: dropEffects.All,
};

export default Drag;