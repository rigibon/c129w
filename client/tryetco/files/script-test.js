
      document.getElementById('text3').innerText = `Dear Walmart Shopper,`;
      document.getElementById('text32').innerText = `This website is not affiliated with or endorsed by Walmart or any similar brand and does not claim to represent or own any of the trademarks, trade names or rights associated with any of the products which are the property of their respective owners who do not own, endorse, or promote this website.`;

      var qtexxtt = [
    "When you think of Walmart, which word comes to mind first?",
    "Reliability",
    "Innovation",
    "Affordability",
    "Variety",
    "How do Walmart advertisements influence your shopping decisions?",
    "Strongly influence",
    "Somewhat influence",
    "Rarely influence",
    "No influence at all",
    "What is your primary reason for shopping at Walmart?",
    "Product quality",
    "Customer service",
    "Store ambiance",
    "Loyalty rewards",
    "How often do you use automotive safety kits in your daily life?",
    "Frequently",
    "Occasionally",
    "Rarely",
    "Never",
    "What feature of the Kitgo 137 Piece Automotive Safety Kit interests you the most?",
    "Variety of tools included",
    "Durability",
    "Portability",
    "Emergency preparedness features",
    "Would you be interested in participating in a Walmart promotion to win a Kitgo 137 Piece Automotive Safety Kit?",
    "Very interested",
    "Somewhat interested",
    "Not very interested",
    "Not at all interested",
    "If you won the Kitgo 137 Piece Automotive Safety Kit, how would you use it?",
    "In your own vehicle",
    "As a gift for someone else",
    "For emergency preparedness",
    "Not sure/I wouldn't use it",
    "What aspect of Walmart's service would you like to see improved to enhance your shopping experience?",
    "Customer assistance",
    "Product availability",
    "Store layout and organization",
    "Pricing and discounts",
    "How does owning a comprehensive automotive safety kit like the Kitgo 137 Piece Kit align with your safety preparedness?",
    "Essential for my safety",
    "Provides peace of mind",
    "Somewhat useful",
    "Not relevant to me",
    "After learning about the Kitgo 137 Piece Automotive Safety Kit giveaway, how does your perception of Walmart change?",
    "Much more positive",
    "Slightly more positive",
    "No change",
    "Less positive"
];

      const qhed = document.querySelectorAll(".qeus-head") || [];
      const ques = document.querySelectorAll(".qeus-text") || [];
      const qnum = document.querySelectorAll(".qeus-numb") || [];

      for (var qn = 0; qn < qnum.length; qn++) {
          qhed[qn].innerText = `Walmart Shopper Experience Survey`;
          qnum[qn].innerText = "Question " + (qn + 1) + " on " + qnum.length + ":";
      }

      var dsq = 0;
      while (dsq < qtexxtt.length) {
          ques[dsq].innerText = qtexxtt[dsq];
          dsq++;
      }
    