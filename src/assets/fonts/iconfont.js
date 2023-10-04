;(function (window) {
    var svgSprite =
        "<svg>" +
        "" +
        '<symbol id="icon-search" viewBox="0 0 1024 1024">' +
        "" +
        '<path d="M568.94085 46.341445c-195.393155 0-353.790722 158.397566-353.790722 353.790722 0 99.347682 40.96704 189.114149 106.907868 253.375731l-0.211824-0.171915L110.778013 901.270794c-18.418488 23.023366-6.836709 39.180348 7.372921 50.891064 23.213701 19.130709 41.74373 4.364401 41.74373 4.364401l213.273385-261.328867-0.057305-0.046049c56.278771 37.757952 122.966613 58.770522 195.830107 58.770522 195.393155 0 353.790722-158.397566 353.790722-353.790722S764.334006 46.341445 568.94085 46.341445zM568.94085 704.627159c-168.168094 0-304.496016-136.326898-304.496016-304.496016S400.772756 95.636151 568.94085 95.636151 873.436866 231.964072 873.436866 400.132166 737.108944 704.627159 568.94085 704.627159z"  ></path>' +
        "" +
        "</symbol>" +
        "" +
        '<symbol id="icon-iconfontgengduo" viewBox="0 0 1024 1024">' +
        "" +
        '<path d="M65.075623 799.979854l893.847731 0 0-65.155952L65.075623 734.823901 65.075623 799.979854zM65.075623 544.595372l893.847731 0 0-65.157999L65.075623 479.437373 65.075623 544.595372zM65.075623 224.02117l0 65.187675 893.847731 0 0-65.187675L65.075623 224.02117z"  ></path>' +
        "" +
        "</symbol>" +
        "" +
        '<symbol id="icon-iconfont" viewBox="0 0 1024 1024">' +
        "" +
        '<path d="M88.788328 66.71444l24.221574-24.221574 822.190304 822.190304-24.221574 24.221574-822.190304-822.190304ZM821.127454 616.648196l0-259.780182c0-126.327235-103.041914-242.851476-231.243074-277.611592l0-2.175398c0-42.488773-34.592251-77.081024-77.081024-77.081024s-77.081024 34.592251-77.081024 77.081024l0 2.175398c-51.320547 13.917407-98.425617 41.082473-136.698915 76.579142l543.883709 543.883709C830.428564 679.410993 821.127454 652.511428 821.127454 616.648196zM204.479257 356.868014l0 259.780182c0 98.024795-68.751135 130.876728-84.876486 137.233343-11.709464 5.988339-19.772139 18.098625-19.772139 32.183898 0 19.97255 16.159609 36.132159 36.132159 36.132159l258.140925 0c5.520715 61.022478 56.272574 109.198119 118.699639 109.198119s113.178925-48.17564 118.699639-109.198119l140.111035 0L220.503546 271.088824C210.267186 298.555363 204.479257 327.426489 204.479257 356.868014zM562.484646 822.197596c-5.018831 23.08491-25.09073 40.681651-49.68129 40.681651s-44.629914-17.564196-49.647031-40.681651L562.484646 822.197596z"  ></path>' +
        "" +
        "</symbol>" +
        "" +
        '<symbol id="icon-favorite" viewBox="0 0 1024 1024">' +
        "" +
        '<path d="M119.693568 748.775658 502.351758 959.24416 502.351758 545.089629 119.693568 327.8407Z"  ></path>' +
        "" +
        '<path d="M520.510326 64.75584 149.097248 269.033339 517.415848 491.8818 891.925451 269.033339Z"  ></path>' +
        "" +
        '<path d="M542.176788 545.089629 542.176788 959.24416 904.305409 752.166895 904.305409 327.8407Z"  ></path>' +
        "" +
        "</symbol>" +
        "" +
        '<symbol id="icon-icong-2" viewBox="0 0 1024 1024">' +
        "" +
        '<path d="M881.137 824.103c-32.028-6.411-294.542-186.476-294.542-186.476s-45.602-64.86 2.397-124.847c47.781-59.699 155.655-397.1-106.736-408.016v-0.166c-0.758 0.020-1.501 0.057-2.254 0.084-0.753-0.027-1.495-0.063-2.254-0.084v0.166c-262.338 10.918-154.466 348.316-106.738 408.015 48.001 59.987 2.397 124.847 2.397 124.847s-262.489 180.066-294.489 186.477c-32.027 6.358 0 83.205 0 83.205h802.218c0-0.001 31.999-76.847 0-83.205z"  ></path>' +
        "" +
        '<path d="M708.15603 349.45395l253.240655 0 0 49.287543-253.240655 0 0-49.287543Z"  ></path>' +
        "" +
        '<path d="M758.543627 483.666698l201.342658 0 0 50.661843-201.342658 0 0-50.661843Z"  ></path>' +
        "" +
        '<path d="M808.906665 618.198717l152.055115 0 0 50.638307-152.055115 0 0-50.638307Z"  ></path>' +
        "" +
        "</symbol>" +
        "" +
        '<symbol id="icon-xiaoxi" viewBox="0 0 1025 1024">' +
        "" +
        '<path d="M512.448 864.704c-32.768 0-64.704-2.752-95.808-7.424l-224.512 124.992 0-208.128C75.136 698.688 0 583.04 0 453.248c0-227.264 229.376-411.456 512.448-411.456s512.448 184.192 512.448 411.456C1024.896 680.512 795.52 864.704 512.448 864.704L512.448 864.704z"  ></path>' +
        "" +
        "</symbol>" +
        "" +
        '<symbol id="icon-biaoqing" viewBox="0 0 1024 1024">' +
        "" +
        '<path d="M512 0C229.229985 0 0 229.228089 0 512c0 282.768119 229.229985 512 512 512 282.771911 0 512-229.231881 512-512C1024 229.228089 794.770015 0 512 0zM512 986.074074c-261.82163 0-474.074074-212.250548-474.074074-474.074074S250.176474 37.925926 512 37.925926c261.823526 0 474.074074 212.250548 474.074074 474.074074S773.82163 986.074074 512 986.074074z"  ></path>' +
        "" +
        '<path d="M312.888889 407.703704m-66.37037 0a35 35 0 1 0 132.740741 0 35 35 0 1 0-132.740741 0Z"  ></path>' +
        "" +
        '<path d="M711.111111 407.703704m-66.37037 0a35 35 0 1 0 132.740741 0 35 35 0 1 0-132.740741 0Z"  ></path>' +
        "" +
        '<path d="M272.090074 625.777778C297.773511 734.498133 395.43277 815.407407 512 815.407407s214.226489-80.909274 239.909926-189.62963L272.090074 625.777778z"  ></path>' +
        "" +
        "</symbol>" +
        "" +
        "</svg>"
    var script = (function () {
        var scripts = document.getElementsByTagName("script")
        return scripts[scripts.length - 1]
    })()
    var shouldInjectCss = script.getAttribute("data-injectcss")
    var ready = function (fn) {
        if (document.addEventListener) {
            if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
                setTimeout(fn, 0)
            } else {
                var loadFn = function () {
                    document.removeEventListener("DOMContentLoaded", loadFn, false)
                    fn()
                }
                document.addEventListener("DOMContentLoaded", loadFn, false)
            }
        } else if (document.attachEvent) {
            IEContentLoaded(window, fn)
        }
        function IEContentLoaded(w, fn) {
            var d = w.document,
                done = false,
                init = function () {
                    if (!done) {
                        done = true
                        fn()
                    }
                }
            var polling = function () {
                try {
                    d.documentElement.doScroll("left")
                } catch (e) {
                    setTimeout(polling, 50)
                    return
                }
                init()
            }
            polling()
            d.onreadystatechange = function () {
                if (d.readyState == "complete") {
                    d.onreadystatechange = null
                    init()
                }
            }
        }
    }
    var before = function (el, target) {
        target.parentNode.insertBefore(el, target)
    }
    var prepend = function (el, target) {
        if (target.firstChild) {
            before(el, target.firstChild)
        } else {
            target.appendChild(el)
        }
    }
    function appendSvg() {
        var div, svg
        div = document.createElement("div")
        div.innerHTML = svgSprite
        svgSprite = null
        svg = div.getElementsByTagName("svg")[0]
        if (svg) {
            svg.setAttribute("aria-hidden", "true")
            svg.style.position = "absolute"
            svg.style.width = 0
            svg.style.height = 0
            svg.style.overflow = "hidden"
            prepend(svg, document.body)
        }
    }
    if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
        window.__iconfont__svg__cssinject__ = true
        try {
            document.write(
                "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
            )
        } catch (e) {
            console && console.log(e)
        }
    }
    ready(appendSvg)
})(window)
