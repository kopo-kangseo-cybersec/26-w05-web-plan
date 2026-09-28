// 1. DOM 요소 선택
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link, .cta-button');

// 2. 모바일 햄버거 메뉴 토글 기능
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const isActive = navMenu.classList.contains('active');
        hamburger.setAttribute('aria-label', isActive ? '메뉴 닫기' : '메뉴 열기');
    });
}

// 3. 네비게이션 링크 클릭 시 부드러운 스크롤 이동 및 메뉴 닫기
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        // 앵커 링크(#)가 아니거나 존재하지 않는 경우 스킵
        if (!targetId || !targetId.startsWith('#') || targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault(); // 기본 앵커 이동 동작 방지
            
            // 모바일 메뉴 열려있을 경우 자동으로 닫기
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (hamburger) {
                hamburger.setAttribute('aria-label', '메뉴 열기');
            }
            
            // 상단 고정 네비게이션 바의 높이(px) 계산 및 스크롤 위치 보정
            const headerHeight = 70; 
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerHeight;

            // 부드러운 스크롤 실행
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
