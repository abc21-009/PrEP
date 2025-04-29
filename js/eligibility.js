document.addEventListener('DOMContentLoaded', () => {
  const eligibilityForm = document.getElementById('eligibility-form');
  const eligibilityResult = document.getElementById('eligibility-result');
  
  if (eligibilityForm) {
    eligibilityForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get all the form values
      const q1 = document.querySelector('input[name="q1"]:checked')?.value;
      const q2 = document.querySelector('input[name="q2"]:checked')?.value;
      const q3 = document.querySelector('input[name="q3"]:checked')?.value;
      const q4 = document.querySelector('input[name="q4"]:checked')?.value;
      
      // Validate that all questions are answered
      if (!q1 || !q2 || !q3 || !q4) {
        eligibilityResult.innerHTML = `
          <h4>Please Answer All Questions</h4>
          <p>You need to answer all questions to get your eligibility assessment.</p>
        `;
        eligibilityResult.className = 'animate-fadeIn';
        return;
      }
      
      // Count "yes" answers to determine risk level
      const yesAnswers = [q1, q2, q3, q4].filter(answer => answer === 'yes').length;
      
      let resultClass = '';
      let resultText = '';
      
      // Determine risk level based on number of "yes" answers
      if (yesAnswers >= 2 || q2 === 'yes') {  // HIV+ partner is high risk regardless
        resultClass = 'high-risk';
        resultText = `
          <h4>You may benefit from PrEP</h4>
          <p>Based on your answers, you appear to be at higher risk for HIV. PrEP is recommended for people in your situation.</p>
          <p>We encourage you to speak with a healthcare provider at one of the PrEP service locations to discuss starting PrEP.</p>
          <div class="cta-buttons" style="margin-top: 16px;">
            <a href="#access" class="btn btn-primary">Find PrEP Near You</a>
          </div>
        `;
      } else if (yesAnswers === 1) {
        resultClass = 'medium-risk';
        resultText = `
          <h4>You might benefit from PrEP</h4>
          <p>Based on your answers, you may have some risk factors for HIV. PrEP might be appropriate for you.</p>
          <p>We recommend discussing your specific situation with a healthcare provider who can help you make an informed decision.</p>
          <div class="cta-buttons" style="margin-top: 16px;">
            <a href="#access" class="btn btn-primary">Find PrEP Near You</a>
          </div>
        `;
      } else {
        resultClass = 'low-risk';
        resultText = `
          <h4>You may have lower risk for HIV</h4>
          <p>Based on your answers, you appear to have fewer risk factors for HIV. PrEP is typically recommended for people with specific risk factors.</p>
          <p>However, this is just a basic assessment. If you're concerned about your HIV risk, we still encourage you to speak with a healthcare provider.</p>
          <div class="cta-buttons" style="margin-top: 16px;">
            <a href="#access" class="btn btn-outline">Learn More About PrEP</a>
          </div>
        `;
      }
      
      // Display the result
      eligibilityResult.innerHTML = resultText;
      eligibilityResult.className = `${resultClass} animate-fadeIn`;
      eligibilityResult.classList.remove('hidden');
      
      // Scroll to the result
      setTimeout(() => {
        eligibilityResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    });
  }
  
  // Reset form if user wants to try again
  const resetEligibility = () => {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
      radio.checked = false;
    });
    
    eligibilityResult.classList.add('hidden');
  };
  
  // Add reset functionality if there's a reset button
  const resetButton = document.querySelector('.reset-eligibility');
  if (resetButton) {
    resetButton.addEventListener('click', resetEligibility);
  }
});