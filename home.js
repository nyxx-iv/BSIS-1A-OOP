function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('open');
}

const searchInput = document.getElementById('searchInput');
const items = document.querySelectorAll('.item');

function handleSearchKey(event) {
  if (event.key === 'Enter') {
    const query = searchInput.value.trim().toLowerCase();

    items.forEach(item => {
      const name = item.getAttribute('data-name')?.toLowerCase() || '';
      const description = item.querySelector('.description')?.textContent.toLowerCase() || '';
      const matches = name.includes(query) || description.includes(query);

      item.style.display = query === '' || matches ? 'block' : 'none';
    });
  }
}

searchInput.addEventListener('keypress', handleSearchKey);

function addToCart(item) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItemIndex = cart.findIndex(i => i.name === item.name);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  customAlert(`${item.name} added to cart`);
}

items.forEach(item => {
  const name = item.dataset.name;
  const price = parseFloat(item.dataset.price);
  const priceElement = item.querySelector('.price');

  if (priceElement) {
    priceElement.textContent = `₱${price.toFixed(2)}`;
  }

  const addButton = item.querySelector('.add-cart');
  const buyButton = item.querySelector('.buy-now');

  if (addButton) {
    addButton.addEventListener('click', () => {
      addToCart({ name, price });
    });
  }

  if (buyButton) {
    buyButton.addEventListener('click', () => {
      addToCart({ name, price });
      window.location.href = './cart.html';
    });
  }

  const img = item.querySelector('img');
  if (img) {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      const modal = document.getElementById('imageModal');
      const modalImg = document.getElementById('modalImage');
      const modalCaption = document.getElementById('modalCaption');

      modal.classList.remove('hidden');
      modalImg.src = img.src;
      modalImg.alt = img.alt;

      const desc = item.querySelector('.description');
      modalCaption.textContent = desc ? desc.textContent : '';
    });
  }
});

const modal = document.getElementById('imageModal');
const modalClose = modal.querySelector('.close');

modalClose.addEventListener('click', () => {
  modal.classList.add('hidden');
});
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});

document.querySelectorAll('.sidebar li').forEach(li => {
  li.addEventListener('click', () => {
    const filter = li.getAttribute('data-filter');

    items.forEach(item => {
      if (filter === 'All' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });

    document.querySelectorAll('.sidebar li').forEach(el => el.classList.remove('active'));
    li.classList.add('active');
  });
});

function customAlert(message) {
  const alertBox = document.createElement('div');
  alertBox.textContent = message;
  alertBox.style.position = 'fixed';
  alertBox.style.bottom = '20px';
  alertBox.style.right = '20px';
  alertBox.style.backgroundColor = '#00a5ff';
  alertBox.style.color = 'white';
  alertBox.style.padding = '12px 20px';
  alertBox.style.borderRadius = '6px';
  alertBox.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
  alertBox.style.zIndex = 10000;
  alertBox.style.fontSize = '16px';
  alertBox.style.opacity = '1';
  alertBox.style.transition = 'opacity 0.5s ease';

  document.body.appendChild(alertBox);

  setTimeout(() => {
    alertBox.style.opacity = '0';
    setTimeout(() => {
      alertBox.remove();
    }, 500);
  }, 2500);
}
