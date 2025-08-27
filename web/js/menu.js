document.addEventListener('DOMContentLoaded', function() {
    const menuTrigger = document.querySelector('.primary-menu-trigger');
    const menuClose = document.querySelector('.menu-close');
    const primaryMenu = document.querySelector('.primary-menu');
    const menuItems = document.querySelectorAll('.primary-menu .menu-item');
    let isMenuOpen = false;

    // 選單開關功能
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            primaryMenu.classList.add('menu-open');
            document.body.style.overflow = 'hidden';
            
            // 為每個選單項目添加延遲動畫
            menuItems.forEach((item, index) => {
                item.style.transitionDelay = `${index * 0.1}s`;
            });
        } else {
            primaryMenu.classList.remove('menu-open');
            document.body.style.overflow = '';
            
            // 重置選單項目的延遲
            menuItems.forEach(item => {
                item.style.transitionDelay = '0s';
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

    // 點擊選單項目時關閉選單
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            if (isMenuOpen) {
                toggleMenu();
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