// 平滑滾動 - 只處理頁內錨點連結（#開頭但不是完整URL）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    const href = anchor.getAttribute('href');
    // 確保只處理純錨點連結，不影響導航欄
    if (href && href.length > 1 && !anchor.classList.contains('nav-tab')) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

// 導航列固定效果
let lastScroll = 0;
const nav = document.querySelector('.main-nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-up');
        nav.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-down');
        nav.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// 導航列滑動提示 - 當滑到最右邊時隱藏箭頭
const navTabs = document.querySelector('.nav-tabs');
const navContainer = document.querySelector('.main-nav .container');

if (navTabs && navContainer) {
    const checkScrollEnd = () => {
        const isAtEnd = navTabs.scrollLeft + navTabs.clientWidth >= navTabs.scrollWidth - 10;
        if (isAtEnd) {
            navContainer.classList.add('scroll-end');
        } else {
            navContainer.classList.remove('scroll-end');
        }
    };
    
    navTabs.addEventListener('scroll', checkScrollEnd);
    window.addEventListener('resize', checkScrollEnd);
    
    // 頁面載入時，自動滑動到當前 active 的分頁（不干擾點擊行為）
    const activeTab = navTabs.querySelector('.nav-tab.active');
    if (activeTab) {
        // 使用 requestAnimationFrame 確保 DOM 完全載入後再執行
        requestAnimationFrame(() => {
            // 計算需要滑動的位置，讓 active tab 置中
            const tabRect = activeTab.getBoundingClientRect();
            const containerRect = navTabs.getBoundingClientRect();
            const scrollTarget = activeTab.offsetLeft - (containerRect.width / 2) + (tabRect.width / 2);
            
            navTabs.scrollTo({
                left: Math.max(0, scrollTarget),
                behavior: 'auto'
            });
            
            setTimeout(checkScrollEnd, 50);
        });
    } else {
        checkScrollEnd();
    }
}

// 載入完成提示
console.log('🎉 澳門旅遊網站已載入！');
console.log('📅 2026年1月10-12日');
console.log('👨‍👩‍👧‍👦 7人家庭旅行');