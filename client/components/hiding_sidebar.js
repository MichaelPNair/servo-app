document.addEventListener('keydown', (event) => {
  // Check if Ctrl + B (key code 66) is pressed
  if (event.ctrlKey && event.key === "b") {
      toggleSidebars();
  }
});

function toggleSidebars() {
  const sidebars = document.querySelectorAll('.sidebar');
  const map = document.getElementById('map')
  sidebars.forEach(sidebar => {
      if (sidebar.classList.contains('hidden')) {
          // Show the sidebar
          sidebar.classList.remove('hidden');
          sidebar.classList.add('visible');

          // Reset to map css style given
          map.style.position = 'relative';
          map.style.overflow = 'hidden';
      } else {
          // Hide the sidebar
          sidebar.classList.remove('visible');
          sidebar.classList.add('hidden');

          // Reset to default values
          map.style.position = 'static';
          map.style.overflow = 'visible';
      }
  });
}



