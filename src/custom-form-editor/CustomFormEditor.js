import React from "react";
import DragList from "./gear/DragList";
import DropList from "./gear/DropList";

function CustomFormEditor() {
	return (
			<div>
				<div className="row" style={{margin: 0, padding: 0}}>
					<div className="col-8 drag-drop-list-container">
						<div className='drop-list'>
							<DropList/>
						</div>
					</div>
					<div className="col-4 drag-drop-list-container">
						<div className='drag-list'>
							<DragList/>
						</div>
					</div>
				</div>
			</div>
	);
}

export default CustomFormEditor;