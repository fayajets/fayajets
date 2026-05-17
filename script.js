/* ============================================
   FAYAJETS WEBSITE — script.js
   Form → EmailJS (auto sends to Gmail) + WhatsApp
   Location: Accra, Ghana | Hours: Mon–Fri 8AM–5PM
============================================ */

// ---- EmailJS Credentials ----
var EMAILJS_PUBLIC_KEY  = 'DiVbKDp-sv3uOs_-i';
var EMAILJS_SERVICE_ID  = 'service_ycurgn1';
var EMAILJS_TEMPLATE_ID = 'template_y798bba';

// ---- Initialise EmailJS ----
emailjs.init(EMAILJS_PUBLIC_KEY);


// ---- Set Footer Year ----
document.getElementById('year').textContent = new Date().getFullYear();


// ---- Mobile Navigation Toggle ----
var hamburger = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', function() {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(function(link) {
  link.addEventListener('click', function() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
  });
});

window.addEventListener('scroll', function() {
  if (mobileMenu.classList.contains('open')) {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
  }
});


// ---- Bot Request Form ----
var form = document.getElementById('botRequestForm');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  // --- Collect all values ---
  var businessName   = getValue('businessName');
  var ownerName      = getValue('ownerName');
  var email          = getValue('email');
  var phone          = getValue('phone');
  var whatsapp       = getValue('whatsapp');
  var country        = getValue('country');
  var industry       = getValue('industry');
  var website        = getValue('website') || 'Not provided';
  var businessDesc   = getValue('businessDesc');
  var chatbotGoals   = getValue('chatbotGoals');
  var wantsWebsite   = getRadio('wantsWebsiteChatbot');
  var wantsWhatsApp  = getRadio('wantsWhatsApp');
  var faqs           = getValue('faqs') || 'Not provided';
  var businessHours  = getValue('businessHours');
  var language       = getValue('language');
  var additionalInfo = getValue('additionalInfo') || 'None';

  // --- Validation ---
  if (!businessName || !ownerName || !email || !phone || !whatsapp || !country || !industry || !businessDesc || !chatbotGoals || !wantsWebsite || !wantsWhatsApp || !businessHours || !language) {
    showAlert('Please fill in all required fields before submitting.');
    return;
  }

  // --- Disable button while sending ---
  var submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="btn-icon">⏳</span> Sending...';

  // =============================================
  // 1. SEND EMAIL VIA EMAILJS (auto to Gmail)
  // =============================================
  var templateParams = {
    business_name:   businessName,
    owner_name:      ownerName,
    email:           email,
    phone:           phone,
    whatsapp:        whatsapp,
    country:         country,
    industry:        industry,
    website:         website,
    business_desc:   businessDesc,
    chatbot_goals:   chatbotGoals,
    wants_website:   wantsWebsite,
    wants_whatsapp:  wantsWhatsApp,
    faqs:            faqs,
    business_hours:  businessHours,
    language:        language,
    additional_info: additionalInfo
  };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(function() {
      console.log('Email sent successfully');
    })
    .catch(function(error) {
      console.error('EmailJS error:', error);
    });

  // =============================================
  // 2. OPEN WHATSAPP with pre-filled message
  // =============================================
  var waMessage =
'*New Chatbot Request — Fayajets*\n\n' +
'*Business Name:* ' + businessName + '\n' +
'*Owner Name:* ' + ownerName + '\n' +
'*Email:* ' + email + '\n' +
'*Phone:* ' + phone + '\n' +
'*WhatsApp:* ' + whatsapp + '\n' +
'*Country:* ' + country + '\n' +
'*Industry:* ' + industry + '\n' +
'*Website:* ' + website + '\n\n' +
'*Business Description:*\n' + businessDesc + '\n\n' +
'*Chatbot Goals:*\n' + chatbotGoals + '\n\n' +
'*Website Chatbot:* ' + wantsWebsite + '\n' +
'*WhatsApp Automation:* ' + wantsWhatsApp + '\n\n' +
'*Frequently Asked Questions:*\n' + faqs + '\n\n' +
'*Business Hours:* ' + businessHours + '\n' +
'*Preferred Language:* ' + language + '\n\n' +
'*Additional Information:*\n' + additionalInfo;

  var encodedWA = encodeURIComponent(waMessage);
  var waLink = document.createElement('a');
  waLink.href = 'https://api.whatsapp.com/send?phone=233240299171&text=' + encodedWA;
  waLink.target = '_blank';
  waLink.rel = 'noopener noreferrer';
  document.body.appendChild(waLink);
  waLink.click();
  document.body.removeChild(waLink);

  // =============================================
  // 3. SHOW SUCCESS & RESET BUTTON
  // =============================================
  showSuccess();

  submitBtn.disabled = false;
  submitBtn.innerHTML = '<span class="btn-icon">🚀</span> Submit Request';
});


// ---- Helper: Get input value ----
function getValue(id) {
  var el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

// ---- Helper: Get radio value ----
function getRadio(name) {
  var checked = document.querySelector('input[name="' + name + '"]:checked');
  return checked ? checked.value : '';
}

// ---- Helper: Show error alert ----
function showAlert(message) {
  var existing = document.querySelector('.form-alert');
  if (existing) existing.remove();

  var alertEl = document.createElement('div');
  alertEl.className = 'form-alert';
  alertEl.textContent = message;
  alertEl.style.cssText = 'background:#FEF2F2;border:1px solid #FCA5A5;color:#B91C1C;padding:0.9rem 1.2rem;border-radius:8px;font-size:0.9rem;font-weight:500;margin-bottom:1rem;text-align:center;';

  var submitArea = document.querySelector('.form-submit');
  form.insertBefore(alertEl, submitArea);
  setTimeout(function() { alertEl.remove(); }, 5000);
  alertEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ---- Helper: Show success message ----
function showSuccess() {
  var existing = document.querySelector('.form-alert');
  if (existing) existing.remove();

  var success = document.createElement('div');
  success.className = 'form-alert';
  success.innerHTML =
    '<strong>✅ Request submitted!</strong><br>' +
    'Your details have been sent to our Gmail automatically. ' +
    'WhatsApp is also opening with your message pre-filled.<br>' +
    '<strong>We\'ll respond Mon–Fri, 8AM–5PM (Accra, GMT).</strong>';
  success.style.cssText = 'background:#F0FDF4;border:1px solid #86EFAC;color:#15803D;padding:1rem 1.2rem;border-radius:8px;font-size:0.9rem;font-weight:500;margin-bottom:1rem;text-align:center;line-height:1.7;';

  var submitArea = document.querySelector('.form-submit');
  form.insertBefore(success, submitArea);
  success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(function() { success.remove(); }, 10000);
}
