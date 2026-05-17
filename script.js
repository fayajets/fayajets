/* ============================================
   FAYAJETS WEBSITE — script.js
   Handles: Nav toggle, form submission → WhatsApp + Email
   Location: Accra, Ghana | Hours: Mon–Fri 8AM–5PM
============================================ */

// ---- Set Footer Year ----
document.getElementById('year').textContent = new Date().getFullYear();


// ---- Mobile Navigation Toggle ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
  });
});


// ---- Close nav on scroll ----
window.addEventListener('scroll', () => {
  if (mobileMenu.classList.contains('open')) {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
  }
});


// ---- Bot Request Form → WhatsApp + Email ----
const form = document.getElementById('botRequestForm');

form.addEventListener('submit', function (e) {
  // Prevent page reload
  e.preventDefault();

  // --- Collect form values ---
  const businessName  = getValue('businessName');
  const ownerName     = getValue('ownerName');
  const email         = getValue('email');
  const phone         = getValue('phone');
  const whatsapp      = getValue('whatsapp');
  const country       = getValue('country');
  const industry      = getValue('industry');
  const website       = getValue('website') || 'Not provided';
  const businessDesc  = getValue('businessDesc');
  const chatbotGoals  = getValue('chatbotGoals');
  const wantsWebsite  = getRadio('wantsWebsiteChatbot');
  const wantsWhatsApp = getRadio('wantsWhatsApp');
  const faqs          = getValue('faqs') || 'Not provided';
  const businessHours = getValue('businessHours');
  const language      = getValue('language');
  const additionalInfo = getValue('additionalInfo') || 'None';

  // --- Validation ---
  if (!businessName || !ownerName || !email || !phone || !whatsapp || !country || !industry || !businessDesc || !chatbotGoals || !wantsWebsite || !wantsWhatsApp || !businessHours || !language) {
    showAlert('Please fill in all required fields before submitting.');
    return;
  }

  // =============================================
  // 1. FORMAT WHATSAPP MESSAGE
  // =============================================
  const waMessage =
`*New Chatbot Request — Fayajets*

*Business Name:* ${businessName}
*Owner Name:* ${ownerName}
*Email:* ${email}
*Phone:* ${phone}
*WhatsApp:* ${whatsapp}
*Country:* ${country}
*Industry:* ${industry}
*Website:* ${website}

*Business Description:*
${businessDesc}

*Chatbot Goals:*
${chatbotGoals}

*Website Chatbot:* ${wantsWebsite}
*WhatsApp Automation:* ${wantsWhatsApp}

*Frequently Asked Questions:*
${faqs}

*Business Hours:* ${businessHours}
*Preferred Language:* ${language}

*Additional Information:*
${additionalInfo}`;

  // =============================================
  // 2. FORMAT EMAIL BODY
  // =============================================
  const emailSubject = `New Chatbot Request from ${businessName} — Fayajets`;

  const emailBody =
`New Chatbot Request — Fayajets
================================

Business Name: ${businessName}
Owner Name: ${ownerName}
Email: ${email}
Phone: ${phone}
WhatsApp: ${whatsapp}
Country: ${country}
Industry: ${industry}
Website: ${website}

Business Description:
${businessDesc}

Chatbot Goals:
${chatbotGoals}

Website Chatbot: ${wantsWebsite}
WhatsApp Automation: ${wantsWhatsApp}

Frequently Asked Questions:
${faqs}

Business Hours: ${businessHours}
Preferred Language: ${language}

Additional Information:
${additionalInfo}

--------------------------------
Sent via Fayajets Website
`;

  // =============================================
  // 3. OPEN WHATSAPP (new tab)
  // =============================================
  const encodedWA = encodeURIComponent(waMessage);
  const waURL = 'https://wa.me/233240299171?text=' + encodedWA;
  window.open(waURL, '_blank');

  // =============================================
  // 4. OPEN EMAIL CLIENT
  // Use a hidden <a> click — does NOT navigate away from the page
  // =============================================
  setTimeout(function() {
    const encodedSubject = encodeURIComponent(emailSubject);
    const encodedBody    = encodeURIComponent(emailBody);
    const mailtoURL = 'mailto:fayajets@gmail.com?subject=' + encodedSubject + '&body=' + encodedBody;
    var mailLink = document.createElement('a');
    mailLink.href = mailtoURL;
    mailLink.style.display = 'none';
    document.body.appendChild(mailLink);
    mailLink.click();
    document.body.removeChild(mailLink);
  }, 1000);

  // =============================================
  // 5. SHOW SUCCESS MESSAGE
  // =============================================
  showSuccess();
});


// ---- Helper: Get input value ----
function getValue(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

// ---- Helper: Get radio value ----
function getRadio(name) {
  const checked = document.querySelector(`input[name="${name}"]:checked`);
  return checked ? checked.value : '';
}

// ---- Helper: Show error alert ----
function showAlert(message) {
  const existing = document.querySelector('.form-alert');
  if (existing) existing.remove();

  const alert = document.createElement('div');
  alert.className = 'form-alert form-alert--error';
  alert.textContent = message;
  alert.style.cssText = `
    background: #FEF2F2;
    border: 1px solid #FCA5A5;
    color: #B91C1C;
    padding: 0.9rem 1.2rem;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 1rem;
    text-align: center;
  `;

  const submitArea = document.querySelector('.form-submit');
  form.insertBefore(alert, submitArea);

  setTimeout(() => alert.remove(), 5000);
  alert.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ---- Helper: Show success message ----
function showSuccess() {
  const existing = document.querySelector('.form-alert');
  if (existing) existing.remove();

  const success = document.createElement('div');
  success.className = 'form-alert form-alert--success';
  success.innerHTML = `
    <strong>✅ Request submitted!</strong><br>
    WhatsApp is opening with your details pre-filled.
    Your email client will also open shortly so we receive your request on both channels.
    We'll respond within our working hours: <strong>Mon–Fri, 8AM–5PM (Accra, GMT)</strong>.
  `;
  success.style.cssText = `
    background: #F0FDF4;
    border: 1px solid #86EFAC;
    color: #15803D;
    padding: 1rem 1.2rem;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 1rem;
    text-align: center;
    line-height: 1.6;
  `;

  const submitArea = document.querySelector('.form-submit');
  form.insertBefore(success, submitArea);

  success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => success.remove(), 10000);
}
