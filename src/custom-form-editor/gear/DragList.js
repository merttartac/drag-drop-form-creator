import React from "react";
import Drag from "./Drag";
import * as comps from './draggableComponents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function DragList(props) {
	return (
		<div style={{minHeight: '100vh'}}>
			{comps.list.map(item => (
				<Drag key={item.name} dataItem={JSON.stringify(item)} dropEffect="link">
					<div className="draggable-item">
						<FontAwesomeIcon icon={item.properties.icon} size='2x' color='#72a0c7'/>
						<p>{item.properties.title}</p>
					</div>
				</Drag>
			))}
		</div>
	);
};