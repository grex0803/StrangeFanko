document.addEventListener('DOMContentLoaded', () => {
    // Все элементы
    const preloader = document.getElementById('preloader');
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobile-menu');
    const openAuth = document.getElementById('open-auth');
    const authModal = document.getElementById('auth-modal');
    const closeAuth = document.getElementById('close-auth');
    const tabReg = document.getElementById('tab-reg');
    const tabLog = document.getElementById('tab-log');
    const formReg = document.getElementById('form-reg');
    const formLog = document.getElementById('form-log');
    const profileLink = document.getElementById('profile-link');
    const logoutBtn = document.getElementById('logout-btn');
    const cartBtn = document.getElementById('cart-btn');
    const cartPopup = document.getElementById('cart-popup');
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    const cartCountSpan = document.getElementById('cart-count');
    const openCheckout = document.getElementById('open-checkout');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckout = document.getElementById('close-checkout');
    const checkoutForm = document.getElementById('checkout-form');
    const ordersContainer = document.getElementById('orders-container');
    const profileUser = document.getElementById('profile-user');
    const scrollProgress = document.getElementById('scroll-progress');
    const heroParallax = document.querySelectorAll('.parallax');
    const typeTextEl = document.getElementById('type-text');
    const revealEls = document.querySelectorAll('.reveal-on-scroll');
    const counters = document.querySelectorAll('.stat-number');
    const productsContainer = document.querySelector('.products');
    const carouselTrack = document.getElementById('carousel-track');
    const carouselPrev = document.getElementById('carousel-prev');
    const carouselNext = document.getElementById('carousel-next');
    const carouselDots = document.getElementById('carousel-dots');

    // Состояние
    let users = JSON.parse(localStorage.getItem('sf_users') || '{}');
    let currentUser = localStorage.getItem('sf_current') || null;
    let cart = JSON.parse(localStorage.getItem('sf_cart') || '[]');
    let carouselPosition = 0;
    let carouselItems = [];

    // Данные товаров
    const products = [
        { id: 1, name: "Одинадцать с вафлями", price: 5000, image: "https://cdn1.ozone.ru/s3/multimedia-1-c/7071702204.jpg", category: "main" },
        { id: 2, name: "Дастин с кепкой", price: 4500, image: "https://www.outerlimittoys.com/cdn/shop/products/a733a45c1187469681f0a1df51874facxl.webp?v=1670341759", category: "main" },
        { id: 3, name: "Демогорган", price: 6000, image: "https://img.joomcdn.net/e2165b4bb8aaf12042f797dd0706f3f1bc995d99_original.jpeg", category: "monster" },
        { id: 4, name: "Майк Уиллер", price: 4700, image: "https://i.ebayimg.com/images/g/0oMAAOSwSI5jGOkY/s-l1600.jpg", category: "main" },
        { id: 5, name: "Уилл Байерс", price: 4800, image: "https://i.pinimg.com/736x/00/1a/80/001a802722d2aa4e0a3b6b2b4edd14f3.jpg", category: "main" },
        { id: 6, name: "Лукас Синклер", price: 4600, image: "https://i.ebayimg.com/images/g/W8sAAOSwlzdj~12r/s-l1600.jpg", category: "main" },
        { id: 7, name: "Макс Мейфилд", price: 4900, image: "https://i.pinimg.com/736x/89/5a/68/895a68f9699852fe55d33aa256696794.jpg", category: "main" },
        { id: 8, name: "Стив Харингтон", price: 5200, image: "https://avatars.mds.yandex.net/get-mpic/15427292/img_id7034732861902209884.jpeg/orig", category: "main" },
        { id: 9, name: "Джим Хоппер", price: 5100, image: "https://migames.ru/wa-data/public/shop/products/71/58/15871/images/25718/25718.750x0.jpg", category: "adults" },
        { id: 10, name: "Джойс Байерс", price: 4800, image: "https://avatars.mds.yandex.net/i?id=519e61fa5a1a68f30edf06bbc704f153_l-4304109-images-thumbs&n=13", category: "adults" },
        { id: 11, name: "Билли Харгроув", price: 5300, image: "https://i.pinimg.com/originals/3b/c5/93/3bc593e841401f2ab27872aff1bf74ac.jpg", category: "villains" },
        { id: 12, name: "Истязатель Разума", price: 6500, image: "https://cdn.shopify.com/s/files/1/0270/5480/1005/products/51_OA-PkiyL.jpg", category: "monster" },
        { id: 13, name: "Одинадцать в розовом платье", price: 5500, image: "https://pop-figures.com/media/img/figurine/421-funko-pop-figure-stranger-things-eleven-with-eggos-chase.jpg", category: "exclusive" },
        { id: 14, name: "Дастин", price: 5000, image: "https://hobbygames.ru/image/data/-new/funko/television/stranger-things/sy-dustin-02.jpg", category: "exclusive" },
        { id: 15, name: "Робин Бакли", price: 4900, image: "https://detoyboys.nl/59050-home_default/stranger-things-pop-tv-vinyl-figure-robin-9-cm.jpg", category: "main" },
        { id: 16, name: "Эрика Синклер", price: 4700, image: "https://s4.thcdn.com/productimg/1600/1600/13795111-2184978890746022.jpg", category: "main" },
        { id: 17, name: "Мюррей Бауман", price: 4800, image: "https://avatars.mds.yandex.net/get-mpic/5521597/2a000001927565b0d3bf1331dac1d2745a49/orig", category: "adults" },
        { id: 18, name: "Алексей", price: 5000, image: "https://cdn11.bigcommerce.com/s-4ryifddx/images/stencil/1280x1280/products/646/1294/47204__94702.1611323008.jpg", category: "adults" },
        { id: 19, name: "Демопес", price: 5800, image: "https://i.pinimg.com/736x/37/aa/59/37aa597077e41b1bdf3118eda2bdc5e8.jpg", category: "monster" },
        { id: 20, name: "Векна", price: 7000, image: "https://m.media-amazon.com/images/I/51X+D754jbL.jpg", category: "monster" }
    ];

    /* ========== ПРЕЛОАДЕР ========== */
    setTimeout(() => {
        if(preloader) {
            preloader.style.transition = 'opacity 0.5s ease';
            preloader.style.opacity = '0';
            setTimeout(() => preloader.remove(), 500);
        }
    }, 1000);

    /* ========== БУРГЕР МЕНЮ ========== */
    burger?.addEventListener('click', () => {
        burger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        
        // Анимация бургера
        const spans = burger.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transition = 'all 0.3s ease';
        });
    });

    /* ========== МОДАЛЬНЫЕ ОКНА ========== */
    function openModal(modal) {
        modal.classList.add('open');
        setTimeout(() => {
            const panel = modal.querySelector('.modal-panel');
            if(panel) panel.classList.add('open');
        }, 10);
    }

    function closeModal(modal) {
        modal.classList.remove('open');
        const panel = modal.querySelector('.modal-panel');
        if(panel) panel.classList.remove('open');
    }

    openAuth?.addEventListener('click', () => {
        openModal(authModal);
        switchAuth('reg');
    });

    closeAuth?.addEventListener('click', () => closeModal(authModal));

    function switchAuth(tab) {
        if(tab === 'reg') {
            tabReg.classList.add('active');
            tabLog.classList.remove('active');
            formReg.classList.add('active');
            formLog.classList.remove('active');
        } else {
            tabLog.classList.add('active');
            tabReg.classList.remove('active');
            formLog.classList.add('active');
            formReg.classList.remove('active');
        }
    }

    tabReg?.addEventListener('click', () => switchAuth('reg'));
    tabLog?.addEventListener('click', () => switchAuth('log'));

    /* ========== ESC ДЛЯ ЗАКРЫТИЯ ========== */
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => closeModal(modal));
            mobileMenu.classList.remove('open');
            burger.classList.remove('open');
            cartPopup.classList.remove('active');
        }
    });

    /* ========== ПАРАЛЛАКС ЭФФЕКТ ========== */
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Параллакс для героя
        heroParallax.forEach(el => {
            const speed = parseFloat(el.dataset.speed) || 0.3;
            el.style.transform = `translateY(${scrollY * speed * -0.15}px)`;
        });

        // Прогресс бар
        const doc = document.documentElement;
        const scrollPercent = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });

    /* ========== ЭФФЕКТ ПЕЧАТИ ========== */
    const phrases = ['Коллекционные фигурки', 'Странные истории', 'Funko POP — Stranger Things'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        if(!typeTextEl) return;

        const currentPhrase = phrases[phraseIndex];
        
        if(isDeleting) {
            typeTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typeTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        if(!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(typeWriter, 2000);
        } else if(isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeWriter, 500);
        } else {
            setTimeout(typeWriter, isDeleting ? 50 : 100);
        }
    }

    typeTextEl && setTimeout(typeWriter, 1000);

    /* ========== ПОЯВЛЕНИЕ ПРИ СКРОЛЛЕ ========== */
    function checkReveal() {
        revealEls.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if(rect.top < windowHeight - 100) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    checkReveal();

    /* ========== АНИМАЦИЯ СЧЕТЧИКОВ ========== */
    function animateCounter(counter) {
        const target = parseInt(counter.dataset.target) || 0;
        let current = 0;
        const increment = target / 60;
        const stepTime = 2000 / 60;

        const timer = setInterval(() => {
            current += increment;
            if(current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, stepTime);
    }

    function checkCounters() {
        counters.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if(rect.top < windowHeight - 50 && !counter.classList.contains('animated')) {
                counter.classList.add('animated');
                animateCounter(counter);
            }
        });
    }

    window.addEventListener('scroll', checkCounters);
    checkCounters();

    /* ========== АККОРДЕОН ========== */
    document.querySelectorAll('.acc-header').forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            
            // Закрываем все остальные
            document.querySelectorAll('.acc-body').forEach(otherBody => {
                if(otherBody !== body) {
                    otherBody.style.height = '0';
                    otherBody.style.paddingBottom = '0';
                }
            });
            
            // Открываем/закрываем текущий
            if(body.style.height && body.style.height !== '0px') {
                body.style.height = '0';
                body.style.paddingBottom = '0';
            } else {
                body.style.height = body.scrollHeight + 'px';
                body.style.paddingBottom = '12px';
            }
        });
    });

    /* ========== 3D НАКЛОН КАРТОЧЕК ========== */
    document.querySelectorAll('.tilt').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const rotateX = (y - 0.5) * 15;
            const rotateY = (x - 0.5) * -15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            
            // Эффект свечения
            const glow = card.querySelector('.product-media') || card;
            glow.style.boxShadow = `${(x - 0.5) * 20}px ${(y - 0.5) * 20}px 40px rgba(229, 9, 20, 0.3)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            const glow = card.querySelector('.product-media') || card;
            glow.style.boxShadow = '';
        });
    });

    /* ========== ЭФФЕКТ РЯБИ ========== */
    document.addEventListener('click', (e) => {
        const button = e.target.closest('.ripple');
        if(!button) return;

        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });

    /* ========== СИСТЕМА АВТОРИЗАЦИИ ========== */
    function updateAuthUI() {
        if(currentUser) {
            openAuth.style.display = 'none';
            profileLink.style.display = 'inline-block';
            logoutBtn.style.display = 'inline-block';
            profileUser.textContent = 'Логин: ' + currentUser;
            renderOrders();
        } else {
            openAuth.style.display = 'inline-block';
            profileLink.style.display = 'none';
            logoutBtn.style.display = 'none';
            profileUser.textContent = 'Вы не авторизованы';
            ordersContainer.innerHTML = 'Нет заказов';
        }
    }

    formReg?.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('reg-name').value.trim();
        const password = document.getElementById('reg-pass').value;

        if(!username || !password) {
            shake(formReg);
            return;
        }

        if(users[username]) {
            alert('Пользователь уже существует');
            return;
        }

        users[username] = { password: password, orders: [] };
        localStorage.setItem('sf_users', JSON.stringify(users));
        currentUser = username;
        localStorage.setItem('sf_current', currentUser);
        closeModal(authModal);
        updateAuthUI();
    });

    formLog?.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('log-name').value.trim();
        const password = document.getElementById('log-pass').value;

        if(!users[username] || users[username].password !== password) {
            shake(formLog);
            return;
        }

        currentUser = username;
        localStorage.setItem('sf_current', currentUser);
        closeModal(authModal);
        updateAuthUI();
    });

    logoutBtn?.addEventListener('click', () => {
        currentUser = null;
        localStorage.removeItem('sf_current');
        updateAuthUI();
    });

    function shake(element) {
        element.animate([
            { transform: 'translateX(-8px)' },
            { transform: 'translateX(8px)' },
            { transform: 'translateX(-6px)' },
            { transform: 'translateX(6px)' },
            { transform: 'translateX(0)' }
        ], {
            duration: 400,
            easing: 'ease-in-out'
        });
    }

    /* ========== СИСТЕМА КОРЗИНЫ ========== */
    function saveCart() {
        localStorage.setItem('sf_cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }

    function updateCartCount() {
        cartCountSpan.textContent = cart.length;
    }

    function renderCart() {
        cartList.innerHTML = '';

        if(cart.length === 0) {
            cartList.innerHTML = '<div class="empty-cart">Корзина пуста</div>';
            cartTotal.textContent = 'Итого: 0₸';
            return;
        }

        let total = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name} - ${item.price}₸</span>
                <button class="remove-item" data-index="${index}">×</button>
            `;
            cartList.appendChild(cartItem);
            total += item.price;
        });

        cartTotal.textContent = `Итого: ${total}₸`;

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                cart.splice(index, 1);
                saveCart();
            });
        });
    }

    /* ========== ДОБАВЛЕНИЕ В КОРЗИНУ ========== */
    function attachCartHandlers() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-card, .carousel-item');
                const name = productCard.querySelector('h3, h4').textContent;
                const price = parseInt(productCard.closest('[data-price]')?.dataset.price || 
                               productCard.querySelector('.price')?.textContent.replace('₸', '') || 0);

                addToCartWithAnimation(name, price, productCard);
            });
        });
    }

    function addToCartWithAnimation(name, price, productCard) {
        cart.push({ name, price });
        saveCart();

        // Анимация полета товара
        const img = productCard.querySelector('img');
        if(img) {
            const flyingImg = img.cloneNode(true);
            const rect = img.getBoundingClientRect();
            
            flyingImg.style.position = 'fixed';
            flyingImg.style.left = rect.left + 'px';
            flyingImg.style.top = rect.top + 'px';
            flyingImg.style.width = rect.width + 'px';
            flyingImg.style.zIndex = '10000';
            flyingImg.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            flyingImg.style.borderRadius = '8px';
            
            document.body.appendChild(flyingImg);

            setTimeout(() => {
                const cartRect = cartBtn.getBoundingClientRect();
                flyingImg.style.left = (cartRect.left + cartRect.width / 2 - 15) + 'px';
                flyingImg.style.top = (cartRect.top + cartRect.height / 2 - 15) + 'px';
                flyingImg.style.width = '30px';
                flyingImg.style.opacity = '0.5';
                flyingImg.style.transform = 'rotate(360deg) scale(0.5)';
            }, 50);

            setTimeout(() => {
                flyingImg.remove();
            }, 850);
        }

        // Показ попапа корзины
        cartPopup.classList.add('active');
        setTimeout(() => {
            cartPopup.classList.remove('active');
        }, 3000);

        // Анимация иконки корзины
        cartBtn.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(1.3)' },
            { transform: 'scale(1)' }
        ], {
            duration: 300,
            easing: 'ease-out'
        });
    }

    cartBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        cartPopup.classList.toggle('active');
        renderCart();
    });

    document.getElementById('close-cart-popup')?.addEventListener('click', () => {
        cartPopup.classList.remove('active');
    });

    /* ========== КАРУСЕЛЬ КОЛЛЕКЦИИ ========== */
    function initCarousel() {
        if(!carouselTrack) return;

        carouselTrack.innerHTML = '';
        carouselItems = [...products];

        carouselItems.forEach(product => {
            const item = document.createElement('div');
            item.className = 'carousel-item tilt';
            item.innerHTML = `
                <div class="product-media">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <h4>${product.name}</h4>
                <p class="price">${product.price}₸</p>
                <button class="btn ripple add-to-cart">В корзину</button>
            `;
            carouselTrack.appendChild(item);
        });

        updateCarouselDots();
        attachCartHandlers();
    }

    function updateCarouselDots() {
        if(!carouselDots) return;

        carouselDots.innerHTML = '';
        const dotsCount = Math.ceil(carouselItems.length / 4);

        for(let i = 0; i < dotsCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            if(i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                carouselPosition = i * 4;
                updateCarousel();
            });
            
            carouselDots.appendChild(dot);
        }
    }

    function moveCarousel(direction) {
        const maxPosition = Math.max(0, carouselItems.length - 4);
        carouselPosition += direction;

        if(carouselPosition < 0) carouselPosition = 0;
        if(carouselPosition > maxPosition) carouselPosition = maxPosition;

        updateCarousel();
    }

    function updateCarousel() {
        if(!carouselTrack) return;

        const translateX = -carouselPosition * 220;
        carouselTrack.style.transform = `translateX(${translateX}px)`;

        const activeDotIndex = Math.floor(carouselPosition / 4);
        document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === activeDotIndex);
        });
    }

    carouselPrev?.addEventListener('click', () => moveCarousel(-1));
    carouselNext?.addEventListener('click', () => moveCarousel(1));

    /* ========== ОФОРМЛЕНИЕ ЗАКАЗА ========== */
    openCheckout?.addEventListener('click', () => {
        if(!currentUser) {
            alert('Сначала войдите или зарегистрируйтесь');
            return;
        }

        if(cart.length === 0) {
            alert('Корзина пуста');
            return;
        }

        cartPopup.classList.remove('active');
        openModal(checkoutModal);
    });

    checkoutForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
        const cvv = document.getElementById('card-cvv').value;

        if(!currentUser || cardNumber.length < 16 || cvv.length < 3) {
            shake(checkoutForm);
            return;
        }

        // Сохраняем заказ
        users = JSON.parse(localStorage.getItem('sf_users') || '{}');
        if(users[currentUser]) {
            users[currentUser].orders = users[currentUser].orders || [];
            users[currentUser].orders.push({
                items: cart.map(item => item.name),
                total: cart.reduce((sum, item) => sum + item.price, 0),
                date: new Date().toLocaleString()
            });
            localStorage.setItem('sf_users', JSON.stringify(users));
        }

        // Очищаем корзину
        cart = [];
        saveCart();
        closeModal(checkoutModal);
        alert('Заказ успешно оформлен!');
        updateAuthUI();
    });

    /* ========== ИСТОРИЯ ЗАКАЗОВ ========== */
    function renderOrders() {
        ordersContainer.innerHTML = '';

        if(!currentUser) {
            ordersContainer.innerHTML = '<div>Нет заказов</div>';
            return;
        }

        const userData = users[currentUser];
        if(!userData || !userData.orders || userData.orders.length === 0) {
            ordersContainer.innerHTML = '<div>Заказов пока нет</div>';
            return;
        }

        userData.orders.reverse().forEach((order, index) => {
            const orderElement = document.createElement('div');
            orderElement.className = 'order-card';
            orderElement.innerHTML = `
                <h4>Заказ #${userData.orders.length - index}</h4>
                <p><strong>Дата:</strong> ${order.date}</p>
                <p><strong>Товары:</strong> ${order.items.join(', ')}</p>
                <p><strong>Сумма:</strong> ${order.total}₸</p>
            `;
            ordersContainer.appendChild(orderElement);
        });
    }

    /* ========== РЕНДЕР ТОВАРОВ ========== */
    function renderProducts() {
        if(!productsContainer) return;

        productsContainer.innerHTML = products.slice(0, 6).map(product => `
            <article class="product-card tilt" data-price="${product.price}">
                <div class="product-media">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price}₸</p>
                <div class="card-actions">
                    <button class="btn ripple add-to-cart">В корзину</button>
                    <button class="btn outline details-btn">Подробнее</button>
                </div>
            </article>
        `).join('');

        attachCartHandlers();
    }

    /* ========== ИНИЦИАЛИЗАЦИЯ ========== */
    function init() {
        updateAuthUI();
        renderCart();
        updateCartCount();
        renderProducts();
        initCarousel();
        renderOrders();

        // Автопрокрутка карусели
        setInterval(() => moveCarousel(1), 5000);
    }

    init();

    /* ========== ЗАКРЫТИЕ МОДАЛОК ПО КЛИКУ ВНЕ ========== */
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if(e.target === modal) {
                closeModal(modal);
            }
        });
    });
});
// Добавляем в элементы
const contactBtn = document.getElementById('contact-btn');
const contactModal = document.getElementById('contact-modal');
const closeContact = document.getElementById('close-contact');
const contactForm = document.getElementById('contact-form');

// Добавляем в модальные функции
contactBtn?.addEventListener('click', () => {
    openModal(contactModal);
});

closeContact?.addEventListener('click', () => closeModal(contactModal));

// Обработка формы обратной связи
contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    
    if (!name || !email || !message) {
        shake(contactForm);
        showNotification('Заполните все поля', 'error');
        return;
    }
    
    // Имитация отправки
    showNotification('Сообщение отправлено! Мы свяжемся с вами скоро.', 'success');
    
    // Анимация успешной отправки
    contactForm.style.transform = 'scale(0.95)';
    setTimeout(() => {
        contactForm.style.transform = 'scale(1)';
        contactForm.reset();
        closeModal(contactModal);
    }, 1500);
});

// Функция уведомлений
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">×</button>
    `;
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Авто-закрытие
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
    
    // Закрытие по клику
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}

// Добавляем в HTML (в секцию перед закрывающим body)
document.write(`
    <!-- Contact Modal -->
    <div id="contact-modal" class="modal">
        <div class="modal-panel slide-up">
            <div class="modal-header">
                <h3>Свяжитесь с нами</h3>
                <button id="close-contact" class="modal-close">×</button>
            </div>
            <div class="modal-body">
                <form id="contact-form" class="form">
                    <input type="text" id="contact-name" placeholder="Ваше имя" required>
                    <input type="email" id="contact-email" placeholder="Ваш email" required>
                    <textarea id="contact-message" placeholder="Ваше сообщение" rows="4" required></textarea>
                    <button type="submit" class="btn">Отправить сообщение</button>
                </form>
            </div>
        </div>
    </div>
`);

// Добавляем кнопку в хедер (если нужно)
const headerActions = document.querySelector('.header-actions');
if (headerActions && !document.getElementById('contact-btn')) {
    const contactButton = document.createElement('button');
    contactButton.id = 'contact-btn';
    contactButton.className = 'btn outline';
    contactButton.textContent = 'Связаться';
    headerActions.appendChild(contactButton);
}

// Добавляем CSS для уведомлений
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--panel);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        border-left: 4px solid #4CAF50;
    }
    
    .notification.error {
        border-left: 4px solid var(--red);
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--muted);
        cursor: pointer;
        font-size: 1.2rem;
        padding: 0;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
    }
    
    .notification-close:hover {
        background: rgba(255,255,255,0.1);
        color: white;
    }
    
    /* Анимация для формы контактов */
    #contact-form {
        transition: transform 0.3s ease;
    }
    
    textarea {
        resize: vertical;
        min-height: 100px;
        font-family: inherit;
    }
`;

// Добавляем стили в документ
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);