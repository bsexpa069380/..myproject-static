document.addEventListener('DOMContentLoaded', function() {
    const menuTrigger = document.querySelector('.primary-menu-trigger');
    const menuClose = document.querySelector('.menu-close');
    const primaryMenu = document.querySelector('.primary-menu');
    const menuItems = document.querySelectorAll('.primary-menu .menu-item');
    const lazyImgs = document.querySelectorAll("img.lazy");

    let isMenuOpen = false;

    // 選單開關功能
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            primaryMenu.classList.add('menu-open');
            document.body.style.overflow = 'hidden';
            
            menuItems.forEach((item, index) => {
                item.style.transitionDelay = `${index * 0.1}s`;
            });
        } else {
            primaryMenu.classList.remove('menu-open');
            document.body.style.overflow = '';
            
            menuItems.forEach(item => {
                item.style.transitionDelay = '0s';
                // 關閉 submenu
                item.classList.remove('active');
            });
        }
    }

    // 點擊漢堡選單按鈕時觸發
    menuTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMenu();
    });

    // 點擊關閉按鈕時觸發
    menuClose.addEventListener('click', function(e) {
        e.preventDefault();
        if (isMenuOpen) {
            toggleMenu();
        }
    });

    // 點擊選單項目時關閉選單（手機版 submenu 展開控制）
    menuItems.forEach(item => {
        const link = item.querySelector('.menu-link');

        // 點擊 menu-link 展開 submenu（僅手機版）
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 767) {
                const submenu = item.querySelector('.submenu');
                if (submenu) {
                    e.preventDefault(); // 阻止跳轉
                    item.classList.toggle('active'); // 切換 submenu 顯示
                }
            }
        });
    });

    // 點擊選單外部區域時關閉選單
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !primaryMenu.contains(e.target) && !menuTrigger.contains(e.target)) {
            toggleMenu();
        }
    });

    // 監聽視窗大小變化
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991 && isMenuOpen) {
            toggleMenu();
        }
    });
});
