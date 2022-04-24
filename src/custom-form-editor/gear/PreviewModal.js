import React, {useCallback, useEffect, useRef, useState} from "react";
import {Modal} from "react-bootstrap";

export default function PreviewModal(props) {

	const [state, setState] = useState({
		sheetMinHeight: '5px',
		headerSize: '5px',
		previewItems: []
	});

	useEffect(() => {
		handler();
	}, []);

	const handler = useCallback(
		() => {
			let width = document.getElementById('sheet').offsetWidth;
			let height = (width * 1.281098546042003);
			let sheetMinHeight = height.toString() + 'px';
			let fontSize = (height * 0.018).toString() + 'px';
			let textLineHeight = (height * 0.0167267159070438).toString() + 'px';
			let textDivPadding = (height * 0.0055755719690146).toString() + 'px 0';
			let textAreaDivPadding = (height * 0.0167267159070438).toString() + 'px 0';
			let imgDim = (height * 0.1773031886146641).toString() + 'px';

			let styleSet = {
				sheetMinHeight: sheetMinHeight,
				heading: {
					headerSize: fontSize,
					mainContainerPadding: '2%'
				},
				text: {
					textSize: fontSize,
					lineHeight: textLineHeight,
					divPadding: textDivPadding,
					textAreaDivPadding: textAreaDivPadding
				},
				image: {
					boxDimensions: {width: imgDim, height: imgDim}
				}
			};

			let temp = [];
			props.items.map(item => {
				let previewBlock = generatePreviewBlock(item, styleSet);
				temp.push(previewBlock);
			});
			setState({...state, sheetMinHeight, fontSize, previewItems: temp})
		},
		[setState]
	);

	useEventListener('resize', handler);

	function useEventListener(eventName, handler, element = window) {
		// Create a ref that stores handler
		const savedHandler = useRef();

		// Update ref.current value if handler changes.
		// This allows our effect below to always get latest handler ...
		// ... without us needing to pass it in effect deps array ...
		// ... and potentially cause effect to re-run every render.
		useEffect(() => {
			savedHandler.current = handler;
		}, [handler]);

		useEffect(
			() => {
				// Make sure element supports addEventListener
				// On
				const isSupported = element && element.addEventListener;
				if (!isSupported) return;

				// Create event listener that calls handler function stored in ref
				const eventListener = event => savedHandler.current(event);

				// Add event listener
				element.addEventListener(eventName, eventListener);

				// Remove event listener on cleanup
				return () => {
					element.removeEventListener(eventName, eventListener);
				};
			},
			[eventName, element] // Re-run if eventName or element changes
		);
	}

	const generatePreviewBlock = useCallback(
		(item, styleSet) => {
			switch (item.name) {
				case 'heading' :
					return (
						<div style={{textAlign: 'center', padding: styleSet.heading.mainContainerPadding, borderBottom: 'solid 1px #dedede'}}>
							{item.properties.sections[0].elements.map(element => {
								return element.content ?
									<h4 style={{fontSize: styleSet.heading.headerSize}}>{element.content}</h4>
									:
									<h4 style={{
										fontSize: styleSet.heading.headerSize,
										textDecoration: 'underline'
									}}>Başlık</h4>
							})}
						</div>
					);
				case 'radio' :
				case 'checkbox':
					return (
						<div style={{textAlign: 'center', padding: styleSet.heading.mainContainerPadding, borderBottom: 'solid 1px #dedede'}}>
							{item.properties.sections[0].elements.map(element => {
								return (
									<div>
										{element.type === 'text-area' &&
										<div style={{
											width: '100%',
											padding: styleSet.text.textAreaDivPadding
										}}>
											{element.content ?
												<p style={{
													margin: 0,
													wordBreak: 'break-all',
													lineHeight: styleSet.text.lineHeight,
													fontSize: styleSet.text.textSize
												}}>{element.content}</p>
												:
												<p style={{
													margin: 0,
													wordBreak: 'break-all',
													lineHeight: styleSet.text.lineHeight,
													fontSize: styleSet.text.textSize
												}}>
													{element.type === 'radio-button' ? 'Tekli ' : 'Çoklu '} Seçim
													Metin İçeriği Girilmemiş
												</p>}
										</div>}

										{(element.type === 'radio-button' || element.type === 'checkbox') &&
										<div style={{
											display: 'flex',
											flexDirection: 'row',
											alignItems: 'center'
										}}>
											{element.replied ?
												<span style={{
													padding: '0 5px',
													fontSize: styleSet.text.textSize
												}}>&#9746;</span>
												:
												<span style={{
													padding: '0 5px',
													fontSize: styleSet.text.textSize
												}}>&#9744;</span>}

											{element.content ?
												<div style={{
													width: '100%',
													padding: styleSet.text.divPadding,
													textAlign: 'left'
												}}>
													<p style={{
														margin: 0,
														lineHeight: styleSet.text.lineHeight,
														wordBreak: 'break-all',
														fontSize: styleSet.text.textSize
													}}>{element.content}</p>
												</div>
												:
												<div style={{
													width: '100%',
													padding: styleSet.text.divPadding,
													textAlign: 'left'
												}}>
													<p style={{
														margin: 0,
														lineHeight: styleSet.text.lineHeight,
														wordBreak: 'break-all',
														fontSize: styleSet.text.textSize
													}}>
														{element.type === 'radio-button' ? 'Tekli ' : 'Çoklu '} Seçim
														İçeriği Girilmemiş
													</p>
												</div>}
										</div>}
									</div>
								)
							})}
						</div>
					);
				case 'text-input':
				case 'date':
					return (
						<div style={{
							padding: styleSet.heading.mainContainerPadding,
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
							borderBottom: 'solid 1px #dedede'
						}}>
							{item.properties.sections[0].elements.map(element => {
								return (
									<div style={{
										display: 'flex',
										flexDirection: 'row',
										width: '50%',
										alignItems: 'center',
										padding: '0 3%'
									}}>
										{element.label ?
											<div style={{
												width: '100%',
												padding: styleSet.text.divPadding,
												textAlign: 'left'
											}}>
												<p style={{
													margin: 0,
													lineHeight: styleSet.text.lineHeight,
													wordBreak: 'break-all',
													fontSize: styleSet.text.textSize
												}}>
													{element.label} :
												</p>
											</div>
											:
											<div style={{
												width: '100%',
												padding: styleSet.text.divPadding,
												textAlign: 'left'
											}}>
												<p style={{
													margin: 0,
													lineHeight: styleSet.text.lineHeight,
													wordBreak: 'break-all',
													fontSize: styleSet.text.textSize
												}}>
													{element.type === 'text-input' && 'Metin Satırı Etiketi :'}
													{element.type === 'date' && 'Tarih Etiketi :'}
												</p>
											</div>}

										{element.content ?
											<div style={{
												width: '100%',
												padding: styleSet.text.divPadding,
												textAlign: 'left'
											}}>
												<p style={{
													margin: 0,
													lineHeight: styleSet.text.lineHeight,
													wordBreak: 'break-all',
													fontSize: styleSet.text.textSize
												}}>
													{element.content}
												</p>
											</div>
											:
											<div style={{
												width: '100%',
												padding: styleSet.text.divPadding,
												textAlign: 'left'
											}}>
												<p style={{
													margin: 0,
													lineHeight: styleSet.text.lineHeight,
													wordBreak: 'break-all',
													fontSize: styleSet.text.textSize
												}}>
													{element.type === 'text-input' && ' --- '}
													{element.type === 'date' && ' GG/AA/YYYY '}
												</p>
											</div>}
									</div>
								)
							})}
						</div>
					);
				case 'text-area':
					return (
						<div style={{textAlign: 'center', padding: styleSet.heading.mainContainerPadding, borderBottom: 'solid 1px #dedede'}}>
							{item.properties.sections[0].elements.map(element => {
								return (
									<div>
										{element.type === 'text-area' &&
										<div style={{
											width: '100%',
											padding: styleSet.text.textAreaDivPadding
										}}>
											{element.label ?
												<p style={{
													margin: 0,
													wordBreak: 'break-all',
													lineHeight: styleSet.text.lineHeight,
													fontSize: styleSet.text.textSize
												}}>{element.label}</p>
												:
												<p style={{
													margin: 0,
													wordBreak: 'break-all',
													lineHeight: styleSet.text.lineHeight,
													fontSize: styleSet.text.textSize
												}}>
													Metin Alanı Açıklama İçeriği Girilmemiş
												</p>
											}
										</div>}

										{element.type === 'text-area' &&
										<div style={{
											width: '100%',
											padding: styleSet.text.textAreaDivPadding
										}}>
											{element.content ?
												<p style={{
													margin: 0,
													wordBreak: 'break-all',
													lineHeight: styleSet.text.lineHeight,
													fontSize: styleSet.text.textSize
												}}>{element.content}</p>
												:
												<p style={{
													margin: 0,
													wordBreak: 'break-all',
													lineHeight: styleSet.text.lineHeight,
													fontSize: styleSet.text.textSize
												}}>
													Metin Alanı İçeriği Girilmemiş
												</p>}
										</div>}
									</div>
								)
							})}
						</div>
					)
				case 'image':
					return (
						<div style={{
							padding: styleSet.heading.mainContainerPadding,
							width: '100%',
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							flexWrap: 'wrap',
							borderBottom: 'solid 1px #dedede'
						}}>
							{item.properties.sections[0].elements.map(element => {
								return (
									<div style={{
										display: 'flex',
										flexDirection: 'row',
										width: '100%',
										alignItems: 'start'
									}}>
										{element.image ?
											<img src={element.image}
												 style={styleSet.image.boxDimensions}/>
											:
											<div></div>}
									</div>
								)
							})}
						</div>
					);
				case 'dropdown':
					return (
						<div style={{
							padding: styleSet.heading.mainContainerPadding,
							width: '100%',
							borderBottom: 'solid 1px #dedede'
						}}>
							{item.properties.sections[0].elements.map(element => {
								return (
									<div>
										{element.type === 'text-area' &&
										<div style={{
											width: '100%',
											padding: styleSet.text.textAreaDivPadding
										}}>
											{element.content ?
												<p style={{
													margin: 0,
													wordBreak: 'break-all',
													lineHeight: styleSet.text.lineHeight,
													fontSize: styleSet.text.textSize
												}}>{element.content}</p>
												:
												<p style={{
													margin: 0,
													wordBreak: 'break-all',
													lineHeight: styleSet.text.lineHeight,
													fontSize: styleSet.text.textSize
												}}>
													Açıklama İçeriği Girilmemiş
												</p>}
										</div>}

										{element.type === 'dropdown' &&
										<div style={{
											display: 'flex',
											flexDirection: 'row',
											width: '100%',
											alignItems: 'center'
										}}>
											{element.label ?
												<div style={{
													width: '50%',
													padding: styleSet.text.divPadding,
													textAlign: 'left'
												}}>
													<p style={{
														margin: 0,
														lineHeight: styleSet.text.lineHeight,
														wordBreak: 'break-all',
														fontSize: styleSet.text.textSize
													}}>
														{element.label} :
													</p>
												</div>
												:
												<div style={{
													width: '50%',
													padding: styleSet.text.divPadding,
													textAlign: 'left'
												}}>
													<p style={{
														margin: 0,
														lineHeight: styleSet.text.lineHeight,
														wordBreak: 'break-all',
														fontSize: styleSet.text.textSize
													}}>
														{element.type === 'dropdown' && 'Etiket :'}
													</p>
												</div>}

											{element.content ?
												<div style={{
													width: '50%',
													padding: styleSet.text.divPadding,
													textAlign: 'left'
												}}>
													<p style={{
														margin: 0,
														lineHeight: styleSet.text.lineHeight,
														wordBreak: 'break-all',
														fontSize: styleSet.text.textSize
													}}>
														{element.content}
													</p>
												</div>
												:
												<div style={{
													width: '50%',
													padding: styleSet.text.divPadding,
													textAlign: 'left'
												}}>
													<p style={{
														margin: 0,
														lineHeight: styleSet.text.lineHeight,
														wordBreak: 'break-all',
														fontSize: styleSet.text.textSize
													}}>
														{element.type === 'dropdown' && ' --- '}
													</p>
												</div>}
										</div>}
									</div>
								)
							})}
						</div>
					);

			}
		}, []);

	return (
		<Modal show={props.show} onHide={props.hide} size='lg'>
			<Modal.Header closeButton>
				Form Önizleme
			</Modal.Header>

			<Modal.Body style={{
				background: '#d3d3d3',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				padding: '20px 10px'
			}}>
				<div id='sheet' className='preview-sheet' style={{minHeight: state.sheetMinHeight, padding: '5%'}}>
					<div id='preview-content'>
						{state.previewItems.map(item => {
							return item;
						})}
					</div>
				</div>
			</Modal.Body>
		</Modal>
	)
}