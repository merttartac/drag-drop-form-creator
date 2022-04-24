import React from "react";

export function DraggablePanel (props)  {
	return (
		<div id='draggable-panel' className='draggable-panel-container'>
			{props.children}
		</div>
	);
}