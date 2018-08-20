var Guide = {
    init: function() {
        this.bindJumper()
    },
    isTrue: !1,
    setProgression: function() {
        $(".bullets a").click(function() {
            var a = $(".bullets a").index(this);
            $(this).addClass("bullet-active").siblings().removeClass("bullet-active"),
            $(".progression .level").stop().eq(a).fadeIn().siblings(".level").fadeOut()
        }),
        $(".toggler .prev").click(function() {
            var a = $(".bullet-active").data("level");
            a > 1 && ($(".progression .level").eq(a - 2).fadeIn().siblings(".level").fadeOut(), $(".bullets a").eq(a - 2).addClass("bullet-active").siblings().removeClass("bullet-active"))
        }),
        $(".toggler .next").click(function() {
            var a = $(".bullet-active").data("level"),
            b = $(".progression .level").length;
            b > a && ($(".progression .level").eq(a).fadeIn().siblings(".level").fadeOut(), $(".bullets a").eq(a).addClass("bullet-active").siblings().removeClass("bullet-active"))
        })
    },
    bindJumper: function() {
        var a = $("#page-jumper"),
        b = a.find(".jump-tip");
        a.length && a.find("a").hover(function() {
            var a = $(this).data("title");
            if (!a) return void b.hide();
            b.find(".jump-tip-text").text(a);
            var c = $(this),
            d = b.find(".jump-tip-arrow"),
            e = 0;
            c.hasClass("jump-index") || (e = c.offset().left - c.parent().offset().left),
            d.css("left", e + 10 + "px"),
            b.show()
        },
        function() {
            b.hide()
        })
    },
    getBoxwrap: function(a, b) {
        var c = ['<div id="lightbox-container" style="display:block;width:' + a + "px;height: " + b + 'px;">', '<h2 id="lightbox-title"></h2>', '<div id="lightbox-content">', "", "</div>", '<div class="corner corner-top-left"></div>', '<div class="corner corner-top-right"></div>', '<div class="corner corner-bottom-left"></div>', '<div class="corner corner-bottom-right"></div>', '<div class="border" id="lb-border-top" ></div>', '<div class="border" id="lb-border-right" ></div>', '<div class="border" id="lb-border-bottom" ></div>', '<div class="border" id="lb-border-left" ></div>', '<div class="control-wrapper no-paging no-gallery">', '<p class="title"></p>', "</div>", '<div class = "control-wrapper" style="display:none">', '<div class = "lightbox-controls ui-element">', '<a class = "ui-element previous" href = "javascript:;" ></a>', '<a class="ui-element next" href="javascript:;"></a >', '<a class = "ui-element gallery-view" href = "/media/" target="_blank"></a>', "</div >", "</div>", '<a class="ui-element lightbox-close" href="javascript:;"></a>', "</div>"];
        return c
    },
    lightBox: function(a, b) {
        var c = a.attr("data-img"),
        d = a.attr("data-flv"),
        e = a.attr("data-mp4"),
        f = a.attr("type"),
        g = a.attr("rel");
        if ("image" == b) {
            var h = 360,
            i = 100,
            j = Guide.getBoxwrap(h, i),
            k = '<div class="hos_lightbox" data-imgType="' + f + '"><img src="http://diablo3.nos.netease.com/1/gameguide/layout/brighter.gif" class="loading" /><img class="largeImg" src="" /></div>';
            j[3] = k
        } else if ("video" == b) {
            var h = 960,
            i = 500,
            j = Guide.getBoxwrap(h, i);
            j[3] = Common.isMobile() ? Common.showIosVideo(e, h, i) : Common.videoWrap("http://v.163.com/swf/video/NetEaseFlvPlayerV3.swf", h, i, d)
        }
        $.hos.lightBox(j.join(""), {
            model: !0,
            hasClose: !1,
            callback: function() {
                if ("image" == b && !Guide.isTrue) if (c) $.imgpreload(c, {
                    all: function() {
                        $(".largeImg").attr("src", c),
                        setTimeout(function() {
                            var a = $(".largeImg").width(),
                            b = $(".largeImg").height();
                            Guide.setPosition($("#popBox"), a, b)
                        },
                        300)
                    }
                });
                else {
                    var a = Guide[f][g];
                    $.imgpreload(a, {
                        all: function() {
                            $(".control-wrapper").show(),
                            $(".largeImg").attr("src", a),
                            setTimeout(function() {
                                var a = $(".largeImg").width(),
                                b = $(".largeImg").height();
                                Guide.setPosition($("#popBox"), a, b),
                                Guide.setCtrl(g, f)
                            },
                            300)
                        }
                    })
                }
            }
        })
    },
    setCtrl: function(a, b) {
        var c = Guide[b].length - 1,
        d = $(".control-wrapper .previous"),
        e = $(".control-wrapper .next");
        d.off("click").on("click",
        function() {
            if (!Guide.isTrue) {
                Guide.isTrue = !0;
                var d = $(".hos_lightbox").attr("data-imgType");
                if (d != b) return;
                a > 0 ? ($(".largeImg").hide(), a--, $.imgpreload(Guide[b][a], {
                    all: function() {
                        $(".largeImg").attr("src", Guide[b][a]),
                        setTimeout(function() {
                            var a = $(".largeImg").width(),
                            b = $(".largeImg").height();
                            Guide.setPosition($("#popBox"), a, b)
                        },
                        300)
                    }
                })) : 0 == a && ($(".largeImg").hide(), a = c, $.imgpreload(Guide[b][a], {
                    all: function() {
                        $(".largeImg").attr("src", Guide[b][a]),
                        setTimeout(function() {
                            var a = $(".largeImg").width(),
                            b = $(".largeImg").height();
                            Guide.setPosition($("#popBox"), a, b)
                        },
                        300)
                    }
                }))
            }
        }),
        e.off("click").on("click",
        function() {
            if (!Guide.isTrue) {
                Guide.isTrue = !0;
                var d = $(".hos_lightbox").attr("data-imgType");
                if (d != b) return;
                c > a ? ($(".largeImg").hide(), a++, $.imgpreload(Guide[b][a], {
                    all: function() {
                        $(".largeImg").attr("src", Guide[b][a]),
                        setTimeout(function() {
                            var a = $(".largeImg").width(),
                            b = $(".largeImg").height();
                            Guide.setPosition($("#popBox"), a, b)
                        },
                        300)
                    }
                })) : a == c && ($(".largeImg").hide(), a = 0, $.imgpreload(Guide[b][a], {
                    all: function() {
                        $(".largeImg").attr("src", Guide[b][a]),
                        setTimeout(function() {
                            var a = $(".largeImg").width(),
                            b = $(".largeImg").height();
                            Guide.setPosition($("#popBox"), a, b)
                        },
                        300)
                    }
                }))
            }
        })
    },
    setPosition: function(a, b, c) {
        var d = $("#lightbox-container");
        d.stop(!0, !0).animate({
            width: b,
            height: c
        });
        var e = $(window).width(),
        f = $(window).height(),
        g = $(window).scrollTop(),
        h = $(".largeImg").width(),
        i = $(".largeImg").height(),
        j = (e - h) / 2,
        k = (f - i) / 2 + g;
        a.stop(!0, !0).animate({
            left: j,
            top: k
        },
        function() {
            $(".largeImg").show(),
            Guide.isTrue = !1
        })
    },
    toggleSex: function(a, b) {
        var c = $("#character-model"),
        d = $(".model-flash");
        $(a).click(function() {
            if ($(this).siblings().removeClass("active").end().addClass("active"), Common.isMobile()) c.hasClass("hero-female") && c.attr("class", "character-model hero-male");
            else {
                if (d.eq(0).is(":visible")) return;
                d.eq(1).stop().hide(),
                d.eq(0).stop().fadeIn(1500)
            }
        }),
        $(b).click(function() {
            if ($(this).siblings().removeClass("active").end().addClass("active"), Common.isMobile()) c.hasClass("hero-male") && c.attr("class", "character-model hero-female");
            else {
                if (d.eq(1).is(":visible")) return;
                d.eq(0).stop().hide(),
                d.eq(1).stop().fadeIn(1500)
            }
        })
    }
};