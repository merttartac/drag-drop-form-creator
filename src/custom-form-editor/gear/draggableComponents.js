export const list = [
	{
		id: 0,
		name: 'heading',
		properties: {
			icon: 'heading',
			title: 'Başlık',
			sections: [{
				id: 0,
				type: 'heading-panel',
				replied: false,
				active: true,
				saved: false,
				elements: [
					{id: 0, type: 'heading', label: null, replied: false, active: false, content: null}]
			}]
		}
	},
	{
		id: 1,
		name: 'radio',
		properties: {
			icon: 'dot-circle',
			title: 'Tekli Seçim',
			sections: [{
				id: 0,
				type: 'radio-button-panel',
				replied: false,
				active: true,
				saved: false,
				elements: [
					{id: 0, type: 'text-area', label: null, replied: false, active: false, content: null},
					{id: 1, type: 'radio-button', label: null, replied: false, active: false, content: null},
					{id: 2, type: 'radio-button', label: null, replied: false, active: false, content: null},
					{id: 3, type: 'radio-button', label: null, replied: false, active: false, content: null},
					{id: 4, type: 'radio-button', label: null, replied: false, active: false, content: null}]
			}]
		}
	},
	{
		id: 2,
		name: 'checkbox',
		properties: {
			icon: 'check',
			title: 'Çoklu Seçim',
			sections: [{
				id: 0,
				type: 'checkbox-panel',
				replied: false,
				active: true,
				saved: false,
				elements: [
					{id: 0, type: 'text-area', label: null, replied: false, active: false, content: null},
					{id: 1, type: 'checkbox', label: null, replied: false, active: false, content: null},
					{id: 2, type: 'checkbox', label: null, replied: false, active: false, content: null},
					{id: 3, type: 'checkbox', label: null, replied: false, active: false, content: null},
					{id: 4, type: 'checkbox', label: null, replied: false, active: false, content: null}]
			}]
		}
	},
	{
		id: 3,
		name: 'text-input',
		properties: {
			icon: 'i-cursor',
			title: 'Metin Satırı',
			sections: [{
				id: 0,
				type: 'text-input-panel',
				replied: false,
				active: true,
				saved: false,
				elements: [
					{id: 0, type: 'text-input', label: null, replied: false, active: false, content: null},
					{id: 1, type: 'text-input', label: null, replied: false, active: false, content: null}]
			}]
		}
	},
	{
		id: 4,
		name: 'text-area',
		properties: {
			icon: 'paragraph',
			title: 'Metin Alanı',
			sections: [{
				id: 0,
				type: 'text-area-panel',
				replied: false,
				active: true,
				saved: false,
				elements: [
					{id: 0, type: 'text-area', label: null, replied: false, active: false, content: null}]
			}]
		}
	},
	{
		id: 5,
		name: 'date',
		properties: {
			icon: 'calendar-alt',
			title: 'Tarih',
			sections: [{
				id: 0,
				type: 'date-panel',
				replied: false,
				active: true,
				heading: null,
				elements: [
					{id: 0, type: 'date', label: null, replied: false, active: false, content: null},
					{id: 1, type: 'date', label: null, replied: false, active: false, content: null}]
			}]
		}
	},
	{
		id: 6,
		name: 'image',
		properties: {
			icon: 'images',
			title: 'Fotoğraf Satırı',
			sections: [{
				id: 0,
				type: 'image-panel',
				replied: false,
				active: true,
				heading: null,
				elements: [
					{id: 0, type: 'image', label: null, replied: false, active: false, content: null, image: null}]
			}]
		}
	},
	{
		id: 7,
		name: 'dropdown',
		properties: {
			icon: 'caret-square-down',
			title: 'Açılır Menü',
			sections: [{
				id: 0,
				type: 'dropdown-panel',
				replied: false,
				active: true,
				heading: null,
				elements: [
					{id: 0, type: 'text-area', label: null, replied: false, active: false, content: null},
					{id: 1, type: 'dropdown', label: null, replied: false, active: false, options: [], content: ''}]
			}]
		}
	},
	{
		id: 8,
		name: 'file',
		properties: {
			icon: 'file',
			title: 'Doküman Satırı',
			sections: [{
				id: 0,
				type: 'file-panel',
				replied: false,
				active: true,
				heading: null,
				elements: [
					{id: 0, type: 'file', label: null, replied: false, active: false, content: null, file: null}]
			}]
		}
	}
];