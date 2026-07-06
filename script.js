  // Preloader — fast Unicode name + bg color cycling
        (function initPreloader() {
            const preloader = document.getElementById('preloader');
            const preloaderBg = document.getElementById('preloader-bg') || preloader;
            const preloaderContent = document.getElementById('preloader-content') || document.querySelector('.loader-content-wrap');
            const preloaderShutters = document.getElementById('preloader-shutters');
            const shutterDoor = document.getElementById('shutter-door');
            const preloaderName = document.getElementById('preloader-name') || document.querySelector('.loader-logo');
            const body = document.body;
            if (!preloader || !preloaderBg || !preloaderContent || !preloaderName) return;

            const STEP_MS = 220;
            const nameSteps = [
                { text: '𝗥𝗮𝗻𝗷𝗶𝘁𝗵 𝗞𝘂𝗺𝗮𝗿 𝗔', bg: '#0a0a0a', color: '#2ecc71' },
                { text: '𝙍𝙖𝙣𝙟𝙞𝙩𝙝 𝙆𝙪𝙢𝙖𝙧 𝘼', bg: '#1a0a2e', color: '#ff6b6b' },
                { text: '𝑹𝒂𝒏𝒋𝒊𝒕𝒉 𝑲𝒖𝒎𝒂𝒓 𝑨', bg: '#0a1a3a', color: '#f39c12' },
                { text: '𝓡𝓪𝓷𝓳𝓲𝓽𝓱 𝓚𝓾𝓶𝓪𝓻 𝓐', bg: '#1e3a2f', color: '#1abc9c' },
                { text: '𝕽𝖆𝖓𝖏𝖎𝖙𝖍 𝕶𝖚𝖒𝖆𝖗 𝕬', bg: '#3d0c2e', color: '#e91e63' },
                { text: 'ℝ𝕒𝕟𝕛𝕚𝕥𝕙 𝕂𝕦𝕞𝕒𝕣 𝔸', bg: '#2c1810', color: '#3498db' },
                { text: '𝚁𝚊𝚗𝚓𝚒𝚝𝚑 𝙺𝚞𝚖𝚊𝚛 𝙰', bg: '#0c2d3d', color: '#00cec9' },
                { text: 'ʀᴀɴᴊɪᴛʜ ᴋᴜᴍᴀʀ ᴀ', bg: '#2e1a47', color: '#a29bfe' },
                { text: 'Ｒａｎｊｉｔｈ　Ｋｕｍａｒ　Ａ', bg: '#3d2e0c', color: '#f1c40f' },
                { text: 'Rᴀɴᴊɪᴛʜ Kᴜᴍᴀʀ A', bg: '#1a2838', color: '#e74c3c' },
                { text: '𝐑𝐚𝐧𝐣𝐢𝐭𝐡 𝐊𝐮𝐦𝐚𝐫 𝐀', bg: '#2a0f0f', color: '#ffffff' },
                { text: '𝖱𝖺𝗇𝗃𝗂𝗍𝗁 𝖪𝗎𝗆𝖺𝗋 𝖠', bg: '#0f1923', color: '#bb86fc' }
            ];
            const TOTAL_MS = STEP_MS * nameSteps.length;

            let stepIndex = 0;

            function applyStep(index) {
                const step = nameSteps[index];
                preloaderBg.style.backgroundColor = step.bg;
                preloaderName.textContent = step.text;
                preloaderName.style.color = step.color;
                preloaderName.classList.remove('switch');
                void preloaderName.offsetWidth;
                preloaderName.classList.add('switch');
            }

            applyStep(0);

            const cycleInterval = setInterval(() => {
                stepIndex++;
                if (stepIndex < nameSteps.length) {
                    applyStep(stepIndex);
                } else {
                    clearInterval(cycleInterval);
                }
            }, STEP_MS);

            setTimeout(() => {
                clearInterval(cycleInterval);

                const lastBg = preloaderBg.style.backgroundColor || '#0f1923';
                preloader.style.backgroundColor = lastBg;
                preloader.style.clipPath = 'circle(150% at center)';
                preloader.style.webkitClipPath = 'circle(150% at center)';
                void preloader.offsetWidth;

                const removePreloader = () => {
                    if (preloader.isConnected) preloader.remove();
                };

                preloader.addEventListener('transitionend', (event) => {
                    if (event.target === preloader && (event.propertyName === 'clip-path' || event.propertyName === '-webkit-clip-path')) {
                        removePreloader();
                    }
                });

                body.classList.remove('preloader-active');

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        preloader.style.clipPath = 'circle(0% at center)';
                        preloader.style.webkitClipPath = 'circle(0% at center)';
                        preloader.classList.add('hide');
                    });
                });

                setTimeout(removePreloader, 1600);
            }, TOTAL_MS);
        })();

        // Create advanced background animation
        const bgAnimation = document.querySelector('.floating-shapes');
        for (let i = 0; i < 10; i++) {
            const div = document.createElement('div');
            div.style.left = Math.random() * 100 + 'vw';
            div.style.top = Math.random() * 100 + 'vh';
            div.style.width = Math.random() * 100 + 50 + 'px';
            div.style.height = div.style.width;
            div.style.animationDelay = Math.random() * 20 + 's';
            div.style.animationDuration = Math.random() * 10 + 20 + 's';
            bgAnimation.appendChild(div);
        }

        // Mobile menu toggle
        const menuToggle = document.getElementById('menu-toggle');
        const navbar = document.getElementById('navbar');
        
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            menuToggle.innerHTML = navbar.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // Active navigation on scroll
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - 300)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
            
            // Timeline animation on scroll
            const timelineItems = document.querySelectorAll('.timeline-item');
            timelineItems.forEach(item => {
                const itemTop = item.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (itemTop < windowHeight * 0.8) {
                    item.classList.add('visible');
                }
            });
        });

        // Add smooth scrolling for all links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Initialize timeline animation
        window.dispatchEvent(new Event('scroll'));


        // LeetCard — auto-refresh image from leetcard.jacoblin.cool
        (function initLeetCard() {
            const img = document.getElementById('lc-leetcard');
            if (!img) return;
            const base = 'https://leetcard.jacoblin.cool/ranjith_ak?theme=dark&font=Source%20Serif%204&ext=heatmap';

            function refresh() {
                img.src = base + '&_t=' + Date.now();
            }

            setInterval(refresh, 2 * 60 * 1000);
            document.addEventListener('visibilitychange', function() {
                if (document.visibilityState === 'visible') refresh();
            });
        })();

        // Certifications carousel — 2 per view desktop, 1 mobile
        (function initCertCarousel() {
            const track = document.getElementById('cert-track');
            const viewport = document.getElementById('cert-viewport');
            const dotsContainer = document.getElementById('cert-dots');
            const certCounter = document.getElementById('cert-counter');
            const prevBtn = document.getElementById('cert-prev');
            const nextBtn = document.getElementById('cert-next');
            if (!track || !viewport) return;

            const slides = track.querySelectorAll('.cert-slide');
            const DESKTOP_BP = 992;
            const INTERVAL = 3000;
            let currentPage = 0;
            let autoTimer;
            let startX = 0;
            let currentX = 0;
            let isDragging = false;
            let dots = [];

            function slidesPerView() {
                return window.innerWidth >= DESKTOP_BP ? 2 : 1;
            }

            function totalPages() {
                return Math.ceil(slides.length / slidesPerView());
            }

            function getSlideWidth() {
                return viewport.offsetWidth / slidesPerView();
            }

            function buildDots() {
                dotsContainer.innerHTML = '';
                const pages = totalPages();
                for (let i = 0; i < pages; i++) {
                    const dot = document.createElement('button');
                    dot.type = 'button';
                    dot.className = 'cert-dot' + (i === currentPage ? ' active' : '');
                    dot.setAttribute('aria-label', 'Go to page ' + (i + 1));
                    dot.addEventListener('click', function() { goTo(i); });
                    dotsContainer.appendChild(dot);
                }
                dots = dotsContainer.querySelectorAll('.cert-dot');
            }

            function updateCounter() {
                if (!certCounter) return;
                const spv = slidesPerView();
                const start = currentPage * spv + 1;
                const end = Math.min((currentPage + 1) * spv, slides.length);
                certCounter.textContent = (start === end ? start : start + '-' + end) + ' / ' + slides.length;
            }

            function updatePosition(animate) {
                const spv = slidesPerView();
                const slideW = getSlideWidth();
                const offset = currentPage * spv * slideW;

                slides.forEach(function(s) {
                    s.style.flex = '0 0 ' + slideW + 'px';
                    s.style.width = slideW + 'px';
                });

                if (!animate) track.classList.add('no-transition');
                track.style.transform = 'translateX(-' + offset + 'px)';
                if (!animate) {
                    void track.offsetWidth;
                    track.classList.remove('no-transition');
                }

                dots.forEach(function(d, i) { d.classList.toggle('active', i === currentPage); });
                updateCounter();
            }

            function goTo(page) {
                const pages = totalPages();
                currentPage = ((page % pages) + pages) % pages;
                updatePosition(true);
                resetAuto();
            }

            function next() { goTo(currentPage + 1); }
            function prev() { goTo(currentPage - 1); }

            function resetAuto() {
                clearInterval(autoTimer);
                autoTimer = setInterval(next, INTERVAL);
            }

            function onResize() {
                if (currentPage >= totalPages()) currentPage = totalPages() - 1;
                buildDots();
                updatePosition(false);
            }

            prevBtn.addEventListener('click', prev);
            nextBtn.addEventListener('click', next);

            function getX(e) {
                if (e.type.includes('mouse')) return e.pageX;
                return e.touches[0].clientX;
            }

            function onStart(e) {
                if (e.type === 'mousedown' && e.button !== 0) return;
                isDragging = true;
                startX = getX(e);
                currentX = startX;
                track.classList.add('no-transition');
                viewport.classList.add('is-dragging');
                clearInterval(autoTimer);
            }

            function onMove(e) {
                if (!isDragging) return;
                if (e.type === 'touchmove') e.preventDefault();
                currentX = getX(e);
                const diff = currentX - startX;
                const offset = currentPage * slidesPerView() * getSlideWidth() - diff;
                track.style.transform = 'translateX(-' + offset + 'px)';
            }

            function onEnd() {
                if (!isDragging) return;
                isDragging = false;
                viewport.classList.remove('is-dragging');
                track.classList.remove('no-transition');
                const diff = currentX - startX;
                if (diff < -60) next();
                else if (diff > 60) prev();
                else updatePosition(true);
                resetAuto();
            }

            viewport.addEventListener('mousedown', onStart);
            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', onEnd);
            viewport.addEventListener('touchstart', onStart, { passive: true });
            viewport.addEventListener('touchmove', onMove, { passive: false });
            viewport.addEventListener('touchend', onEnd);
            window.addEventListener('resize', onResize);

            buildDots();
            updatePosition(false);
            resetAuto();
        })();
        
        // Add typing effect
        const typingText = document.querySelector('.typing-text span');
        if (typingText) {
        let charIndex = 0;
        let currentText = '';
        let isDeleting = false;
        let textArray = ['Software Developer', 'Java Full Stack Developer', 'AI & Data Science Student', 'Problem Solver', 'Web Developer'];
        let textIndex = 0;
        
        function typeEffect() {
            const current = textArray[textIndex];
            
            if (isDeleting) {
                currentText = current.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentText = current.substring(0, charIndex + 1);
                charIndex++;
            }
            
            typingText.textContent = currentText;
            
            let typeSpeed = 100;
            
            if (isDeleting) {
                typeSpeed /= 2;
            }
            
            if (!isDeleting && charIndex === current.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textArray.length;
                typeSpeed = 500;
            }
            
            setTimeout(typeEffect, typeSpeed);
        }
        
        // Start typing effect after page loads
        setTimeout(typeEffect, 1000);
        }

        // Dynamic Views Counter
        (async function initViewsCounter() {
            const counterElement = document.getElementById('views-count');
            if (!counterElement) return;
            try {
                // Hits CounterAPI to count and get page views
                const response = await fetch('https://api.counterapi.dev/v1/Ranjith2703/portfolio/up');
                if (response.ok) {
                    const data = await response.json();
                    counterElement.textContent = Number(data.count).toLocaleString();
                } else {
                    counterElement.textContent = '1,850+';
                }
            } catch (error) {
                console.error('Error fetching counter:', error);
                counterElement.textContent = '1,850+';
            }
        })();
