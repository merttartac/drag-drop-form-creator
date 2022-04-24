import React, {useCallback, useEffect, useState} from "react";
import DropTarget from "./DropTarget";
import {DraggablePanel} from "./DraggablePanel";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import EditModal from "./EditModal";
import {createDefaultOptionByType, generateModalBody, generateSectionBody, onChange, uploadFile} from "./functions";
import Modal from "react-bootstrap/Modal";
import PreviewModal from "./PreviewModal";
import DisplayFileModal from "./DisplayFileModal";

export default function DropList(props) {
	const [state, setState] = useState({
		items: [],
		image: null,
		file: null,
		isEditModalOpen: false,
		isSelectOptionModalOpen: false,
		selectedDropdownItem: {},
		isPreviewModalOpen: false,
		selectedItem: {item: null, index: null},
		alert: null,
		isDisplayFileModalOpen: false
	});

	const itemDropped = item => {
		let droppedItem = JSON.parse(item);
		let items = state.items;
		droppedItem.id = items.length;
		items.push(droppedItem);
		setState({...state, items})
	};

	function removePanel(item) {
		let temp = [...state.items];
		temp = temp.filter((current) => {
			return current.id !== item.id;
		});
		setState({...state, items: temp})
	}

	function openEditModal(item, index) {
		let selectedItem = state.selectedItem;
		selectedItem.item = item;
		selectedItem.index = index;
		let isEditModalOpen = true;
		setState({...state, selectedItem, isEditModalOpen})
	}

	function hideEditModal() {
		setState({...state, selectedItem: {item: null, index: null}, isEditModalOpen: false})
	}

	function hideSelectEditModal() {
		setState({...state, selectedDropdownItem: {}, isSelectOptionModalOpen: false})
	}

	function addDefaultOption(selectedItem) {
		let newOption = createDefaultOptionByType(selectedItem);
		let newItems = [...state.items];
		newItems[selectedItem.index].properties.sections.reduce(section => {
			return section.type === newOption.sectionType
		}).elements.push(newOption.newElement);

		setState(prevState => {
			return {...prevState, items: newItems}
		});
	}

	function moveItemDown(itemIndex) {
		let temp = [...state.items];
		[temp[itemIndex], temp[itemIndex + 1]] = [temp[itemIndex + 1], temp[itemIndex]];
		setState(prevState => {
			return {...prevState, items: temp}
		})
	}

	function moveItemUp(itemIndex) {
		let temp = [...state.items];
		[temp[itemIndex], temp[itemIndex - 1]] = [temp[itemIndex - 1], temp[itemIndex]];
		setState(prevState => {
			return {...prevState, items: temp}
		})
	}

	function moveItemTop(itemIndex) {
		let temp = [...state.items];
		temp.splice(itemIndex, 0, temp.splice(itemIndex, 1)[0]);
		setState(prevState => {
			return {...prevState, items: temp}
		})
	}

	function createModalBody() {
		return generateModalBody(state.selectedItem, addDefaultOption);
	}

	useEffect(() => {
		setTimeout(() => setState(prevState => {
			return {...prevState, alert: null}
		}), 6000)

	}, [state.alert]);

	function displaySelectedFile(obj) {
		setState(prevState => {
			return {...prevState, selectedFile: obj, isDisplayFileModalOpen: true}
		})
	}

	function editFunctions(type) {
		switch (type) {
			case 'image':
			case 'file':
				return (
						{
							addFile: (itemIndex, sectionIndex, elementIndex, data) => {
								let file = uploadFile(data);
								let reader = new FileReader();
								reader.readAsDataURL(file);

								reader.onloadend = () => {
									let temp = [...state.items];

									if (isFileTypeValid(type, file.type)) {

										if (type === 'image') {
											temp[itemIndex].properties.sections[sectionIndex].elements[elementIndex].image = reader.result;

										} else {
											temp[itemIndex].properties.sections[sectionIndex].elements[elementIndex].file = reader.result;

											let newElement = null;
											if (!temp[itemIndex].properties.sections[sectionIndex].elements[elementIndex].content) {
												let newId = Math.random().toString(32);
												newElement = {
													id: newId,
													type: 'file',
													label: null,
													replied: false,
													active: false,
													content: null,
													file: null
												};
											}
											temp[itemIndex].properties.sections[sectionIndex].elements[elementIndex].content = file.name;

											if (newElement) {
												temp[itemIndex].properties.sections[sectionIndex].elements.push(newElement);
											}
										}

										setState(prevState => {
											return {...prevState, items: temp}
										})

									} else {
										let message = (
												<div>
													<p style={{color: 'white'}}>
														Dosya formatı uygun değil! Eklenecek dosya aşağıdaki
														formatlardan birine sahip olmalıdır.
														<ul>
															<li>jpg / jpeg</li>
															<li>png</li>
															{type === 'file' && <li>txt</li>}
															{type === 'file' && <li>pdf</li>}
															{type === 'file' && <li>doc / docx</li>}
															{type === 'file' && <li>xls / xlsx</li>}
														</ul>
													</p>
												</div>
										);
										let alert = {message: message};
										setState(prevState => {
											return {...prevState, alert}
										})
									}

								};
							},

							removeFile: (itemIndex, sectionIndex, elementIndex) => {
								let temp = [...state.items];

								if (type === 'image') {
									temp[itemIndex].properties.sections[sectionIndex].elements[elementIndex].image = null;
								} else {
									temp[itemIndex].properties.sections[sectionIndex].elements[elementIndex].file = null;
									temp[itemIndex].properties.sections[sectionIndex].elements[elementIndex].content = null;
								}

								setState(prevState => {
									return {...prevState, items: temp}
								})
							},

							displayFile: (itemIndex, sectionIndex, elementIndex) => {
								let element = state.items[itemIndex].properties.sections[sectionIndex].elements[elementIndex];
								let objToDisplay = {};
								if (type === 'image') {
									objToDisplay.type = 'img';
									objToDisplay.data = element.image;
								} else {
									objToDisplay.type = 'file';
									objToDisplay.name = element.content;
									objToDisplay.data = element.file;
								}
								displaySelectedFile(objToDisplay);
							}
						}
				);
			case 'radio-button':
				return (
						{
							onChangeRadioState: (itemIndex, sectionIndex, elementIndex, data) => {
								let newState = onChange(data) === 'on';
								let temp = [...state.items];

								temp[itemIndex].properties.sections[sectionIndex].elements.map((element, index) => {
									index === elementIndex ? element.replied = newState : element.replied = !newState;
								});
								setState(prevState => {
									return {...prevState, items: temp}
								})
							}
						}
				);
			case 'checkbox':
				return (
						{
							onChangeCheckboxState: (itemIndex, sectionIndex, elementIndex, data) => {
								let temp = [...state.items];
								temp[itemIndex].properties.sections[sectionIndex].elements[elementIndex].replied =
										!temp[itemIndex].properties.sections[sectionIndex].elements[elementIndex].replied;
								setState(prevState => {
									return {...prevState, items: temp}
								})
							}
						}
				);
			case 'label':
				return (
						{
							onChangeLabel: (itemIndex, sectionIndex, elementIndex, data) => {
								let temp = [...state.items];
								temp[itemIndex].properties.sections[sectionIndex].elements[elementIndex].label = onChange(data);
								setState(prevState => {
									return {...prevState, items: temp}
								})
							}
						}
				);
			case 'text-area':
			case 'text-input':
				return (
						{
							onChangeText: (itemIndex, sectionIndex, elementIndex, data) => {
								let temp = [...state.items];
								temp[itemIndex].properties.sections[sectionIndex].elements[elementIndex].content = onChange(data);
								setState(prevState => {
									return {...prevState, items: temp}
								})
							}
						}
				);
			case 'dropdown':
				return (
						{
							onEditDropdown: (itemIndex, sectionIndex, elementIndex, data) => {
								let selectedDropdownItem = {};
								selectedDropdownItem.itemIndex = itemIndex;
								selectedDropdownItem.sectionIndex = sectionIndex;
								selectedDropdownItem.elementIndex = elementIndex;
								selectedDropdownItem.data = data;

								let isSelectOptionModalOpen = true;
								setState({...state, selectedDropdownItem, isSelectOptionModalOpen})
							},
							onSelectOption: (itemIndex, sectionIndex, elementIndex, data) => {
								let temp = [...state.items];
								temp[itemIndex].properties.sections[sectionIndex].elements[elementIndex].content = onChange(data);
								setState(prevState => {
									return {...prevState, items: temp}
								})
							}
						}
				);
			default:
				return (
						{
							onDeleteElement: (itemIndex, sectionIndex, elementId) => {
								console.log(elementId)
								let temp = [...state.items];
								temp[itemIndex].properties.sections[sectionIndex].elements = temp[itemIndex].properties.sections[sectionIndex].elements.filter((element) => {
									return element.id !== elementId;
								});
								setState(prevState => {
									return {...prevState, items: temp}
								})
							}
						}
				)
		}
	}

	function openSelectOptionModal() {
		let selectedItem = {...state.selectedDropdownItem};
		let temp = [...state.items];
		let options = temp[selectedItem.itemIndex].properties.sections[selectedItem.sectionIndex].elements[selectedItem.elementIndex].options;

		options.length === 0 && options.push({id: 0, label: '', value: ''});

		function onChangeOption(e, index) {
			options[index].label = e.target.value;
			options[index].value = e.target.value;

			setState(prevState => {
				return {...prevState, items: temp}
			})
		}

		function addNewOption() {
			let option = {id: options.length, label: '', value: ''};
			options.push(option);
			setState(prevState => {
				return {...prevState, items: temp}
			})
		}

		function onSubmitNewOptions() {
			let selectedItem = {...state.selectedDropdownItem};
			let temp = [...state.items];
			let options = temp[selectedItem.itemIndex].properties.sections[selectedItem.sectionIndex].elements[selectedItem.elementIndex].options;

			temp[selectedItem.itemIndex].properties.sections[selectedItem.sectionIndex].elements[selectedItem.elementIndex].options = options.filter(option => {
				return option.value;
			});

			setState(prevState => {
				return {...prevState, items: temp, selectedDropdownItem: {}, isSelectOptionModalOpen: false};
			})

		}

		return (
				<Modal show={state.isSelectOptionModalOpen} onHide={hideSelectEditModal}>
					<Modal.Header closeButton>Seçenek Olusturun</Modal.Header>
					<Modal.Body>
						<div>
							{options.length > 0 &&
							options.map((option, index) => {
								return (
										<div key={option.id} className='new-option-div'>
											<label className='new-option-label'>{index + 1}</label>
											<input style={{width: '80%'}} type='text' value={option.value}
												   onChange={(e) => onChangeOption(e, index)}/>
											{(index === options.length - 1) &&
											<FontAwesomeIcon style={{margin: '0 5px'}} icon='plus-square'
															 color='#72a0c7' size='2x' onClick={() => addNewOption()}/>}
										</div>
								)
							})
							}
						</div>
					</Modal.Body>
					<Modal.Footer>
						<button onClick={() => onSubmitNewOptions()}>Onayla</button>
					</Modal.Footer>
				</Modal>
		)
	}

	function previewForm() {
		setState({...state, isPreviewModalOpen: true})
	}

	function hidePreviewModal() {
		setState({...state, isPreviewModalOpen: false})
	}

	function hideDisplayFileModal() {
		setState({...state, isDisplayFileModalOpen: false})
	}

	function onSubmit() {
		let form = [...state.items];
		console.log(JSON.stringify(form))
	}

	function getHtml() {
		console.log(document.getElementById('draggable-panel').innerHTML)
	}

	function isFileTypeValid(elementType, fileType) {
		if (elementType === 'file') {
			switch (fileType) {
				case 'image/png':
				case 'image/jpeg':
				case 'text/plain':
				case 'application/pdf':
				case 'application/vnd.ms-excel':
				case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
				case 'application/msword':
				case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
					return true;
				default :
					return false;
			}
		} else {
			switch (fileType) {
				case 'image/png':
				case 'image/jpeg':
					return true;
				default :
					return false;
			}
		}
	}

	return (
			<DropTarget onItemDropped={itemDropped} onSubmitForm={onSubmit} dropEffect="link" previewForm={previewForm}
						alert={state.alert}>
				<div className="drag-drop-container">
					{state.items.map((item, itemIndex) => (
							<div key={item.id} className="item">
								<DraggablePanel>
									{state.items.length > 1 &&
									<div className='swap-items-div'>
										{/*{(itemIndex !== 0 && itemIndex !== 1) && state.items.length > 2 &&*/}
										{/*<FontAwesomeIcon icon='angle-double-up' color='#72a0c7'*/}
										{/*				 style={{margin: '0 5px'}} size='lg'*/}
										{/*				 onClick={() => moveItemTop(itemIndex)}/>*/}
										{/*}*/}
										{itemIndex !== 0 &&
										<FontAwesomeIcon icon='angle-up' color='#72a0c7' style={{margin: '0 5px'}}
														 size='lg' onClick={() => moveItemUp(itemIndex)}/>
										}
										{itemIndex !== (state.items.length - 1) &&
										<FontAwesomeIcon icon='angle-down' color='#72a0c7' style={{margin: '0 5px'}}
														 size='lg' onClick={() => moveItemDown(itemIndex)}/>
										}
									</div>
									}
									<div className='dropdown-menu-div'>
										<input className='dropdown-menu-checkbox'
											   id={'dropdown-menu-checkbox' + item.id} type="checkbox" name="menu"/>
										<label htmlFor={'dropdown-menu-checkbox' + item.id}>
											<FontAwesomeIcon icon='ellipsis-v' color='#72a0c7' size='lg'/>
										</label>
										<ul className="submenu">
											<li>
												<button onClick={() => removePanel(item)}>Kaldır</button>
											</li>
											{(item.name !== 'text-area' && item.name !== 'file') &&
											<li>
												<button onClick={() => openEditModal(item, itemIndex)}>Düzenle</button>
											</li>}
										</ul>
									</div>

									<div className='draggable-panel-header'>
										{item.properties.title}
									</div>

									{item.properties.sections.map((section, sectionIndex) =>
											generateSectionBody(section, sectionIndex, itemIndex, editFunctions))}
								</DraggablePanel>
							</div>
					))}

					{state.isEditModalOpen &&
					<EditModal show={state.isEditModalOpen} selectedItem={state.selectedItem} hide={hideEditModal}>
						{createModalBody()}
					</EditModal>}

					{state.isSelectOptionModalOpen && openSelectOptionModal()}

					{state.isPreviewModalOpen &&
					<PreviewModal show={state.isPreviewModalOpen} hide={hidePreviewModal} items={state.items}/>}

					{state.isDisplayFileModalOpen &&
					<DisplayFileModal show={state.isDisplayFileModalOpen} hide={hideDisplayFileModal}
									  file={state.selectedFile}/>}
				</div>
			</DropTarget>
	);
}