const searchEl = document.querySelector('.search');
// const searchInputEl = document.querySelector('.search input'); 이게 길고, 위에서 찾아놓은 요소에서 찾는거니까 아래처럼 단축 가능
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function() {
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});

searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});

// 뱃지가 일정 스크롤 이상에 사라지는
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top')

window.addEventListener('scroll', _.throttle(function() {
  console.log(window.scrollY);
  if (window,scrollY > 500) {
  // 배지 숨기기   badgeEl.style.display = 'none' 이거를 외부라이브러리 gsap 대체
    // gsap.to(요소, 지속시간, 옵션);
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    });

    // 상단으로 스크롤 버튼 보이기!
    gsap.to(toTopEl, .2, {
      x: 0
    })
    // toTopEl 대신 상단에 const toTopEl = document.querySelector('#to-top') 추가함으로 '#to-top' 가능

    } else {
    //배지보이기 badgeEl.style.display = 'block'
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
     // 상단으로 스크롤 버튼 숨기기!
     gsap.to(toTopEl, .2, {
      x: 100
    })
  }
}, 300));

// 상단으로 스크롤 버튼을 클릭하면,
toTopEl.addEventListener('click', function () {
  // 페이지 위치를 최상단으로 부드럽게(0.7초 동안) 이동.
  gsap.to(window, .7, {
    scrollTo: 0
  })
})

// function 바로 입력하면 scroll할 때 마다 실행될 수 있는 함수가 수십개임. 사이트 내용이 많아질수록 사이트가 무거워지고 버벅여짐
// 그래서 실행되는 함수의 수를 외부에서 가지고 올 수 있는 자바스크립트라이브러리를 통해 제어. lodash cdn 검색. cdnjs.com 사용
// 라이브러리 삽입 후 _.throttle(함수, 시간)을 활용해 throttle 과 300 사용해서 0.3초 단위로 부하를 줘서 함수가 우르르 실행되는걸 막음


const fadeEls = document.querySelectorAll('.visual .fade-in')
fadeEls.forEach(function (fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, //index 는 0에서 시작 ,0.7 1.4 2.1 이렇게 반복하면서 첫번째 두번째 요소가 실행됨
    opacity: 1
  });
});


// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true
});
new Swiper('.promotion .swiper-container', {
// 수평슬라이드 horizontal 은 기본값이라 안써도됨
  slidesPerView: 3, // 한 번에 보여줄 슬라이드 개수
  spaceBetween: 10, //ㄴ 슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: { // 자동 재생 여부
    delay: 5000 // 5초마다 슬라이드 바뀜
  },
  pagination: { // 페이지 번호 사용 여부
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
    clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: { 
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next' 
  }
})

new Swiper('.awards .swiper-container', {
  // direction: 'horizontal', // 수평 슬라이드
  autoplay: true, // 자동 재생 여부
  loop: true, // 반복 재생 여부
  spaceBetween: 30, // 슬라이드 사이 여백
  slidesPerView: 5, // 한 번에 보여줄 슬라이드 개수
  // slidesPerGroup: 5, // 한 번에 슬라이드 할 개수(전체 개수로 나뉘어야 함)
  navigation: { // 슬라이드 이전/다음 버튼 사용 여부
    prevEl: '.awards .swiper-prev', // 이전 버튼 선택자
    nextEl: '.awards .swiper-next' // 다음 버튼 선택자
  }
})


const promotionEl = document.querySelector('.promotion')
const promotionToggleBtn = document.querySelector('.toggle-promotion')
let isHidePromotion = false
promotionToggleBtn.addEventListener('click', function () {
  // !가 반대값, 특정 변수의 값을 지속적으로 반대값으로 전환시켜줄 수 있음. false 의 반대값
  isHidePromotion = !isHidePromotion
  // 숨김 처리!
  if (isHidePromotion) { 
    promotionEl.classList.add('hide')
  // 보임 처리!
  } else {
    promotionEl.classList.remove('hide')
  }
})

// 범위 랜덤 함수(소수점 2자리까지) github 스벅에 있음
function random(min, max) {
  // `.toFixed()`를 통해 반환된 '문자 데이터'를,
  // `parseFloat()`을 통해 소수점을 가지는 '숫자 데이터'로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
  gsap.to(
    selector, // 선택자
    random(1.5, 2.5), // (최소,최대 범위 내 소수점 2자리까지 랜덤 값) 애니메이션 동작 시간
    {
      delay: random(0, delay), // 얼마나 늦게 애니메이션을 시작할 것인지 지연 시간을 설정.
      y: size, // `transform: translateY(수치);`와 같음. 수직으로 얼마나 움직일지 설정.
      repeat: -1, // 몇 번 반s복하는지를 설정, `-1`은 무한 반복.
      yoyo: true, // 한번 재생된 애니메이션을 다시 뒤로 재생.
      ease: Power1.easeInOut //  gsap easing 검색, type ease inout
    }
  );
}
floatingObject('.floating1', 1, 15)
floatingObject('.floating2', .5, 15)
floatingObject('.floating3', 1.5, 20)


// scrollmagic cdn 검색, min
const spyEls = document.querySelectorAll('section.scroll-spy')
// 요소들 반복 처리!
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({ // 감시할 장면(Scene)을 추가
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8 // 화면의 80% 지점에서 보여짐 여부 감시
    })
    .setClassToggle(spyEl, 'show') // 요소가 화면에 보이면 show 클래스 추가
    .addTo(new ScrollMagic.Controller()) // 이부분은 왜 필요한지 이해하기 어려움. 컨트롤러에 장면을 할당(필수!)
  })

const thisYear = document.querySelector('.this-year')
thisYear.textContent = new Date().getFullYear()
