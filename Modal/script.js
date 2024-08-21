// JavaScript code to handle the modal functionality

// Select elements
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modalOverlay');

// Function to open the modal
function openModal() {
    modal.classList.remove('hidden');
    modalOverlay.classList.remove('hidden');
    updateURLParams(true);
}

// Function to close the modal
function closeModal() {
    modal.classList.add('hidden');
    modalOverlay.classList.add('hidden');
    updateURLParams(false);
}

// Function to update URL search params
function updateURLParams(isOpen) {
    const url = new URL(window.location);
    if (isOpen) {
        url.searchParams.set('modal', 'open');
    } else {
        url.searchParams.delete('modal');
    }
    window.history.pushState({}, '', url);
}

// Function to handle overlay click
modalOverlay.addEventListener('click', closeModal);

// Event listeners
openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

// Check URL search params on page load
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('modal') === 'open') {
        openModal();
    }
});
