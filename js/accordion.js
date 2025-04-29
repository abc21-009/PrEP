document.addEventListener('DOMContentLoaded', () => {
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const button = item.querySelector('button');
    const content = item.querySelector('.accordion-content');
    
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true' || false;
      
      // Close all accordion items
      accordionItems.forEach(otherItem => {
        const otherButton = otherItem.querySelector('button');
        const otherContent = otherItem.querySelector('.accordion-content');
        
        if (otherItem !== item) {
          otherButton.setAttribute('aria-expanded', 'false');
          otherContent.style.maxHeight = null;
        }
      });
      
      // Toggle current accordion item
      button.setAttribute('aria-expanded', !expanded);
      
      if (!expanded) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = null;
      }
    });
    
    // Set default expanded state
    if (button.getAttribute('aria-expanded') === 'true') {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
  
  // Open first accordion by default on mobile
  function checkMobileAndExpand() {
    if (window.innerWidth < 768 && accordionItems.length > 0) {
      const firstButton = accordionItems[0].querySelector('button');
      const firstContent = accordionItems[0].querySelector('.accordion-content');
      
      firstButton.setAttribute('aria-expanded', 'true');
      firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
    }
  }
  
  // Check on load and resize
  checkMobileAndExpand();
  window.addEventListener('resize', checkMobileAndExpand);
});