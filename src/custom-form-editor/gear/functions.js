import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import DatePicker from "./DatePicker";
import React from "react";


export function generateSectionBody(section, sectionIndex, itemIndex, editFunctions) {
	switch (section.type) {
		case 'radio-button-panel':
			return (
					<div key={section.id} className='radio-button-panel-body'>
						{section.active &&

						section.elements.map((element, elementIndex) => (
								generateRadioButtonElements(section, sectionIndex, element, elementIndex, itemIndex, editFunctions)
						))}

					</div>
			);
		case 'checkbox-panel':
			return (
					<div key={section.id} className='checkbox-panel-body'>
						{section.active &&

						section.elements.map((element, elementIndex) => (
								generateCheckBoxElements(section, sectionIndex, element, elementIndex, itemIndex, editFunctions)
						))}

					</div>
			);
		case 'text-input-panel' :
			return (
					<div key={section.id} className='text-input-panel-body'>
						{section.active &&
						section.elements.map((element, elementIndex) => (
								generateTextInputElement(section, sectionIndex, element, elementIndex, itemIndex, editFunctions)
						))}
					</div>
			);
		case 'text-area-panel' :
			return (
					<div key={section.id} className='text-area-panel-body'>
						{section.active &&
						section.elements.map((element, elementIndex) => (
								generateTextAreaElement(section, sectionIndex, element, elementIndex, itemIndex, editFunctions)
						))}
					</div>
			);
		case 'date-panel' :
			return (
					<div key={section.id} className='date-panel-body'>
						{section.active &&
						section.elements.map((element, elementIndex) => (
								generateDateElement(section, sectionIndex, element, elementIndex, itemIndex, editFunctions)
						))}
					</div>
			);
		case 'image-panel' :
			return (
					<div key={section.id} className='image-panel-body'>
						{section.active &&
						section.elements.map((element, elementIndex) => (
								generateImageElement(section, sectionIndex, element, elementIndex, itemIndex, editFunctions)
						))}
					</div>
			);
		case 'dropdown-panel' :
			return (
					<div key={section.id} className='dropdown-panel-body'>
						{section.active &&
						section.elements.map((element, elementIndex) => (
								generateDropdownElement(section, sectionIndex, element, elementIndex, itemIndex, editFunctions)
						))}
					</div>
			);
		case 'heading-panel' :
			return (
					<div key={section.id} className='heading-panel-body'>
						{section.active &&
						section.elements.map((element, elementIndex) => (
								generateHeadingElement(section, sectionIndex, element, elementIndex, itemIndex, editFunctions)
						))}
					</div>
			);
		case 'heading-panel' :
			return (
					<div key={section.id} className='heading-panel-body'>
						{section.active &&
						section.elements.map((element, elementIndex) => (
								generateHeadingElement(section, sectionIndex, element, elementIndex, itemIndex, editFunctions)
						))}
					</div>
			);
		case 'file-panel' :
			return (
					<div key={section.id} className='file-panel-body'>
						{section.active &&
						section.elements.map((element, elementIndex) => (
								generateFileElement(section, sectionIndex, element, elementIndex, itemIndex, editFunctions)
						))}
					</div>
			);
		default:
			return '';
	}
}

export function createDefaultOptionByType(selectedItem) {
	let newId = Math.random().toString(32);
	switch (selectedItem.item.name) {
		case 'radio' :
			return {
				sectionType: "radio-button-panel",
				newElement: {id: newId, type: 'radio-button', label: null, replied: false, active: false, content: null}
			};
		case 'checkbox' :
			return {
				sectionType: "checkbox-panel",
				newElement: {id: newId, type: 'checkbox', label: null, replied: false, active: false, content: null}
			};
		case 'text-input' :
			return {
				sectionType: "text-input-panel",
				newElement: {id: newId, type: 'text-input', label: null, replied: false, active: false, content: null}
			};
		case 'date' :
			return {
				sectionType: "date-panel",
				newElement: {id: newId, type: 'date', label: null, replied: false, active: false, content: null}
			};
		case 'image' :
			return {
				sectionType: "image-panel",
				newElement: {
					id: newId,
					type: 'image',
					label: null,
					replied: false,
					active: false,
					content: null,
					image: null
				}
			};
		case 'dropdown' :
			return {
				sectionType: "image-panel",
				newElement: {
					id: 1,
					type: 'dropdown',
					label: null,
					replied: false,
					active: false,
					options: [],
					content: ''
				}
			};
		case 'file' :
			return {
				sectionType: "file-panel",
				newElement: {
					id: newId,
					type: 'file',
					label: null,
					replied: false,
					active: false,
					content: null,
					file: null
				}
			};
	}
}

export function generateModalBody(selectedItem, addDefaultOption) {
	switch (selectedItem.item.name) {
		case 'radio':
		case 'checkbox':
			return (
					<div className='edit-modal-row'>
						<FontAwesomeIcon className='font-awesome-button' icon='plus-square' color='#72a0c7' size='2x'
										 onClick={() => addDefaultOption(selectedItem)}/>
						<label className='edit-modal-label'>Seçenek Ekle</label>
					</div>
			);
		case 'text-input':
			return (
					<div className='edit-modal-row'>
						<FontAwesomeIcon className='font-awesome-button' icon='plus-square' color='#72a0c7' size='2x'
										 onClick={() => addDefaultOption(selectedItem)}/>
						<label className='edit-modal-label'>Metin Satırı Ekle</label>
					</div>
			);
		case 'date':
			return (
					<div className='edit-modal-row'>
						<FontAwesomeIcon className='font-awesome-button' icon='plus-square' color='#72a0c7' size='2x'
										 onClick={() => addDefaultOption(selectedItem)}/>
						<label className='edit-modal-label'>Yeni Tarih Bilgisi Ekle</label>
					</div>
			);
		case 'image':
			return (
					<div className='edit-modal-row'>
						<FontAwesomeIcon className='font-awesome-button' icon='plus-square' color='#72a0c7' size='2x'
										 onClick={() => addDefaultOption(selectedItem)}/>
						<label className='edit-modal-label'>Yeni Fotoğraf Ekle</label>
					</div>
			);
		case 'dropdown':
			return (
					<div className='edit-modal-row'>
						<FontAwesomeIcon className='font-awesome-button' icon='plus-square' color='#72a0c7' size='2x'
										 onClick={() => addDefaultOption(selectedItem)}/>
						<label className='edit-modal-label'>Yeni Seçim Menüsü Ekle</label>
					</div>
			);
	}
}

export function generateRadioButtonElements(section, sectionIndex, element, elementIndex, itemIndex, editFunctions) {
	return (
			//ToDo: AKTIF DEGILSE KISMI EKLENECEK
			<div key={element.id}>
				{element.type === 'text-area' &&
				<div style={{padding: '5px 10px'}} className='text-area-element'>

					{/*ToDo: ADMIN SEVIYESINDE KULLANICININ KAYDEDILEN ALANI DEGISTIREBILMESI ICIN BIR KONTROL DAHA EKLENMELI... AYRICA*/}
					{/*'SECTION' FORMU DOLDURAN TARAFINDAN CEVAPLANDIYSA ADMIN'IN MUDAHELE EDEMEMESI ICIN BIR KONTROL DAHA EKLENMELI*/}
					{!section.saved ?
							<textarea style={{width: '100%', minHeight: '75px'}}
									  placeholder='Metni Buraya Girebilirsiniz'
									  onChange={(e) => editFunctions(element.type).onChangeText(itemIndex, sectionIndex, elementIndex, e)}/>
							:
							<p>{element.content}</p>}
				</div>}

				{element.type === 'radio-button' &&
				<div className='radio-button-element'>
					<input type='radio' className='radio-button' checked={element.replied}
						   onChange={(e) => editFunctions(element.type).onChangeRadioState(itemIndex, sectionIndex, elementIndex, e)}/>
					{section.saved ?
							<p>{element.content ? element.content : <label>Bu alan boş bırakılmış</label>}</p>
							:
							<input className='radio-button-input' type='text'
								   placeholder='Metni Buraya Girebilirsiniz'
								   onChange={(e) => editFunctions('text-input').onChangeText(itemIndex, sectionIndex, elementIndex, e)}/>
					}
					{!section.saved &&
					<div style={{padding: '7px 5px'}}>
						<FontAwesomeIcon icon='trash-alt' color='#72a0c7'
										 onClick={() => editFunctions().onDeleteElement(itemIndex, sectionIndex, element.id)}/>
					</div>}

				</div>}
			</div>
	)
}

export function generateCheckBoxElements(section, sectionIndex, element, elementIndex, itemIndex, editFunctions) {
	return (
			//ToDo: AKTIF DEGILSE KISMI EKLENECEK
			<div key={element.id}>
				{element.type === 'text-area' &&
				<div style={{padding: '5px 10px'}} className='text-area-element'>

					{/*ToDo: ADMIN SEVIYESINDE KULLANICININ KAYDEDILEN ALANI DEGISTIREBILMESI ICIN BIR KONTROL DAHA EKLENMELI... AYRICA*/}
					{/*'SECTION' FORMU DOLDURAN TARAFINDAN CEVAPLANDIYSA ADMIN'IN MUDAHELE EDEMEMESI ICIN BIR KONTROL DAHA EKLENMELI*/}
					{!section.saved ?
							<textarea style={{width: '100%', minHeight: '75px'}}
									  placeholder='Metni Buraya Girebilirsiniz'
									  onChange={(e) => editFunctions(element.type).onChangeText(itemIndex, sectionIndex, elementIndex, e)}/>
							:
							<p>{element.content}</p>}
				</div>}

				{element.type === 'checkbox' &&
				<div className='checkbox-element'>
					<input type='checkbox' className='checkbox' checked={element.replied}
						   onChange={(e) => editFunctions(element.type).onChangeCheckboxState(itemIndex, sectionIndex, elementIndex, e)}/>
					{section.saved ?
							<p>{element.content ? element.content : <label>Bu alan boş bırakılmış</label>}</p>
							:
							<input className='checkbox-input' type='text'
								   placeholder='Metni Buraya Girebilirsiniz'
								   onChange={(e) => editFunctions('text-input').onChangeText(itemIndex, sectionIndex, elementIndex, e)}/>
					}
					{!section.saved &&
					<div style={{padding: '7px 5px'}}>
						<FontAwesomeIcon icon='trash-alt' color='#72a0c7'
										 onClick={() => editFunctions().onDeleteElement(itemIndex, sectionIndex, element.id)}/>
					</div>}

				</div>}
			</div>
	)
}

export function generateTextInputElement(section, sectionIndex, element, elementIndex, itemIndex, editFunctions) {
	return (
			<div key={element.id} className='text-input-element'>
				<div style={{display: 'flex', marginBottom: '5px'}}>
					{!section.saved ?
							<div style={{width: '80%'}}>
								<input className='text-input-label-init' placeholder='Metin Başlığı'
									   onChange={(e) => editFunctions('label').onChangeLabel(itemIndex, sectionIndex, elementIndex, e)}/>
							</div>
							:
							<div style={{width: '80%'}}>
								<label>{element.label}</label>
							</div>
					}

					{!section.saved &&
					<div className='text-input-remove'>
						<FontAwesomeIcon icon='trash-alt' color='#72a0c7'
										 onClick={() => editFunctions().onDeleteElement(itemIndex, sectionIndex, element.id)}/>
					</div>}
				</div>
				<input type='text' className='text-input'
					   onChange={(e) => editFunctions(element.type).onChangeText(itemIndex, sectionIndex, elementIndex, e)}/>
			</div>
	)
}

export function generateHeadingElement(section, sectionIndex, element, elementIndex, itemIndex, editFunctions) {
	return (
			<div key={element.id} className='heading-element'>
				<div style={{display: 'flex', marginBottom: '5px'}}>
					{!section.saved ?
							<div style={{width: '100%'}}>
								<input className='text-input-heading-init' placeholder='Başlığı Buraya Girebilirsiniz'
									   onChange={(e) => editFunctions('text-input').onChangeText(itemIndex, sectionIndex, elementIndex, e)}/>
							</div>
							:
							<div style={{width: '100%'}}>
								<label>{element.content}</label>
							</div>
					}
				</div>
			</div>
	)
}

export function generateTextAreaElement(section, sectionIndex, element, elementIndex, itemIndex, editFunctions) {
	return (
			<div key={element.id} className='text-area-element'>
				{!section.saved ?
						<input className='text-area-label-init'
							   placeholder='Metin Başlığı'
							   onChange={(e) => editFunctions('label').onChangeLabel(itemIndex, sectionIndex, elementIndex, e)}/>
						:
						<p>{element.label}</p>}

				{!section.saved ?
						<textarea style={{width: '100%', minHeight: '75px'}}
								  placeholder='Metni Buraya Girebilirsiniz'
								  onChange={(e) => editFunctions(element.type).onChangeText(itemIndex, sectionIndex, elementIndex, e)}/>
						:
						<p>{element.content}</p>}
			</div>
	)
}

export function generateDateElement(section, sectionIndex, element, elementIndex, itemIndex, editFunctions) {
	return (
			<div key={element.id} className='date-section'>
				{section.saved ?
						<div style={{padding: '5px 10px'}}>
							<label>{element.label}</label>
						</div>
						:
						<div style={{padding: '5px 10px'}}>
							<input type='text' className='text-input-label-init' placeholder='Tarih Başlığı'/>
						</div>
				}
				<DatePicker key={'date-picker-' + elementIndex} value={element.content} disabled={false}/>

				{!section.saved &&
				<div style={{padding: '7px 5px'}}>
					<FontAwesomeIcon icon='trash-alt' color='#72a0c7'
									 onClick={() => editFunctions().onDeleteElement(itemIndex, sectionIndex, element.id)}/>
				</div>}
			</div>
	)
}

export function generateImageElement(section, sectionIndex, element, elementIndex, itemIndex, editFunctions) {
	return (
			<div key={element.id} className='image-element'>

				<div className='image-upload-wrapper'>
					{element.image ?
							<img className='image-box' src={element.image} alt='preview-image'/>
							:
							<FontAwesomeIcon icon='image' color='#ffffff'
											 style={{padding: '20px', background: '#3cc166', marginTop: '8px'}}
											 size='10x'/>}

					<label htmlFor={'selectImage' + element.id} className='select-image-button'>Fotoğraf Seçin</label>

					<input id={'selectImage' + element.id} type='file'
						   style={{visibility: 'hidden', position: 'absolute', top: 0}}
						   onChange={(e) => editFunctions(element.type).addFile(itemIndex, sectionIndex, elementIndex, e)}/>
				</div>

				{!section.saved &&
				<div className='remove-image-button'>
					<FontAwesomeIcon icon='trash-alt' color='#72a0c7' size='lg'
									 onClick={() => editFunctions(element.type).removeFile(itemIndex, sectionIndex, element.id)}/>
				</div>}
			</div>
	)
}

export function generateDropdownElement(section, sectionIndex, element, elementIndex, itemIndex, editFunctions) {
	return (
			<div key={element.id} className='text-area-element'>
				{element.type === 'text-area' &&
				<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}}>
					{!section.saved ?
							<textarea style={{minHeight: '75px', width: '95%'}}
									  placeholder='Açıklamayı Buraya Girebilirsiniz'
									  onChange={(e) => editFunctions(element.type).onChangeText(itemIndex, sectionIndex, elementIndex, e)}/>
							:
							<p style={{width: '100%'}}>{element.content}</p>}

					{!section.saved &&
					<div style={{padding: '7px 5px'}}>
						<FontAwesomeIcon icon='trash-alt' color='#72a0c7' size='lg'
										 onClick={() => editFunctions().onDeleteElement(itemIndex, sectionIndex, element.id)}/>
					</div>}
				</div>}

				{element.type === 'dropdown' &&
				<div className='dropdown-element'>
					{!section.saved ?
							<div style={{width: '60%', padding: '0 5px'}}>
								<input className='text-input-label-init' placeholder='Seçim Başlığı'
									   onChange={(e) => editFunctions('label').onChangeLabel(itemIndex, sectionIndex, elementIndex, e)}/>
							</div>
							:
							<div style={{width: '60%'}}>
								<label>{element.label}</label>
							</div>
					}

					{!section.saved ?
							<select style={{width: '30%', padding: '0 5px'}}
									onChange={(e) => editFunctions(element.type).onSelectOption(itemIndex, sectionIndex, elementIndex, e)}
									value={element.content}>
								<option id={-1} value=''>Seçiniz</option>
								{element.options.length > 0 && element.options.map(option => {
									return <option id={option.id} value={option.value}>{option.label}</option>
								})}
							</select>
							:
							<div style={{width: '40%'}}>
								<p>element.content</p>
							</div>}

					{!section.saved &&
					<div style={{padding: '7px 5px', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
						<FontAwesomeIcon icon='plus-square' color='#1A9746' size='lg' style={{margin: '0 5px'}}
										 onClick={() => editFunctions(element.type).onEditDropdown(itemIndex, sectionIndex, elementIndex)}/>
						<FontAwesomeIcon icon='trash-alt' color='#72a0c7' size='lg' style={{margin: '0 5px'}}
										 onClick={() => editFunctions().onDeleteElement(itemIndex, sectionIndex, element.id)}/>
					</div>}
				</div>}
			</div>
	)
}

export function generateFileElement(section, sectionIndex, element, elementIndex, itemIndex, editFunctions) {
	return (
			<div key={element.id} className='file-element'>
				{!section.saved ?
						<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>

							{element.file &&
							<div style={{padding: '0 10px'}}>
								<label className='file-name-label'>{element.content}</label>
							</div>
							}

							<div>
								<label htmlFor={'selectFile' + element.id} className='select-image-button'>
									{element.content ?
											'Dosya Değiştir'
											:
											'Dosya Ekle'
									}
								</label>

								<input id={'selectFile' + element.id} type='file'
									   style={{visibility: 'hidden', position: 'absolute', top: 0}}
									   onChange={(e) => editFunctions(element.type).addFile(itemIndex, sectionIndex, elementIndex, e)}/>
							</div>

							{element.file &&
							<div>
								<FontAwesomeIcon icon='eye' color='#4d72ff' size='lg' style={{
									margin: '0px 5px',
									padding: '4px',
									fontSize: '37px',
									border: '#3d77d8 2px solid',
									borderRadius: '5px'
								}}
												 onClick={() => editFunctions(element.type).displayFile(itemIndex, sectionIndex, elementIndex)}/>
							</div>}

							{element.file &&
							<div>
								<FontAwesomeIcon icon='trash-alt' color='#f64c4c' size='lg' style={{
									margin: '0px 5px',
									padding: '4px',
									fontSize: '37px'
								}}
												 onClick={() => editFunctions().onDeleteElement(itemIndex, sectionIndex, element.id)}/>
							</div>}
						</div>
						:
						<div>
							<label>SAVED</label>
						</div>
				}
			</div>
	)
}

export function uploadFile(e) {
	let file = e.target.files[0];
	e.target.value = '';
	return file;
}

export function onChange(e) {
	return e.target.value;
}