// Signup Handler for Teachers Union Campaign
const TWILIO_API_ENDPOINT = 'https://your-twilio-api-endpoint.com/signup';
const WHATSAPP_API_ENDPOINT = 'https://your-whatsapp-api-endpoint.com/signup';

async function handleSignup(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const signupData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        school: formData.get('school'),
        smsConsent: formData.get('sms_consent') === 'on'
    };

    try {
        // Send SMS signup
        const smsResponse = await fetch(TWILIO_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupData)
        });

        // Send WhatsApp signup
        const whatsappResponse = await fetch(WHATSAPP_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupData)
        });

        if (smsResponse.ok && whatsappResponse.ok) {
            alert('Successfully signed up! You will receive campaign updates via SMS and WhatsApp.');
            form.reset();
        } else {
            throw new Error('Signup failed');
        }
    } catch (error) {
        console.error('Signup error:', error);
        alert('There was a problem with your signup. Please try again.');
    }
}

document.getElementById('signup-form')?.addEventListener('submit', handleSignup);
