const body = document.body;
const searchModal = document.querySelector('.search-modal');
const searchResult = document.getElementById('search-result');
const hasSearchModal = searchModal !== null;
const searchModalInput = document.querySelector('#doSearch');
const emptySearchResult = document.querySelector('.empty-search-result');
const openSearchModal = document.querySelectorAll('[data-target="search-modal"]');
const closeSearchModal = document.querySelectorAll('[data-target="close-search-modal"]');
const searchIcon = document.querySelector(".search-input-body label svg[type='search']");
const searchIconReset = document.querySelector(".search-input-body label svg[type='reset']");
let searchModalVisible = hasSearchModal && searchModal.classList.contains('show') ? true : false;
let jsonData = [];

const loadJsonData = async () => {
	try {
		const res = await fetch(indexURL);
		return jsonData = await res.json();
	} catch (err) {
		console.error(err);
	}
};

if (hasSearchModal) {
	// options
	const image = searchModal.getAttribute('data-image');
	const description = searchModal.getAttribute('data-description');
	const tags = searchModal.getAttribute('data-tags');
	const categories = searchModal.getAttribute('data-categories');
	
	searchModalInput.addEventListener("input", (e) => {
		const searchString = e.target.value.toLowerCase();
		
		if (searchString != "") {
			searchIcon.style.display = "none";
			searchIconReset.style.display = "initial";
			emptySearchResult.innerHTML = `<div class="no-result-found">
			<svg width="42" height="42" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.10368 33.9625C9.90104 36.2184 13.2988 37.6547 16.9158 38.0692C21.6958 38.617 26.5063 37.3401 30.3853 34.4939C30.4731 34.6109 30.5668 34.7221 30.6721 34.8304L41.9815 46.1397C42.5323 46.6909 43.2795 47.0007 44.0587 47.001C44.838 47.0013 45.5854 46.692 46.1366 46.1412C46.6878 45.5904 46.9976 44.8432 46.9979 44.064C46.9981 43.2847 46.6888 42.5373 46.138 41.9861L34.8287 30.6767C34.7236 30.5704 34.6107 30.4752 34.4909 30.3859C37.3352 26.5046 38.6092 21.6924 38.0579 16.912C37.6355 13.2498 36.1657 9.81322 33.8586 6.9977L31.7805 9.09214C34.0157 11.9274 35.2487 15.4472 35.2487 19.0942C35.2487 21.2158 34.8308 23.3167 34.0189 25.2769C33.207 27.2371 32.0169 29.0181 30.5167 30.5184C29.0164 32.0186 27.2354 33.2087 25.2752 34.0206C23.315 34.8325 21.2141 35.2504 19.0925 35.2504C16.9708 35.2504 14.8699 34.8325 12.9098 34.0206C11.5762 33.4682 10.3256 32.7409 9.18992 31.8599L7.10368 33.9625ZM28.9344 6.28152C26.1272 4.12516 22.671 2.93792 19.0925 2.93792C14.8076 2.93792 10.6982 4.64009 7.66829 7.66997C4.6384 10.6999 2.93623 14.8093 2.93623 19.0942C2.93623 21.2158 3.35413 23.3167 4.16605 25.2769C4.72475 26.6257 5.4625 27.8897 6.35716 29.0358L4.2702 31.1391C1.35261 27.548 -0.165546 23.0135 0.00974294 18.3781C0.19158 13.5695 2.18233 9.00695 5.58371 5.60313C8.98509 2.19932 13.5463 0.205307 18.3547 0.0200301C22.9447 -0.156832 27.4369 1.32691 31.0132 4.18636L28.9344 6.28152Z" fill="currentColor"/><path d="M3.13672 39.1367L38.3537 3.64355" stroke="black" stroke-width="3" stroke-linecap="round"/></svg><p>${no_results_for} "<b>${searchString}</b>"</p></div>`;
		} else {
			searchIcon.style.display = "initial";
			searchIconReset.style.display = "none";
			emptySearchResult.innerHTML = empty_search_results_placeholder;
		}

		let filteredJSON = includeSectionsInSearch.map((section) => {
			const data = jsonData.filter((item) => item.section.toLowerCase() === section.toLowerCase());
			return {
				section : section[0].toUpperCase() + section.slice(1).toLowerCase(),
				data,
			};
		});

		let searchItem = filteredJSON.filter((item) => {
			if (searchString === "") {
				return false;
			}
			return item.data.some((el) => {
				const regex = new RegExp(searchString, "gi");
				return (
					el.title.toLowerCase().match(regex) ||
					el.description?.toLowerCase().match(regex) ||
					el.searchKeyword.toLowerCase().match(regex) ||
					el.content.toLowerCase().match(regex) ||
					el.tags?.toLowerCase().match(regex) ||
					el.categories?.toLowerCase().match(regex)
				);
			});
		});

		displayResult(searchItem, searchString);

		// Navigate with arrow keys
		if (searchString != "") {
			const resItems = searchResult.querySelectorAll('.search-result-item a');
			let selectedIndex = -1;

			const selectItem = (index) => {
				if (index >= 0 && index < resItems.length) {
					for (let i = 0; i < resItems.length; i++) {
						resItems[i].setAttribute('aria-selected', i === index ? 'true' : 'false');
					}
					selectedIndex = index;
					resItems[index].scrollIntoView({ behavior: 'auto', block: 'nearest' });
				}
			};

			const handleKeyDown = (event) => {
				if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
					event.preventDefault();

					if (event.key === 'ArrowUp') {
						selectedIndex = selectedIndex > 0 ? selectedIndex - 1 : resItems.length - 1;
					} else if (event.key === 'ArrowDown') {
						selectedIndex = selectedIndex < resItems.length - 1 ? selectedIndex + 1 : 0;
					}

					selectItem(selectedIndex);
				} else if (event.key === 'Enter') {
					event.preventDefault();
		
					if (selectedIndex !== -1) {
						const selectedLink = resItems[selectedIndex].getAttribute('href');
						window.location.href = selectedLink;
					}
				}
			};

			searchModalInput.addEventListener('keydown', handleKeyDown);
			selectItem(0);
		}
	});

	const displayResult = (searchItems, searchString) => {
		const htmlString = searchItems.map((item) => {
			const contentValue = item.data.filter((d) => d.content.toLowerCase().includes(searchString)).map((innerItem) =>  {
				const position = innerItem.content.toLowerCase().indexOf(searchString.toLowerCase());
				let matches = innerItem.content.substring(position, searchString.length + position);
				let matchesAfter = innerItem.content.substring(searchString.length + position, searchString.length + position + 80);
				const highlighted = innerItem.content.replace(innerItem.content, '<mark>' + matches + '</mark>' + matchesAfter);
				return highlighted;
			});

			const highlightResult = (content) => {
				const regex = new RegExp(searchString, "gi");
				return content.replace(regex, (match) => `<u>${match}</u>`);
			};
			
			return`
			<div class="search-result-item">
				<p class="section-name">${item.section}</p>
				${item.data.filter((d) => 
					d.title.toLowerCase().includes(searchString) || 
					(description == "true" ? d.description?.toLowerCase().includes(searchString) : "") || 
					d.searchKeyword.toLowerCase().includes(searchString) || 
					(tags == "true" ? d.tags?.toLowerCase().includes(searchString) : "") || 
					(categories == "true" ? d.categories?.toLowerCase().includes(searchString) : "") || 
					d.content.toLowerCase().includes(searchString)).map((innerItem) => 
						`<a href="${innerItem.slug}">
							
							${image == "true" ? `
							<div class="flex-shrink-0">
								${innerItem.image}
							</div>` : ''}

							<div class="flex-grow-1">
								<p class="search-title">${highlightResult(innerItem.title)}</p>
								${description == "true" ? `<p class="search-description">${highlightResult(innerItem.description)}</p>` : ''}
								<p class="search-content">${contentValue}</p>

								${tags || categories == "true" ? `
								<div class="search-info ${(!innerItem.categories || !innerItem.tags) ? "hidden" : "" }">
									
									${categories == "true" ? `
									<div class="${(categories != "true" || !innerItem.categories) ? "hidden" : "" }">
										<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style="margin-top:-2px">
											<path d="M11 0H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2 2 2 0 0 0 2-2V4a2 2 0 0 0-2-2 2 2 0 0 0-2-2zm2 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1V3zM2 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2z"/>
										</svg>
										${highlightResult(innerItem.categories)}
									</div>
									` : ""}

									${tags == "true" ? `
									<div class="${(tags != "true" || !innerItem.tags) ? "hidden" : "" }">
										<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
											<path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z"/>
											<path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z"/>
										</svg>
										${highlightResult(innerItem.tags)}
									</div>
									` : ""}

								</div>
								` : ''}
							</div>
						</a>`
					).join("")}
			</div>`
		}).join("");
		searchResult.innerHTML = htmlString;

		const sectionName = document.querySelectorAll('.section-name');

		if (sectionName.length > 0) {
			// hide sectionName if there is no result
			sectionName.forEach((el) => {
				if (el.nextElementSibling == null) {
					el.style.display = "none";
				}
			});

			// show emptySearchResult if there is no result
			const values = Object.values(sectionName);
			const showEmptyRes = values.every((el) => {
				return el.style.display === "none";
			});
			if (showEmptyRes == true) {
				emptySearchResult.style.display = "block";
			} else {
				emptySearchResult.style.display = "";
			}
		}
	};
	loadJsonData();
}

// ========================================================================================

// Reset Serach
const resetSearch = () => {
	searchModalInput.value = "";
	searchIcon.style.display = "initial";
	searchIconReset.style.display = "none";
	emptySearchResult.innerHTML = empty_search_results_placeholder;
	searchResult.innerHTML = "";
};

// Body Scroll
const enableBodyScroll = () => {
	setTimeout(() => {
		body.style.overflowY = '';
		body.style.paddingRight = '';
	}, 200);
}
const disableBodyScroll = () => {
	const documentWidth = document.documentElement.clientWidth;
	const scrollbarWidth = Math.abs(window.innerWidth - documentWidth);
	body.style.overflowY = 'hidden';
	body.style.paddingRight = scrollbarWidth + "px";
}

// Show/Hide Search Modal
const showModal = () => {
	searchModal.classList.add('show');
	window.setTimeout(() => document.querySelector('#doSearch').focus(), 100);
	disableBodyScroll();
	searchModalVisible = true;
};
const closeModal = () => {
	searchModal.classList.remove('show');
	enableBodyScroll();
	searchModalVisible = false;
	resetSearch();
}

// Trigger Search Modal Show/Hide Events
if (hasSearchModal) {
	// Show Search Modal on page load
	if (searchModalVisible) {
		showModal();
	}

	// Trigger Reset Search
	searchIconReset.addEventListener("click", () => {
		resetSearch();
	});

	// Open Search Modal with click
	openSearchModal.forEach((el) => {
		el.addEventListener('click', function () {
			showModal();
		});
	});

	// Close Search Modal with click
	closeSearchModal.forEach((el) => {
		el.addEventListener('click', function () {
			closeModal();
		});
	});
	
	// Close modal on click outside modal-body
	searchModal.addEventListener('click', function (e) {
		if (e.target.classList.contains('search-modal')) {
			closeModal();
		}
	});

	// Close modal with ESC
	const closeSearchModalWithESC = (e) => {
		if (e.key === 'Escape') {
			if (searchModalVisible) {
				e.preventDefault();
				closeModal();
			}
		}
	}

	// Toggle modal on Ctrl + K / Cmd + K
	const toggleSearchModalWithK = (e) => {
		if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
			if (searchModalVisible) {
				e.preventDefault();
				closeModal();
			} else {
				e.preventDefault();
				showModal();
			}
		}
	}
	document.addEventListener('keydown', (e) => {
		toggleSearchModalWithK(e);
		closeSearchModalWithESC(e);
	});
}