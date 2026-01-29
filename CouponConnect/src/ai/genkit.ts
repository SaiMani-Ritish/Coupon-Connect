// Simple AI verification without Genkit for demo purposes
export const ai = {
  // Mock AI response for demo
  verifyCoupon: async (input: any) => {
    // Simulate AI verification with basic rules
    const { title, originalPrice, sellingPrice, expirationDate } = input;
    
    const issues = [];
    let isValid = true;
    let confidence = 0.9;

    // Basic validation rules
    if (sellingPrice >= originalPrice) {
      issues.push('Selling price should be less than original price');
      isValid = false;
      confidence = 0.3;
    }

    if (new Date(expirationDate) < new Date()) {
      issues.push('Coupon has already expired');
      isValid = false;
      confidence = 0.1;
    }

    if (title.length < 5) {
      issues.push('Title seems too short');
      confidence = Math.min(confidence, 0.7);
    }

    return {
      isValid,
      confidenceScore: confidence,
      flaggedIssues: issues,
    };
  }
};
