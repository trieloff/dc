import {createTag} from "../../scripts/miloUtils.js";
// Could use webpack/rollup. Just manually inline these structures, for now.
const localeMap = {
  '': 'en-us',
  'br': 'pt-br',
  'ca': 'en-ca',
  'ca_fr': 'fr-ca',
  'mx': 'es-mx',
  'la': 'es-la',
  'africa': 'en-africa',
  'za': 'en-za',
  'be_nl': 'nl-be',
  'be_fr': 'fr-be',
  'be_en': 'en-be',
  'cz': 'cs-cz',
  'cy_en': 'en-cy',
  'dk': 'da-dk',
  'de': 'de-de',
  'ee': 'et-ee',
  'es': 'es-es',
  'fr': 'fr-fr',
  'gr_en': 'en-gr',
  'gr_el': 'el-gr',
  'ie': 'en-ie',
  'il_en': 'en-il',
  'il_he': 'he-il',
  'it': 'it-it',
  'lv': 'lv-lv',
  'lt': 'lt-lt',
  'lu_de': 'de-lu',
  'lu_en': 'en-lu',
  'lu_fr': 'fr-lu',
  'hu': 'hu-hu',
  'mt': 'en-mt',
  'mena_en': 'en-mena',
  'mena_ar': 'ar-mena',
  'nl': 'nl-nl',
  'no': 'nb-no',
  'at': 'de-at',
  'pl': 'pl-pl',
  'pt': 'pt-pt',
  'ro': 'ro-ro',
  'ch_de': 'de-ch',
  'si': 'sl-si',
  'sk': 'sk-sk',
  'ch_fr': 'fr-ch',
  'fi': 'fi-fi',
  'se': 'sv-se',
  'ch_it': 'it-ch',
  'tr': 'tr-tr',
  'uk': 'en-uk',
  'bg': 'bg-bg',
  'ru': 'ru-ru',
  'ua': 'uk-ua',
  'au': 'en-au',
  'hk_en': 'en-hk',
  'in': 'en-in',
  'in_hi': 'hi-in',
  'nz': 'en-nz',
  'hk_zh': 'zh-hant-hk',
  'tw': 'zh-hant-tw',
  'jp': 'ja-jp',
  'kr': 'ko-kr',
  'ae_en': 'en-ae',
  'ae_ar': 'ar-ae',
  'sa_en': 'en-sa',
  'sa_ar': 'ar-sa',
  'th_en': 'en-th',
  'th_th': 'th-th',
  'sg': 'en-sg',
  'cl': 'es-cl',
  'co': 'es-co',
  'ar': 'es-ar',
  'cr': 'es-cr',
  'pr': 'es-pr',
  'ec': 'es-ec',
  'pe': 'es-pe',
  'eg_en': 'en-eg',
  'eg_ar': 'ar-eg',
  'gt': 'es-gt',
  'id_en': 'en-id',
  'id_id': 'in-id',
  'ph_en': 'en-ph',
  'ph_fil': 'fil-ph',
  'my_en': 'en-my',
  'my_ms': 'ms-my',
  'kw_en': 'en-kw',
  'kw_ar': 'ar-kw',
  'ng': 'en-ng',
  'qa_en': 'en-qa',
  'qa_ar': 'ar-qa',
  'vn_en': 'en-vn',
  'vn_vi': 'vi-vn'
};

// import verbToRedirectLinkSuffix from './verbRedirMap.js'
const verbRedirMap = {
  'createpdf': 'createpdf',
  'crop-pages': 'crop',
  'delete-pages': 'deletepages',
  'extract-pages': 'extract',
  'combine-pdf': 'combine',
  'protect-pdf': 'protect',
  'add-comment': 'addcomment',
  'pdf-to-image': 'pdftoimage',
  'reorder-pages': 'reorderpages',
  'sendforsignature': 'sendforsignature',
  'rotate-pages': 'rotatepages',
  'fillsign': 'fillsign',
  'split-pdf': 'split',
  'insert-pdf': 'insert',
  'compress-pdf': 'compress',
  'png-to-pdf': 'jpgtopdf',
  'number-pages': 'number',
};

let url = new URL(window.location.href);
let langFromPath = url.pathname.split('/')[1];
const pageLang = localeMap[langFromPath] || 'en-us';

export default function init(element) {
  const widget = element;
  const DC_WIDGET_VERSION_FALLBACK = '2.40.0_1.172.1';
  const DC_GENERATE_CACHE_VERSION_FALLBACK = '1.172.1';
  const STG_DC_WIDGET_VERSION = document.querySelector('meta[name="stg-dc-widget-version"]')?.getAttribute('content');
  const STG_DC_GENERATE_CACHE_VERSION = document.querySelector('meta[name="stg-dc-generate-cache-version"]')?.getAttribute('content');
  const HEADING = 'Convert JPG to PDF';
  const COPY = 'Drag and drop an image file (JPG, PNG, BMP, and more) to use our PDF converter.';
  const WORD_HEADING = 'Convert PDF to Word';
  const WORD_COPY = 'Drag and drop a PDF file to use our PDF to Microsoft Word converter.';
  const LEGAL = 'Your file will be securely handled by Adobe servers and deleted unless you sign in to save it.';
  const LEGAL_TWO = '<span>By using this service, you agree to the Adobe <a href="https://www.adobe.com/legal/terms.html" target="_blank">Terms of Use</a> and <a href="https://www.adobe.com/privacy/policy.html" target="_blank">Privacy Policy</a>.</span>';
  const BTN = 'Select a file';
  const logo = '<svg id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><g id="Surfaces"><path fill="#b30b00" d="M4.25.3h15.5A4.24643,4.24643,0,0,1,24,4.55v14.9a4.24643,4.24643,0,0,1-4.25,4.25H4.25A4.24643,4.24643,0,0,1,0,19.45V4.55A4.24643,4.24643,0,0,1,4.25.3Z"></path></g><g id="Outlined_Mnemonics_Logos" data-name="Outlined Mnemonics Logos"><path id="_256" data-name=" 256" fill="#fff" d="M19.3,13.85a1.78946,1.78946,0,0,0-.44031-.33547,2.83828,2.83828,0,0,0-.59969-.24078,4.79788,4.79788,0,0,0-.75719-.14516A7.94332,7.94332,0,0,0,16.59,13.08q-.27375.00375-.54891.017-.27492.01337-.54984.03672-.2747.02345-.548.05734-.273.034-.54328.07891-.1725-.16875-.33891-.345-.16617-.17625-.32484-.36-.15844-.18375-.308-.375-.1493-.19125-.28828-.39-.10875-.14625-.212-.29625-.10337-.15-.20172-.30375-.09845-.15375-.19234-.31125-.094-.1575-.18391-.31875.17625-.55125.30766-1.04813.13148-.49688.21859-.93937.08718-.4425.13047-.83063A6.52908,6.52908,0,0,0,13.05,7.03a3.675,3.675,0,0,0-.08594-.80563A2.42373,2.42373,0,0,0,12.685,5.505a1.4927,1.4927,0,0,0-.50406-.51688A1.44959,1.44959,0,0,0,11.42,4.79a1.19728,1.19728,0,0,0-.30547.04719A1.22057,1.22057,0,0,0,10.41,5.38a2.17839,2.17839,0,0,0-.25078.82187,4.69881,4.69881,0,0,0,.007,1.08813,7.85466,7.85466,0,0,0,.25641,1.26812A10.26146,10.26146,0,0,0,10.92,9.92c-.0725.2125-.14625.42312-.222.63391s-.1536.42171-.23422.63484-.16406.42844-.25109.648S10.035,12.28,9.94,12.51q-.12375.2925-.25344.58281Q9.55672,13.383,9.42,13.67q-.13688.28688-.28156.56969Q8.99359,14.52235,8.84,14.8c-.3075.1225-.70125.28937-1.12281.49156A12.99444,12.99444,0,0,0,6.4275,15.995a6.08618,6.08618,0,0,0-1.10594.86094A1.9673,1.9673,0,0,0,4.75,17.82a1.08624,1.08624,0,0,0-.01969.29219,1.10366,1.10366,0,0,0,.05719.28281,1.13932,1.13932,0,0,0,.12844.26031A1.17812,1.17812,0,0,0,5.11,18.88a1.45543,1.45543,0,0,0,.23312.17047,1.49272,1.49272,0,0,0,.25938.12078,1.5496,1.5496,0,0,0,.27812.07016A1.60815,1.60815,0,0,0,6.17,19.26a2.26684,2.26684,0,0,0,1.16953-.36984,5.403,5.403,0,0,0,1.12172-.95391,11.55912,11.55912,0,0,0,1.02609-1.30453c.32078-.46734.61766-.95422.88266-1.42172q.225-.075.45172-.14781.22664-.07266.45453-.14219.22781-.06938.45641-.13469.22851-.06515.45734-.12531.25125-.0675.49687-.12766.24562-.06022.48563-.11359.24-.05343.47437-.10047.23438-.0471.46313-.08828a7.87389,7.87389,0,0,0,1.20266.87266,6.26924,6.26924,0,0,0,1.08359.50609,5.254,5.254,0,0,0,.913.23422A4.37649,4.37649,0,0,0,18,15.9a2.59368,2.59368,0,0,0,.65125-.07453A1.51031,1.51031,0,0,0,19.1,15.63375a1.1277,1.1277,0,0,0,.28375-.26109A1.11325,1.11325,0,0,0,19.54,15.09a1.22521,1.22521,0,0,0,.068-.32313,1.25587,1.25587,0,0,0-.12281-.63875A1.23791,1.23791,0,0,0,19.3,13.85Zm-1.09.76a.5154.5154,0,0,1-.08641.19734.58489.58489,0,0,1-.16234.15141.79481.79481,0,0,1-.228.097A1.1248,1.1248,0,0,1,17.45,15.09c-.03,0-.05937-.00062-.08828-.002s-.05734-.00359-.08547-.00672-.05594-.00719-.08359-.01234S17.1375,15.0575,17.11,15.05a4.95589,4.95589,0,0,1-.55719-.16906,5.26538,5.26538,0,0,1-.54781-.23844,5.88716,5.88716,0,0,1-.54031-.30969q-.26859-.173-.53469-.38281.19875-.03.39938-.0525t.40312-.0375q.2025-.015.40688-.0225T16.55,13.83q.135-.00375.27-.00015.135.00351.27.0139.135.01032.27.027.135.01665.27.03922a1.06557,1.06557,0,0,1,.23406.06438.67592.67592,0,0,1,.20594.12812.47151.47151,0,0,1,.13094.20688A.61536.61536,0,0,1,18.21,14.61ZM11.05,5.76a.44669.44669,0,0,1,.06312-.08922.418.418,0,0,1,.08188-.06953.38563.38563,0,0,1,.09687-.04516A.37033.37033,0,0,1,11.4,5.54a.3585.3585,0,0,1,.23219.07781.49431.49431,0,0,1,.14031.19969,1.11421,1.11421,0,0,1,.06906.27094A2.13908,2.13908,0,0,1,11.86,6.38a4.75269,4.75269,0,0,1-.03313.52266c-.02187.19453-.05437.408-.09687.63609s-.095.47094-.15688.72422S11.44,8.78,11.36,9.05a8.57492,8.57492,0,0,1-.34656-1.17359,5.96418,5.96418,0,0,1-.13094-.95516,3.50469,3.50469,0,0,1,.03031-.71328A1.38226,1.38226,0,0,1,11.05,5.76Zm.91,8.03q-.12375.03375-.2475.06766-.12375.034-.2475.06859-.12375.03468-.2475.07047-.12375.03585-.2475.07328.0675-.135.13125-.26813t.12375-.26437q.06-.13125.11625-.26063T11.45,13.02q.0675-.16875.13469-.33578.067-.16711.13281-.333.06563-.16595.12906-.33109.06329-.16524.12344-.33016.0525.0825.10516.16328.05272.08087.10609.16047.05343.07968.108.15859.0546.079.11078.15766.10875.15.21969.29625.11109.14625.22531.28875.11438.1425.23281.28125.11859.13875.24219.27375a1.28474,1.28474,0,0,0-.14922.02891c-.09234.02015-.22016.04922-.362.08234s-.29781.07031-.44641.10672S12.0725,13.76,11.96,13.79Zm-3.51,2c-.2525.405-.50375.7725-.74766,1.09594a8.70907,8.70907,0,0,1-.70359.83156,3.63,3.63,0,0,1-.623.52781A.99041.99041,0,0,1,5.87,18.43a.43094.43094,0,0,1-.06875-.00563.4412.4412,0,0,1-.06875-.01687.4004.4004,0,0,1-.065-.02813A.33419.33419,0,0,1,5.61,18.34a.384.384,0,0,1-.07094-.07609.36982.36982,0,0,1-.06687-.18969A.38084.38084,0,0,1,5.48,17.97a1.11708,1.11708,0,0,1,.27422-.47844,3.84739,3.84739,0,0,1,.61453-.54406,8.74359,8.74359,0,0,1,.91266-.57781C7.63063,16.175,8.0225,15.98,8.45,15.79Z"></path></g></svg>';

  let DC_DOMAIN = 'https://dev.acrobat.adobe.com';
  let DC_WIDGET_VERSION = document.querySelector('meta[name="dc-widget-version"]')?.getAttribute('content');
  let DC_GENERATE_CACHE_VERSION = document.querySelector('meta[name="dc-generate-cache-version"]')?.getAttribute('content');
  const lanaOptions = {
    sampleRate: 1,
    tags: 'Cat=DxDC_Frictionless,origin=milo',
  };
  if (!DC_WIDGET_VERSION) {
    DC_WIDGET_VERSION = DC_WIDGET_VERSION_FALLBACK;
    window.lana?.log(`DC WIDGET VERSION IS NOT SET, USING FALLBACK VERSION: ${DC_WIDGET_VERSION_FALLBACK}`, lanaOptions);
  }

  let WIDGET_ENV = `https://dev.acrobat.adobe.com/dc-hosted/${DC_WIDGET_VERSION}/dc-app-launcher.js`;
  let ENV = 'dev';
  let REDIRECT_URL = '';
  let DC_GENERATE_CACHE_URL = '';

  if (window.location.hostname === 'www.adobe.com') {
    WIDGET_ENV = `https://acrobat.adobe.com/dc-hosted/${DC_WIDGET_VERSION}/dc-app-launcher.js`;
    DC_DOMAIN = 'https://acrobat.adobe.com';
    ENV = 'prod';
  }

  if (window.location.hostname === 'stage--dc--adobecom.hlx.page'
    || window.location.hostname === 'main--dc--adobecom.hlx.page'
    || window.location.hostname === 'stage--dc--adobecom.hlx.live'
    || window.location.hostname === 'main--dc--adobecom.hlx.live'
    || window.location.hostname === 'www.stage.adobe.com') {
    WIDGET_ENV = `https://stage.acrobat.adobe.com/dc-hosted/${STG_DC_WIDGET_VERSION}/dc-app-launcher.js`;
    DC_DOMAIN = 'https://stage.acrobat.adobe.com';
    DC_GENERATE_CACHE_VERSION = STG_DC_GENERATE_CACHE_VERSION;
    ENV = 'stage';
  }

  widget.querySelector('div').id = 'VERB';
  const VERB = widget.querySelector('div').textContent.trim().toLowerCase();
      const dynamicHead = VERB === 'jpg-to-pdf' ? HEADING : WORD_HEADING;
      const dynamicCopy = VERB === 'jpg-to-pdf' ? COPY : WORD_COPY;
      //Create Fake Widget
      createTag.then((tag) => {
        const preHeading = tag('p', {class: 'widget-preHead'}, 'Adobe Acrobat')
        const wrapper = tag('div', {id: 'CID', class: `fsw widget-wrapper wapper-${VERB}` });
        const heading = tag('h1', { class: 'widget-heading' }, dynamicHead);
        const center = tag('div', { class: 'widget-center' });
        const copy = tag('p', { class: 'widget-copy' }, dynamicCopy);
        const legal = tag('p', { class: 'widget-legal widget-legal-icon' }, LEGAL);
        const legal_two = tag('p', { class: 'widget-legal' });
        const button = tag('p', { class: 'widget-button' }, BTN);
        const dz = tag('p', { class: 'widget-dropzone' });
        const logo_placeholder = tag('svg', { class: 'widget-logo' });
        legal_two.innerHTML = LEGAL_TWO;
        logo_placeholder.innerHTML = logo;
        preHeading.prepend(logo_placeholder)
        wrapper.append(preHeading)
        wrapper.append(heading);
        wrapper.append(center)
        center.append(dz);
        center.append(copy);
        center.append(button);
        wrapper.append(legal);
        wrapper.append(legal_two);
        element.append(wrapper);

        const dcWidgetScript = tag('script', {
          id: 'adobe_dc_sdk_launcher',
          src: WIDGET_ENV,
          'data-dropzone_id': 'CID',
          'data-locale': pageLang,
          'data-server_env': ENV,
          'data-verb': VERB,
          'data-load_typekit': 'false',
          'data-load_imslib': 'false',
          'data-enable_unload_prompt': 'true',
        });

        // wrapper.classList.add('widget-loaded');
        // element.prepend(dcWidgetScript);
        document.addEventListener('milo:deferred', ()=> {
          wrapper.classList.add('widget-loaded');
          element.prepend(dcWidgetScript);
        })
      });

  // Redir URL
  const REDIRECT_URL_DIV = widget.querySelectorAll('div')[2];
  if (REDIRECT_URL_DIV) {
    // REDIRECT_URL_DIV.id = 'REDIRECT_URL';
    REDIRECT_URL = REDIRECT_URL_DIV.textContent.trim();
    REDIRECT_URL_DIV.remove();
  }

    // Generate cache url
    const GENERATE_CACHE_URL_DIV = widget.querySelectorAll('div')[4];
    if (GENERATE_CACHE_URL_DIV) {
      // GENERATE_CACHE_URL_DIV.id = 'GENERATE_CACHE_URL';
      DC_GENERATE_CACHE_URL = GENERATE_CACHE_URL_DIV.textContent.trim();
      GENERATE_CACHE_URL_DIV.remove();
    }

  // Redirect
  const fallBack = 'https://www.adobe.com/go/acrobat-overview';
  const redDir = () => {
    if (window.location.hostname != 'main--dc--adobecom.hlx.live'
      && window.location.hostname != 'www.adobe.com' ) {
      window.location = `https://www.adobe.com/go/acrobat-${verbRedirMap[VERB] || VERB.split('-').join('')}-${ENV}`|| REDIRECT_URL;
    } else {
      window.location = REDIRECT_URL || `https://www.adobe.com/go/acrobat-${verbRedirMap[VERB] || VERB.split('-').join('')}` || fallBack;
    }
  };

  window.addEventListener('IMS:Ready', async () => {
    // Redirect Usage
    if (window.adobeIMS.isSignedInUser()) {
      redDir();
      return;
    }

    const { default: frictionless } = await import('../../scripts/frictionless.js');
    frictionless(VERB);
  });

  window.addEventListener('Bowser:Ready', async () => {
    // EOL Redirect
    const { redirectLegacyBrowsers } = await import('../../scripts/legacyBrowser.js');
    redirectLegacyBrowsers();
  })

  // widget.appendChild(dcScript);

  window.addEventListener('IMS:Ready', () => {
    let evt;
    evt = new CustomEvent('dc.imslib.ready', { detail: { instance: window.adobeIMS }});
    evt.initEvent('dc.imslib.ready', true, true);
    document.dispatchEvent(evt);
    // window.adobe_dc_sdk.imsReady = true;
  })

  // DC Personalization
  window.addEventListener('DC_Hosted:Ready', () => {
    const DATA = window.dc_hosted.getUserLimits();
    DATA.then((val) => {
      const doccloudPersonalization = val;
      // if limit for 300 uploads is reached, limit is shared across all verbs,
      // upsell is shown for all verbs
      const canNotUpload = val.upload && !val.upload.can_upload;
      doccloudPersonalization.isUpsellDisplayed = {
        // L2 VERBS
        // convert-pdf, word-pdf, excel-pdf, jpg-pdf, ppt-pdf
        createPDF: canNotUpload || (val.create_pdf && !val.create_pdf.can_process),
        // pdf-word, pdf-excel, pdf-ppt, pdf-jpg (2 conversion allowed, limit is shared across them)
        exportPDF: canNotUpload || (val.export_pdf && !val.export_pdf.can_process),
        // compress-pdf
        compressPDF: canNotUpload || (val.compress_pdf && !val.compress_pdf.can_process),
        // password-protect
        passwordProtectPDF: canNotUpload || (val.protect_pdf && !val.protect_pdf.can_process),
        // merge-pdf
        mergePDF: canNotUpload || (val.combine_pdf && !val.combine_pdf.can_process),
        // L1 VERBS (all of them: request signature, pdf editor, delete pdf pages,
        // rotate pdf, rearrange pdf, split pdf, add pages to pdf, sign pdf, export pdf)
        l1Verbs: canNotUpload,
      };
      window.doccloudPersonalization = doccloudPersonalization;
      // Personalization Ready Event
      const personalizationIsReady = new CustomEvent('Personalization:Ready');

      window.dispatchEvent(personalizationIsReady);
    });
  });
}
