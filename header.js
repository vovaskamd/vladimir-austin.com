document.addEventListener('DOMContentLoaded', function () {
    const ensureGlobalStyles = () => {
        if (document.querySelector('link[data-va-global]')) {
            return;
        }
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/global.css';
        link.setAttribute('data-va-global', 'true');
        document.head.appendChild(link);
    };

    ensureGlobalStyles();

    const navItems = [
        { name: 'אירועים קטנים', href: '/small-events/' },
        { name: 'צלם מגנטים', href: '/magnetim/' },
        { name: 'עמדת צילום', href: '/photobox/' },
        { name: 'משחקים לאירועים', href: '/funzone/' },
        {
            name: 'עיצוב בלונים',
            href: '/balloons-2/',
            children: [
                { name: 'עיצוב בלונים לאירועים פרטים', href: '/balloons-2/' },
                { name: 'עיצוב בלונים ומיתוג לעסקים', href: '/עיצוב-בלונים-ומיתוג-לעסקים/' },
            ],
        },
        { name: 'חתונות', href: '/weddings/' },
        { name: 'חינה', href: '/henna-events/' },
        { name: 'הצעת נישואין', href: '/marryme/' },
        {
            name: 'בריתות',
            href: '/britmila/',
            children: [
                { name: 'צילומי ברית מילה', href: '/britmila/' },
                { name: 'דוגמאות לצילום ברית מילה', href: '/britmila/brit-clips/' },
                { name: 'חבילות צילום לברית מילה', href: '/britmila/deals-britmila/' },
                { name: 'קיר בלונים וקירות צילום', href: '/balloons-2/' },
            ],
        },
        {
            name: 'בר מצווה',
            href: '/barmizvah/',
            children: [
                { name: 'צילום בר מצווה', href: '/barmizvah/' },
                { name: 'חבילות צילום בר מצווה', href: '/barmizvah/barmizvah-sales/' },
                { name: 'בכותל', href: '/barmizvah/kotel/' },
                { name: 'בבית כנסת', href: '/barmizvah/barmizvah-synagogue/' },
                { name: 'במצדה', href: '/barmizvah/masada/' },
                { name: 'ֿבצפת', href: '/barmizvah/zefat/' },
                { name: 'בציפורי', href: '/barmizvah/zipori/' },
            ],
        },
        { name: 'בלוג', href: '/blog/' },
    ];

    const buildChildren = (children = []) => {
        if (!children.length) {
            return '';
        }
        return `<ul class="va-nav-sublist">
            ${children
                .map(
                    (child) =>
                        `<li class="va-nav-subitem"><a href="${child.href}" class="va-nav-sublink" data-nav-link>${child.name}</a></li>`,
                )
                .join('')}
        </ul>`;
    };

    const desktopNav = navItems
        .map((item, index) => {
            const hasChildren = Array.isArray(item.children) && item.children.length > 0;
            return `<li class="va-nav-item${hasChildren ? ' has-children' : ''}" data-nav-index="${index}">
                <a href="${item.href}" class="va-nav-link" data-nav-link>
                    <span>${item.name}</span>
                    ${hasChildren ? '<span class="va-chevron"></span>' : ''}
                </a>
                ${hasChildren ? `<div class="va-nav-dropdown">${buildChildren(item.children)}</div>` : ''}
            </li>`;
        })
        .join('');

    const mobileNav = navItems
        .map((item, index) => {
            const hasChildren = Array.isArray(item.children) && item.children.length > 0;
            if (!hasChildren) {
                return `<div class="va-mobile-item"><a href="${item.href}" class="va-mobile-link" data-nav-link>${item.name}</a></div>`;
            }
            return `<div class="va-mobile-item has-children" data-mobile-item="${index}">
                <button class="va-mobile-accordion" type="button" data-mobile-toggle="${index}">
                    <span>${item.name}</span>
                    <span class="va-chevron"></span>
                </button>
                <div class="va-mobile-children">
                    ${item.children
                        .map(
                            (child) =>
                                `<a href="${child.href}" class="va-mobile-sublink" data-nav-link>${child.name}</a>`,
                        )
                        .join('')}
                </div>
            </div>`;
        })
        .join('');

    const headerHTML = `
    <div class="va-header" data-va-header dir="rtl">
        <nav class="va-nav">
            <div class="va-nav-row">
                <a class="va-logo" href="/" aria-label="ולדימיר אוסטין">LOGO</a>
                <div class="va-nav-desktop" aria-label="תפריט ראשי">
                    <ul class="va-nav-list">
                        ${desktopNav}
                    </ul>
                </div>
                <div class="va-nav-actions">
                    <a class="va-call-cta" href="tel:0542330001">054-2330001</a>
                    <button type="button" class="va-mobile-toggle" aria-expanded="false" aria-label="פתח תפריט" data-va-menu-toggle>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
            <div class="va-nav-mobile" data-va-mobile-menu>
                ${mobileNav}
            </div>
        </nav>
    </div>`;

    const headerElement = document.getElementById('masthead');
    if (!headerElement) {
        return;
    }
    headerElement.innerHTML = headerHTML;

    const headerRoot = headerElement.querySelector('[data-va-header]');
    const menuToggle = headerElement.querySelector('[data-va-menu-toggle]');
    const mobileMenu = headerElement.querySelector('[data-va-mobile-menu]');
    const navLinks = headerElement.querySelectorAll('[data-nav-link]');

    if (!headerRoot || !menuToggle || !mobileMenu) {
        return;
    }

    const setScrolledState = () => {
        if (window.scrollY > 50) {
            headerRoot.classList.add('is-scrolled');
        } else {
            headerRoot.classList.remove('is-scrolled');
        }
    };

    setScrolledState();
    window.addEventListener('scroll', setScrolledState, { passive: true });

    const closeMenu = () => {
        headerRoot.classList.remove('is-menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
    };

    const toggleMenu = () => {
        const isOpen = headerRoot.classList.toggle('is-menu-open');
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    menuToggle.addEventListener('click', toggleMenu);

    mobileMenu.querySelectorAll('[data-mobile-toggle]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const index = btn.getAttribute('data-mobile-toggle');
            const target = headerElement.querySelector(`[data-mobile-item="${index}"]`);
            if (target) {
                target.classList.toggle('is-open');
            }
        });
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href') || '';
            if (href.startsWith('#')) {
                event.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
            closeMenu();
        });
    });
});
