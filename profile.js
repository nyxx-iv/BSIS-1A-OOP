document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));
      link.classList.add('active');
      const target = document.getElementById(link.dataset.target);
      if (target) target.classList.add('active');
    });
  });

  document.querySelectorAll('.fa-pen, .fa-save').forEach(icon => {
    icon.addEventListener('click', () => {
      const section = icon.closest('.section');
      const editables = section.querySelectorAll('.editable');
      const isEditing = icon.classList.contains('fa-save');

      if (!isEditing) {
        editables.forEach(span => {
          const text = span.textContent.trim();
          span.innerHTML = `<input type="text" value="${text}" />`;
        });
        icon.classList.replace('fa-pen', 'fa-save');
        icon.title = 'Save';
      } else {
        editables.forEach(span => {
          const input = span.querySelector('input');
          span.textContent = input.value.trim();
        });
        icon.classList.replace('fa-save', 'fa-pen');
        icon.title = 'Edit';
      }
    });
  });
});
