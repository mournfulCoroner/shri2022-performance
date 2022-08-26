document.addEventListener('DOMContentLoaded', () => {
	makeTabs()
});
function selectTab(node, select, newId) {
	const newTab = node.querySelector(`.section__tab[data-id=${newId
		}]`);
	const newPanel = node.querySelector(`.section__panel[data-id=${newId
		}]`);
	const oldTab = node.querySelector('.section__tab_active');
	const oldPanel = node.querySelector('.section__panel:not(.section__panel_hidden)');
	oldTab.classList.remove('section__tab_active');
	oldTab.setAttribute('aria-selected', 'false');
	oldTab.removeAttribute('tabindex');
	newTab.classList.add('section__tab_active');
	newTab.setAttribute('aria-selected', 'true');
	newTab.setAttribute('tabindex', '0');
	newTab.focus({
		preventScroll: !0
	});
	oldPanel.classList.add('section__panel_hidden');
	oldPanel.setAttribute('aria-hidden', 'true');
	newPanel.classList.remove('section__panel_hidden');
	newPanel.setAttribute('aria-hidden', 'false');
	select.value = newId
}
function makeTabs() {
	const node = document.querySelector('.main__devices');
	let selected = node.querySelector('.section__tab_active').dataset.id;
	const tabs = node.querySelectorAll('.section__tab');
	const list = Array.from(tabs).map(node => node.dataset.id);
	const select = node.querySelector('.section__select');
	select.addEventListener('input', () => {
		selectTab(node, select, select.value)
	});
	for (let tab of tabs) {
		tab.addEventListener('click', event => {
			const newId = event.target.dataset.id;
			selectTab(node, select, newId)
		})
		tab.addEventListener('keydown', event => {
			if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
				return
			}
			let index = list.indexOf(selected);
			switch (event.which) {
				case 37:
					--index;
					break;
				case 39:
					++index;
					break;
				case 36:
					index = 0;
					break;
				case 35:
					index = list.length - 1;
					break;
				default:
					return
			}
			if (index >= list.length) {
				index = 0
			} else
				if (index < 0) {
					index = list.length - 1
				}
			selectTab(node, select, list[index]);
			event.preventDefault()
		})
	}
}