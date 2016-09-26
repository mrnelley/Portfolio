$(window).load(function () {

    // preloader
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(550).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(550).css({
        'overflow': 'visible'
    });


    //  isotope
    var $container = $('.portfolio_container');
    $container.isotope({
        filter: '*',
    });

    $('.portfolio_filter a').click(function () {
        $('.portfolio_filter .active').removeClass('active');
        $(this).addClass('active');

        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 500,
                animationEngine: "jquery"
            }
        });
        return false;
    });

    // back to top
    var offset = 300,
        offset_opacity = 1200,
        scroll_top_duration = 700,
        $back_to_top = $('.cd-top');

    //hide or show the "back to top" link
    $(window).scroll(function () {
        ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible'): $back_to_top.removeClass('cd-is-visible cd-fade-out');
        if ($(this).scrollTop() > offset_opacity) {
            $back_to_top.addClass('cd-fade-out');
        }
    });

    //smooth scroll to top
    $back_to_top.on('click', function (event) {
        event.preventDefault();
        $('body,html').animate({
            scrollTop: 0,
        }, scroll_top_duration);
    });

    // input
    $(".input-contact input, .textarea-contact textarea").focus(function () {
        $(this).next("span").addClass("active");
    });
    $(".input-contact input, .textarea-contact textarea").blur(function () {
        if ($(this).val() === "") {
            $(this).next("span").removeClass("active");
        }
    });

    var canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");

    var TAU = 2 * Math.PI;

    times = [];
    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      update();
      draw();
      requestAnimationFrame(loop);
    }

    function Ball (startX, startY, startVelX, startVelY) {
      this.x = startX || Math.random() * canvas.width;
      this.y = startY || Math.random() * canvas.height;
      this.vel = {
        x: startVelX || Math.random() * 2 - 1,
        y: startVelY || Math.random() * 2 - 1
      };
      this.update = function(canvas) {
        if (this.x > canvas.width + 50 || this.x < -50) {
          this.vel.x = -this.vel.x;
        }
        if (this.y > canvas.height + 50 || this.y < -50) {
          this.vel.y = -this.vel.y;
        }
        this.x += this.vel.x;
        this.y += this.vel.y;
      };
      this.draw = function(ctx, can) {
        ctx.beginPath();
        ctx.globalAlpha = .4;
        ctx.fillStyle = '#999999';
        ctx.arc((0.5 + this.x) | 0, (0.5 + this.y) | 0, 3, 0, TAU, false);
        ctx.fill();
      }
    }

    var balls = [];
    for (var i = 0; i < canvas.width * canvas.height / (65*65); i++) {
      balls.push(new Ball(Math.random() * canvas.width, Math.random() * canvas.height));
    }

    var lastTime = Date.now();
    function update() {
      var diff = Date.now() - lastTime;
      for (var frame = 0; frame * 16.6667 < diff; frame++) {
        for (var index = 0; index < balls.length; index++) {
          balls[index].update(canvas);
        }
      }
      lastTime = Date.now();
    }
    var mouseX = -1e9, mouseY = -1e9;
    document.addEventListener('mouseover', function(event) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });

    function distMouse(ball) {
      return Math.hypot(ball.x - mouseX, ball.y - mouseY);
    }

    function draw() {
      ctx.globalAlpha=1;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0,0,canvas.width, canvas.height);
      for (var index = 0; index < balls.length; index++) {
        var ball = balls[index];
        ball.draw(ctx, canvas);
        ctx.beginPath();
        for (var index2 = balls.length - 1; index2 > index; index2 += -1) {
          var ball2 = balls[index2];
          var dist = Math.hypot(ball.x - ball2.x, ball.y - ball2.y);
            if (dist < 100) {
              ctx.strokeStyle = "#999999";
              ctx.globalAlpha = 1 - (dist > 100 ? .8 : dist / 150);
              ctx.lineWidth = "2px";
              ctx.moveTo((0.5 + ball.x) | 0, (0.5 + ball.y) | 0);
              ctx.lineTo((0.5 + ball2.x) | 0, (0.5 + ball2.y) | 0);
            }
        }
        ctx.stroke();
      }
    }

    // Start
    loop();

    // function sendMail(){
    //   window.open('mailto:contact@parnellkelley.com?subject=subject&body=body');
    // }
});
