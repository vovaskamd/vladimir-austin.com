document.addEventListener("DOMContentLoaded", function () {
    const footerHTML = `
  <div class="bg-area">
      <div class="bg-area-inner">
          <div class="footer-lower-area footer-area clearfix site-skin-2">
              <div class="tipi-row">
                  <div class="va-contact-links font-2">
                      <a class="va-contact-link va-contact-phone" href="tel:0542330001">טלפון: 054-2330001</a>
                      <a class="va-contact-link va-contact-whatsapp" href="https://wa.me/message/E62EI6XFA436A1" target="_blank" rel="noopener">WhatsApp</a>
                      <a class="va-contact-link va-contact-mail" href="mailto:studio@vladimir-austin.com">studio@vladimir-austin.com</a>
                  </div>
                  <div id="to-top-wrap" class="to-top zeen-effect to-top-2 font-2">
                      <a href="#" id="to-top-a" class="tipi-arrow tipi-arrow-m tipi-arrow-t">
                          <i class="tipi-i-angle-up zeen-effect"></i>
                      </a>
                  </div>
                  <div class="copyright font-2 copyright-l">ולדימיר אוסטין</div>
              </div>
          </div>
          <div class="background mask"></div>
      </div>
  </div>`;

    const footerElement = document.getElementById('colophon');
    if (footerElement) {
        footerElement.innerHTML = footerHTML;
    }
});
