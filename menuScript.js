document.addEventListener('DOMContentLoaded', () => {
	makeMenu();
});
function makeMenu() {
	const header = document.querySelector('.header')
	const menu = header.children[1];
	let expanded = !1;
	const links = header.children[2];
	menu.addEventListener('click', () => {
		expanded = !expanded;
		menu.setAttribute('aria-expanded', String(expanded));
		menu.children[0].textContent = expanded ? 'Закрыть меню' : 'Открыть меню';
		links.classList.toggle('header__links_opened', expanded);
		links.classList.add('header__links-toggled')
	})
}